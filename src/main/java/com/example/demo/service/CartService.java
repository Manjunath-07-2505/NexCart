package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.*;
import com.example.demo.repository.*;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public void addToCart(Integer userId, Integer productId, int quantity) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Check if already in cart
        Cart_item existingCart = cartRepository
                .findByUser_UserIdAndProduct_ProductId(userId, productId)
                .orElse(null);

        if (existingCart != null) {
            existingCart.setQuantity(existingCart.getQuantity() + quantity);
            cartRepository.save(existingCart);
        } else {
            Cart_item cart = new Cart_item(user, product, quantity);
            cartRepository.save(cart);
        }
    }
}
