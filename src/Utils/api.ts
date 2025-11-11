import type { Product } from "../Types/Products";
import productsData from "../Data/products.json";

let products: Product[] = [...productsData];

export const getProducts = (): Product[] => {
    return products;
};

export const getProductById = (id: number): Product |undefined => {
    return products.find(product => product.id === id);
}


export const createProduct = (product: Omit<Product, 'id'>): Product => {
    const newProduct : Product ={
        ...product,
        id: Math.max(...products.map(p =>p.id)) +1,
    };
    products.push(newProduct);
    return newProduct;
};

export const updateProduct = (id: number, updateProduct: Partial<Product>): Product | null => {
    const index = products.findIndex(product => product.id === id);
    if (index === -1) return null;
    products[index] = {...products[index], ...updateProduct};
    return products[index];
};

export const deleteProduct = (id: number): boolean => {
    const index = products.findIndex(product => product.id === id);
   if (index === -1) return false;
    products.splice(index, 1);
    return true;
};

export const searchProducts = (query: string): Product [] => {
    return products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())||
      product.price.toString().includes(query) ||
      (product.price >= parseFloat(query) && product.price <= parseFloat(query))   
    );
};