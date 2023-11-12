package com.info5059.casestudyserver.Hub;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//import com.info5059.casestudyserver.PurchaseOrder.PurchaseOrder;

@RestController
public class HubController {
    @Autowired
    private HubRepository hubRepository;

    @GetMapping("/api/hubs")
    public ResponseEntity<Iterable<Hub>> findAll() {
        Iterable<Hub> hubs = hubRepository.findAll();
        return new ResponseEntity<Iterable<Hub>>(hubs, HttpStatus.OK);
    }

    @PutMapping("/api/hubs")
    public ResponseEntity<Hub> updateOne(@RequestBody Hub hub) {
        Hub updatedHub = hubRepository.save(hub);
        return new ResponseEntity<Hub>(updatedHub, HttpStatus.OK);
    }

    @PostMapping("/api/hubs")
    public ResponseEntity<Hub> addOne(@RequestBody Hub hub) {
        Hub newHub = hubRepository.save(hub);
        return new ResponseEntity<Hub>(newHub, HttpStatus.OK);
    }

    @DeleteMapping("/api/hubs/{id}")
    public ResponseEntity<Integer> deleteOne(@PathVariable long id) {
        return new ResponseEntity<Integer>(hubRepository.deleteOne(id), HttpStatus.OK);
    }

}
