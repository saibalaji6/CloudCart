package cloudcart_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import cloudcart_backend.entity.Product;
import cloudcart_backend.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }
    
    public void deleteProduct(Long id) {
    productRepository.deleteById(id);
}
public Product updateProduct(Long id, Product updatedProduct) {
    Product existingProduct = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found"));

    existingProduct.setName(updatedProduct.getName());
    existingProduct.setCategory(updatedProduct.getCategory());
    existingProduct.setPrice(updatedProduct.getPrice());
    existingProduct.setRating(updatedProduct.getRating());
    existingProduct.setImageUrl(updatedProduct.getImageUrl());
    existingProduct.setDescription(updatedProduct.getDescription());

    return productRepository.save(existingProduct);
}
}