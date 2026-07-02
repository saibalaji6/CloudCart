package cloudcart_backend.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SmsService {

    @Value("${twilio.account-sid}")
    private String accountSid;

    @Value("${twilio.auth-token}")
    private String authToken;

    @Value("${twilio.phone-number}")
    private String twilioPhoneNumber;

    public void sendOrderConfirmation(String customerPhone,
                                      String customerName,
                                      Double totalPrice) {

        Twilio.init(accountSid, authToken);

        Message.creator(
                new PhoneNumber(customerPhone),
                new PhoneNumber(twilioPhoneNumber),
                "Hello " + customerName +
                        ", your CloudCart order has been placed successfully. " +
                        "Total Amount: $" + totalPrice +
                        ". Status: PLACED.")
                .create();
    }
}