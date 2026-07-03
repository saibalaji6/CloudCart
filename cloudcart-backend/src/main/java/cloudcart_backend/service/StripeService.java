package cloudcart_backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

@Service
public class StripeService {

    @Value("${stripe.secret-key}")
    private String stripeSecretKey;

    public String createCheckoutSession(Double totalPrice) throws Exception {
        Stripe.apiKey = stripeSecretKey;

        long amountInCents = Math.round(totalPrice * 100);

        SessionCreateParams params =
                SessionCreateParams.builder()
                        .setMode(SessionCreateParams.Mode.PAYMENT)
                        .setSuccessUrl("https://cloud-cart-olive.vercel.app/payment-success")
                        .setCancelUrl("https://cloud-cart-olive.vercel.app/payment-cancel")
                        .addLineItem(
                                SessionCreateParams.LineItem.builder()
                                        .setQuantity(1L)
                                        .setPriceData(
                                                SessionCreateParams.LineItem.PriceData.builder()
                                                        .setCurrency("usd")
                                                        .setUnitAmount(amountInCents)
                                                        .setProductData(
                                                                SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                        .setName("CloudCart Order")
                                                                        .build()
                                                        )
                                                        .build()
                                        )
                                        .build()
                        )
                        .build();

        Session session = Session.create(params);

        return session.getUrl();
    }
}