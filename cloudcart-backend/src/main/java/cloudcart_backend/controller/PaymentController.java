package cloudcart_backend.controller;

import cloudcart_backend.service.StripeService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
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