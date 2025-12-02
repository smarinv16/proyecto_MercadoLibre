import React, {useState, useEffect} from "react";
import type { Product } from "../Types/Products";
import { getProducts, deleteProduct } from "../Utils/api";
import ProductCard from "./productCard";
import Input from "./input";

interface ProductListProps {
    onEdit: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onEdit }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(()=> {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
            try {
                await deleteProduct(id);
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        }
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (<div className="Container mx-auto px-4 py-8">
        <h2 className="text-2x1 font-bold mb-6 text-center">Lista de Productos</h2>
        
        <div className="mb-6">
            <Input 
                type="text"
                placeholder="Buscar Productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-md mx-auto block" 
            />
        </div>
        <div className="grid grid-cols-1 md:grid-cols2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product)=>(
                    <ProductCard
                        key={product.id}
                        product={product}
                        onEdit={()=> onEdit(product)}
                        onDelete={()=> handleDelete(product.id)}
                    />
                ))}
        </div>
        {filteredProducts.length ===0 &&(
            <p className="text-center text-gray-500 mt-8">
                {searchQuery ? "No se encontraron productos que coincidan con tu busqueda." : "No hay productos disponibles."}
            </p>
        )}
        
    </div>
    );
};

export default ProductList;