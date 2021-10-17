import { Product } from 'src/app/common/product';


export class CartItem {

    id: number | undefined;
    
    name: string | undefined;

    imageUrl: string | undefined;

    unitPrice: number | undefined;

    quantity: number;

    constructor(product: Product) {

        this.id = product.id;

        this.name = product.name;

        this.imageUrl = product.imageUrl;

        this.unitPrice = product.unitPrice;

        this.quantity = 1;
    }
}
