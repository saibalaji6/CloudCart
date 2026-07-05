package cloudcart_backend.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cloudcart_backend.service.StripeService;

@RestController
@RequestMapping("/api/payments")

public class PaymentController {

    private final StripeService stripeService;

    public PaymentController(StripeService stripeService) {
        this.stripeService = stripeService;
    }

    @PostMapping("/create-checkout-session")
    public Map<String, String> createCheckoutSession(
            @RequestBody Map<String, Double> request
    ) throws Exception {

        Double totalPrice = request.get("totalPrice");

        String checkoutUrl = stripeService.createCheckoutSession(totalPrice);

        return Map.of("url", checkoutUrl);
    }
}