export interface Product{
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    imageUrl?: string;
    // some data files use `image` as the key — accept both
    image?: string;
}
