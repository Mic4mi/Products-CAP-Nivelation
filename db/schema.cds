namespace Products;

using { cuid, Country } from '@sap/cds/common';

entity Products : cuid { //una sola categoria
    key productName     : String;
        supplier        : Association to Suppliers;
        category        : Association to Categories;
        quantityPerUnit : String;
        unitPrice       : Decimal(10, 2);
        unitsInStock    : Integer;
        unitsOnOrder    : Integer;
        reorderLevel    : Integer;
        discontinued    : Boolean;
}

entity Suppliers { //muchos productos
    key ID           : Integer;
    key companyName  : String;
        contactName  : String;
        contactTitle : String;
        address      : String;
        city         : String;
        region       : String;
        postalCode   : String;
        country      : String(3);
        phone        : String;
        fax          : String;
        homePage     : String;
        product      : Association to many Products on product.supplier = $self;
}

entity Categories {
    key ID           : Integer;
        categoryName : String;
        description  : String;
        product      : Association to many Products on product.category = $self;
}
