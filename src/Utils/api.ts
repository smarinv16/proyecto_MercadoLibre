import type { Product } from "../Types/Products";
//import productsData from "../Data/products.json";

//let products: Product[] = [...productsData];

const API_BASE_URL = "https://drag-royalty-transport-emerging.trycloudflare.com/api";


export const getProducts = async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    return response.json();
};

export const getProductById = async (id: number): Promise<Product | undefined> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
        if (response.status === 404) return undefined;
        throw new Error("Failed to fetch product");
    }
    return response.json();
};

export const createProduct = async (newProduct: Omit<Product, 'id'>): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
    });
    if (!response.ok) {
        throw new Error("Failed to create product");
    }
    return response.json();
};

export const updateProduct = async (id: number, updatedProduct: Partial<Omit<Product, 'id'>>): Promise<Product | null> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
    });
    if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error("Failed to update product");
    }
    return response.json();
};

export const deleteProduct = async (id: number): Promise<boolean> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error("Failed to delete product");
    }
    return true;
};

export const searchProducts = async (query: string): Promise<Product[]> => {
    const products = await getProducts();
    return products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())||
      product.price.toString().includes(query) ||
      (product.price >= parseFloat(query) && product.price <= parseFloat(query))   
    );
};