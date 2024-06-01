enum Products {
    Iphone = 'iPhone Nano',
    Watch = 'Samsung Watch 1',
    IPod = 'iPod Nano'
}

interface ProductAttributes {
    productName: string;
    price: string;
    description: string;
    brand: string;
    availability: string;
}

const ProductData: Record<Products, ProductAttributes> = {
    [Products.Iphone]: {
        productName: 'iPhone Nano',
        price: '$122.00',
        description: 'Its the small iPod with one very big idea',
        brand: 'Apple',
        availability: 'In Stock'
    },
    [Products.Watch]: {
        productName: 'Samsung Watch 1',
        price: '$220',
        description: 'some text',
        brand: 'Samsung',
        availability: 'Out of Stock'
    },
    [Products.IPod]: {
        productName: 'iPod Nano',
        price: '$100.00',
        description: 'Its the small iPod with one very big idea: video',
        brand: 'Apple',
        availability: 'In Stock'
    }
};

export { Products, ProductAttributes, ProductData };
