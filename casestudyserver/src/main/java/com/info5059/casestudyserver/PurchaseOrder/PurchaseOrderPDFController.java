package com.info5059.casestudyserver.PurchaseOrder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.info5059.casestudyserver.Vendor.VendorRepository;
import com.info5059.casestudyserver.Product.ProductRepository;
import com.itextpdf.io.exceptions.IOException;

import jakarta.servlet.http.HttpServletRequest;

import java.io.ByteArrayInputStream;

@RestController
public class PurchaseOrderPDFController {

    @Autowired
    private VendorRepository vendorRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private PurchaseOrderRepository purchaseorderRepository;

    @GetMapping(value = "/PurchaseOrderPDF", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<InputStreamResource> streamPDF(HttpServletRequest request) throws IOException {

        String poid = request.getParameter("poid");
        // get formatted pdf as a stream
        ByteArrayInputStream bis;
        try {
            bis = PurchaseOrderPDFGenerator.generatePurchaseOrder(poid, purchaseorderRepository, vendorRepository,
                    productRepository);
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", "inline; filename=examplepurchaseorder.pdf");
            // dump stream to browser
            return ResponseEntity
                    .ok()
                    .headers(headers)
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(new InputStreamResource(bis));
        } catch (java.io.IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return null;
        }

    }
}