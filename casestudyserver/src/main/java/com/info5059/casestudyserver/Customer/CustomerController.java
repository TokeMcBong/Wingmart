package com.info5059.casestudyserver.Customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//import com.info5059.casestudyserver.PurchaseOrder.PurchaseOrder;

@RestController
public class CustomerController {
    @Autowired
    private CustomerRepository userRepository;

    @GetMapping("/api/customers")
    public ResponseEntity<Iterable<Customer>> findAll() {
        Iterable<Customer> customers = userRepository.findAll();
        return new ResponseEntity<Iterable<Customer>>(customers, HttpStatus.OK);
    }

    @PutMapping("/api/customers")
    public ResponseEntity<Customer> updateOne(@RequestBody Customer customer) {
        Customer updatedUser = userRepository.save(customer);
        return new ResponseEntity<Customer>(updatedUser, HttpStatus.OK);
    }

    @PostMapping("/api/customers")
    public ResponseEntity<Customer> addOne(@RequestBody Customer customer) {
        Customer newUser = userRepository.save(customer);
        return new ResponseEntity<Customer>(newUser, HttpStatus.OK);
    }

    @DeleteMapping("/api/customers/{id}")
    public ResponseEntity<Integer> deleteOne(@PathVariable long id) {
        return new ResponseEntity<Integer>(userRepository.deleteOne(id), HttpStatus.OK);
    }

}
