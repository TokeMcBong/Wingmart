package com.info5059.casestudyserver.PurchaseOrder;

import com.info5059.casestudyserver.Vendor.Vendor;
import com.info5059.casestudyserver.Vendor.VendorRepository;
import com.info5059.casestudyserver.Product.Product;
import com.info5059.casestudyserver.Product.ProductRepository;
import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.layout.element.Table;
//import com.itextpdf.layout.properties.HorizontalAlignment;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import org.springframework.web.servlet.view.document.AbstractPdfView;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.net.URL;
import java.text.NumberFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
//import java.util.Locale;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * PurchaseOrderPDFGenerator - a class for creating dynamic product
 * purchaseorder output in
 * PDF format using the iText 7 library
 *
 * @author Evan
 */
public abstract class PurchaseOrderPDFGenerator extends AbstractPdfView {
        public static String currencyFormat(BigDecimal n) {
                return NumberFormat.getCurrencyInstance().format(n);
        }

        public static ByteArrayInputStream generatePurchaseOrder(String poid,
                        PurchaseOrderRepository purchaseorderRepository,
                        VendorRepository vendorRepository, ProductRepository productRepository) throws IOException {
                // PurchaseOrder purchaseorder = new PurchaseOrder();
                URL imageUrl = PurchaseOrderPDFGenerator.class.getResource("/static/images/Logo.png");
                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                PdfWriter writer = new PdfWriter(baos);
                // Initialize PDF document to be written to a stream not a file
                PdfDocument pdf = new PdfDocument(writer);
                // Document is the main object
                Document document = new Document(pdf);
                PdfFont font = PdfFontFactory.createFont(StandardFonts.HELVETICA);
                // add the image to the document
                PageSize pg = PageSize.A4;
                Image img = new Image(ImageDataFactory.create(imageUrl)).scaleAbsolute(120, 40)
                                .setFixedPosition(pg.getWidth() / 2 - 60, 750);
                document.add(img);
                // now let's add a big heading
                document.add(new Paragraph("\n\n"));
                // Locale locale = Locale.of("en", "US");
                // NumberFormat formatter = NumberFormat.getCurrencyInstance(locale);
                try {
                        document.add(new Paragraph("\n"));
                        Optional<PurchaseOrder> purchaseorderOption = purchaseorderRepository
                                        .findById(Long.parseLong(poid));
                        document.add(new Paragraph("PurchaseOrder# " + poid).setFont(font).setFontSize(18).setBold()
                                        .setMarginRight(pg.getWidth() / 2 - 75).setMarginTop(-10)
                                        .setTextAlignment(TextAlignment.RIGHT));
                        document.add(new Paragraph("\n\n"));
                        // add the vendor info for the order here
                        // Table vendorTable = new Table(2).setWidth(new UnitValue(UnitValue.PERCENT,
                        // 30))
                        // .setHorizontalAlignment(HorizontalAlignment.LEFT);
                        document.add(new Paragraph(String.format("Vendor:"))
                                        .setFont(font)
                                        .setFontSize(24)
                                        .setMarginRight(75)
                                        .setTextAlignment(TextAlignment.LEFT)
                                        .setBold());
                        // then a smaller heading
                        Optional<Vendor> repVendor = vendorRepository.findById(purchaseorderOption.get().getVendorid());
                        document.add(new Paragraph(
                                        String.format(repVendor.get().getName()) + " " + repVendor.get().getEmail())
                                        .setFont(font)
                                        .setFontSize(16)
                                        .setBold()
                                        .setMarginRight(110)
                                        .setMarginTop(-10)
                                        .setTextAlignment(TextAlignment.LEFT));
                        document.add(new Paragraph("\n\n"));
                        // now a 3 column table
                        Table table = new Table(5);
                        table.setWidth(new UnitValue(UnitValue.PERCENT, 100));
                        // Unfortunately we must format each cell individually :(
                        // table headings
                        Cell cell = new Cell().add(new Paragraph("Product Code")
                                        .setFont(font)
                                        .setFontSize(12)
                                        .setBold())
                                        .setTextAlignment(TextAlignment.CENTER);
                        table.addCell(cell);
                        cell = new Cell().add(new Paragraph("Description")
                                        .setFont(font)
                                        .setFontSize(12)
                                        .setBold())
                                        .setTextAlignment(TextAlignment.CENTER);
                        table.addCell(cell);
                        cell = new Cell().add(new Paragraph("Qty ordered")
                                        .setFont(font)
                                        .setFontSize(12)
                                        .setBold())
                                        .setTextAlignment(TextAlignment.CENTER);
                        table.addCell(cell);
                        cell = new Cell().add(new Paragraph("Price per unit")
                                        .setFont(font)
                                        .setFontSize(12)
                                        .setBold())
                                        .setTextAlignment(TextAlignment.CENTER);
                        table.addCell(cell);
                        cell = new Cell().add(new Paragraph("Total")
                                        .setFont(font)
                                        .setFontSize(12)
                                        .setBold())
                                        .setTextAlignment(TextAlignment.CENTER);
                        table.addCell(cell);
                        // table details
                        Double total = 0.0;
                        for (PurchaseOrderLineItem item : purchaseorderOption.get().getItems()) {
                                Optional<Product> productOption = productRepository.findById(item.getProductid());
                                cell = new Cell().add(new Paragraph(productOption.get().getId())
                                                .setFont(font)
                                                .setFontSize(12)
                                                .setTextAlignment(TextAlignment.LEFT));
                                table.addCell(cell);
                                cell = new Cell().add(new Paragraph(productOption.get().getName())
                                                .setFont(font)
                                                .setFontSize(12)
                                                .setTextAlignment(TextAlignment.CENTER));
                                table.addCell(cell);
                                cell = new Cell().add(new Paragraph(String.valueOf(item.getQty()))
                                                .setFont(font)
                                                .setFontSize(12)
                                                .setTextAlignment(TextAlignment.LEFT));
                                table.addCell(cell);
                                cell = new Cell().add(new Paragraph(currencyFormat(productOption.get().getMsrp()))
                                                .setFont(font)
                                                .setFontSize(12)
                                                .setTextAlignment(TextAlignment.RIGHT));
                                table.addCell(cell);
                                cell = new Cell().add(new Paragraph(currencyFormat(new BigDecimal(
                                                productOption.get().getMsrp().doubleValue() * item.getQty())))
                                                .setFont(font)
                                                .setFontSize(12)
                                                .setTextAlignment(TextAlignment.RIGHT));
                                table.addCell(cell);
                                total += new BigDecimal(productOption.get().getMsrp().doubleValue() * item.getQty())
                                                .doubleValue();
                        }

                        BigDecimal dispTotal = new BigDecimal(total);

                        // table total
                        cell = new Cell(1, 4).add(new Paragraph("Subtotal:")
                                        .setFont(font)
                                        .setFontSize(12)
                                        .setBold()
                                        .setTextAlignment(TextAlignment.RIGHT));
                        table.addCell(cell);
                        cell = new Cell(1, 1).add(new Paragraph(currencyFormat(dispTotal))
                                        .setFont(font)
                                        .setFontSize(12)
                                        .setBold()
                                        .setTextAlignment(TextAlignment.RIGHT)
                                        .setBackgroundColor(ColorConstants.YELLOW));
                        table.addCell(cell);
                        cell = new Cell(1, 4).add(new Paragraph("Taxes:")
                                        .setFont(font)
                                        .setFontSize(12)
                                        .setBold()
                                        .setTextAlignment(TextAlignment.RIGHT));
                        table.addCell(cell);
                        cell = new Cell(1, 1).add(
                                        new Paragraph(currencyFormat(new BigDecimal(dispTotal.doubleValue() * 0.13)))
                                                        .setFont(font)
                                                        .setFontSize(12)
                                                        .setBold()
                                                        .setTextAlignment(TextAlignment.RIGHT)
                                                        .setBackgroundColor(ColorConstants.YELLOW));
                        table.addCell(cell);
                        cell = new Cell(1, 4).add(new Paragraph("Total:")
                                        .setFont(font)
                                        .setFontSize(12)
                                        .setBold()
                                        .setTextAlignment(TextAlignment.RIGHT));
                        table.addCell(cell);
                        cell = new Cell(1, 1).add(
                                        new Paragraph(currencyFormat(new BigDecimal(dispTotal.doubleValue() * 1.13)))
                                                        .setFont(font)
                                                        .setFontSize(12)
                                                        .setBold()
                                                        .setTextAlignment(TextAlignment.RIGHT)
                                                        .setBackgroundColor(ColorConstants.YELLOW));
                        table.addCell(cell);
                        document.add(table);
                        document.add(new Paragraph("\n\n"));
                        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd h:mm a");
                        document.add(new Paragraph(dateFormatter.format(LocalDateTime.now()))
                                        .setTextAlignment(TextAlignment.CENTER));
                        document.close();
                } catch (Exception ex) {
                        Logger.getLogger(PurchaseOrderPDFGenerator.class.getName()).log(Level.SEVERE, null, ex);
                }
                // finally send stream back to the controller
                return new ByteArrayInputStream(baos.toByteArray());
        }
}