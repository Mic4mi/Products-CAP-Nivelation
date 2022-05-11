using {Products as my} from '../db/schema';

service Api {
    entity Products   as projection on my.Products;
    entity Suppliers  as projection on my.Suppliers;
    entity Categories as projection on my.Categories;
}
