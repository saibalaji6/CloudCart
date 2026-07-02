package cloudcart_backend.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOrderConfirmation(String toEmail, String customerName, Double totalPrice) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(toEmail);
        message.setSubject("CloudCart Order Confirmation");
        message.setText(
                "Hello " + customerName + ",\n\n" +
                "Thank you for shopping with CloudCart.\n\n" +
                "Your order has been placed successfully.\n" +
                "Order Status: PLACED\n" +
                "Total Amount: $" + totalPrice + "\n\n" +
                "Thank you,\n" +
                "CloudCart Team"
        );

        mailSender.send(message);
    }
    public void sendPasswordResetEmail(
        String toEmail,
        String customerName,
        String resetLink
) {

    SimpleMailMessage message = new SimpleMailMessage();

    message.setTo(toEmail);
    message.setSubject("CloudCart Password Reset");

    message.setText(
            "Hello " + customerName + ",\n\n" +
            "You requested a password reset.\n\n" +
            "Click the link below to reset your password:\n\n" +
            resetLink + "\n\n" +
            "This link will expire in 15 minutes.\n\n" +
            "If you did not request this reset, please ignore this email.\n\n" +
            "Thank you,\nCloudCart Team"
    );

    mailSender.send(message);
}
}