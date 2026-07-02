package cloudcart_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import cloudcart_backend.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUserEmail(String userEmail);
}