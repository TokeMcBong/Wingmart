package com.info5059.casestudyserver.PurchaseOrder;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.info5059.casestudyserver.Product.Product;
import com.info5059.casestudyserver.Product.ProductRepository;

import jakarta.persistence.EntityManager;
//import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceContext;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;

@Component
public class PODAO {
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private ProductRepository prodRepo;

    @Transactional
    public PurchaseOrder create(PurchaseOrder clientpo) {
        PurchaseOrder realPo = new PurchaseOrder();
        realPo.setPodate(LocalDateTime.now());
        realPo.setVendorid(clientpo.getVendorid());
        realPo.setAmount(clientpo.getAmount());
        entityManager.persist(realPo);
        for (PurchaseOrderLineItem item : clientpo.getItems()) {
            PurchaseOrderLineItem realItem = new PurchaseOrderLineItem();

            realItem.setPoid(realPo.getId());
            realItem.setProductid(item.getProductid());
            realItem.setQty(item.getQty());
            realItem.setPrice(item.getPrice());

            // we also need to update the QOO on the product table
            Product prod = prodRepo.getReferenceById(item.getProductid());
            prod.setQoo(prod.getQoo() + item.getQty());
            prodRepo.saveAndFlush(prod);

            entityManager.persist(realItem);

        }
        entityManager.flush();
        entityManager.refresh(realPo);
        return realPo;
    }
}