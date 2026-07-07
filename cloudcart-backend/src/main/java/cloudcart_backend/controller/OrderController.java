package cloudcart_backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cloudcart_backend.entity.Order;
import cloudcart_backend.service.OrderService;

@RestController
@RequestMapping("/api/orders")

public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        return orderService.createOrder(order);
    }
    @PutMapping("/{id}/status")
public Order updateOrderStatus(
        @PathVariable Long id,
        @RequestParam String status) {
    return orderService.updateOrderStatus(id, status);
}

    @GetMapping("/user/{email}")
    public List<Order> getUserOrders(@PathVariable String email) {
        return orderService.getOrdersByUserEmail(email);
    }
    @GetMapping
public List<Order> getAllOrders() {
    return orderService.getAllOrders();
}
}