package com.info5059.casestudyserver.PurchaseOrder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class POController {
    @Autowired
    private PODAO pODAO;
    @Autowired
    private PurchaseOrderRepository purchaseorderRepository;

    @PostMapping("/api/purchaseorders")
    public ResponseEntity<PurchaseOrder> addOne(@RequestBody PurchaseOrder clientpo) { // use RequestBody here
        return new ResponseEntity<PurchaseOrder>(pODAO.create(clientpo), HttpStatus.OK);
    }

    @GetMapping("/api/pos")
    public ResponseEntity<Iterable<PurchaseOrder>> findAll() {
        Iterable<PurchaseOrder> pos = purchaseorderRepository.findAll();
        return new ResponseEntity<Iterable<PurchaseOrder>>(pos, HttpStatus.OK);
    }
}
