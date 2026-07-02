package cloudcart_backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import cloudcart_backend.entity.Product;
import cloudcart_backend.repository.ProductRepository;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner loadData(ProductRepository repository) {
        return args -> {
            if (repository.count() == 0) {

                repository.save(Product.builder()
                        .name("Wireless Headphones")
                        .category("Electronics")
                        .price(79.99)
                        .rating(4.6)
                        .imageUrl("headphones.jpeg")
                        .description("High-quality wireless headphones with noise cancellation.")
                        .build());

                repository.save(Product.builder()
                        .name("Smart Watch")
                        .category("Electronics")
                        .price(129.99)
                        .rating(4.4)
                        .imageUrl("smartwatch.jpeg")
                        .description("Smart watch with fitness tracking and notifications.")
                        .build());

                repository.save(Product.builder()
                        .name("Laptop Backpack")
                        .category("Accessories")
                        .price(49.99)
                        .rating(4.2)
                        .imageUrl("backpack.jpeg")
                        .description("Durable backpack for laptops and daily travel.")
                        .build());

                repository.save(Product.builder()
                        .name("Gaming Mouse")
                        .category("Gaming")
                        .price(39.99)
                        .rating(4.7)
                        .imageUrl("gaming-mouse.jpeg")
                        .description("Ergonomic gaming mouse with fast response time.")
                        .build());

                repository.save(Product.builder()
                        .name("Mechanical Keyboard")
                        .category("Gaming")
                        .price(89.99)
                        .rating(4.8)
                        .imageUrl("mechanical-keyboard.jpeg")
                        .description("RGB mechanical keyboard for gaming and productivity.")
                        .build());

                repository.save(Product.builder()
                        .name("Bluetooth Speaker")
                        .category("Electronics")
                        .price(59.99)
                        .rating(4.3)
                        .imageUrl("bluetooth-speaker.jpeg")
                        .description("Portable Bluetooth speaker with powerful sound.")
                        .build());

                repository.save(Product.builder()
                        .name("USB-C Charger")
                        .category("Electronics")
                        .price(24.99)
                        .rating(4.1)
                        .imageUrl("usb-c-charger.jpeg")
                        .description("Fast USB-C charger for phones, tablets, and laptops.")
                        .build());

                repository.save(Product.builder()
                        .name("4K Monitor")
                        .category("Electronics")
                        .price(299.99)
                        .rating(4.6)
                        .imageUrl("4k-monitor.jpeg")
                        .description("Ultra HD 4K monitor for work, design, and gaming.")
                        .build());

                repository.save(Product.builder()
                        .name("Fitness Tracker")
                        .category("Electronics")
                        .price(69.99)
                        .rating(4.2)
                        .imageUrl("fitness-tracker.jpeg")
                        .description("Fitness tracker with heart-rate and sleep monitoring.")
                        .build());

                repository.save(Product.builder()
                        .name("Wireless Earbuds")
                        .category("Electronics")
                        .price(99.99)
                        .rating(4.5)
                        .imageUrl("wireless-earbuds.jpeg")
                        .description("Compact wireless earbuds with long battery life.")
                        .build());
            }
        };
    }
}