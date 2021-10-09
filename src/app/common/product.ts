import { ProductCategory } from 'src/app/common/product-category';
export class Product {

    id: number | undefined;

    category: ProductCategory | undefined;

    sku: string | undefined;

    name: string | undefined;

    description: string | undefined;

    unitPrice: number | undefined;

    imageUrl: string | undefined;

    active: boolean | undefined;

    unitsInStock: number | undefined;

    dateCreated: Date | undefined;

    lastUpdated: Date | undefined;
}
