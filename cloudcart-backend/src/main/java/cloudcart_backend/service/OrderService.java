package cloudcart_backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import cloudcart_backend.entity.Order;
import cloudcart_backend.repository.OrderRepository;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final EmailService emailService;
    private final SmsService smsService;

    public OrderService(
            OrderRepository orderRepository,
            EmailService emailService,
            SmsService smsService
    ) {
        this.orderRepository = orderRepository;
        this.emailService = emailService;
        this.smsService = smsService;
    }

    public Order createOrder(Order order) {

        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PLACED");

        Order savedOrder = orderRepository.save(order);

        try {
            emailService.sendOrderConfirmation(
                    savedOrder.getUserEmail(),
                    savedOrder.getFullName(),
                    savedOrder.getTotalPrice()
            );
        } catch (Exception e) {
            System.out.println("Email failed: " + e.getMessage());
        }

        try {
            smsService.sendOrderConfirmation(
                    savedOrder.getPhoneNumber(),
                    savedOrder.getFullName(),
                    savedOrder.getTotalPrice()
            );
        } catch (Exception e) {
            System.out.println("SMS failed: " + e.getMessage());
        }

        return savedOrder;
    }

    public List<Order> getOrdersByUserEmail(String userEmail) {
        return orderRepository.findByUserEmail(userEmail);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order updateOrderStatus(Long id, String status) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));

        order.setStatus(status);

        return orderRepository.save(order);
    }
}