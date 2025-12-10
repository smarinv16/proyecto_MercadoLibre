import { useState } from "react";
import type { Product } from "../Types/Products";
import { createProduct, updateProduct } from "../Utils/api";
import Input from "./input";
import TextArea from "./textArea";
import Button from "./button";


interface ProductFormProps {
    product?: Product;
    onSave: ()=> void;
    onCancel: ()=> void;
    
}

const ProductForm: React.FC<ProductFormProps> =({product, onSave, onCancel})=>{
    const [formData, setFormData] = useState({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price.toString() || '',
        category: product?.category || '',
        stock: product?.stock?.toString() || '',
        imageUrl: product?.imageUrl || ''
    });

    const handleSubmit = async (e: React.FormEvent)=> {
        e.preventDefault();

        const productData = {
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            category: formData.category,
            stock: parseInt(formData.stock)||0,
            imageUrl: formData.imageUrl || undefined
        };
        try {
            if (product) {
                await updateProduct(product.id, productData);
            } else {
                await createProduct(productData);
            }
            onSave();
        } catch (error) {
            console.error("Error saving product:", error);
        }
    };

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setFormData({...formData, [field]: e.target.value});
    }

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">
                {product ? "Editar Producto" : "Crear Nuevo Producto"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre:
                    </label>
                    <Input
                        type="text"
                        value={formData.name}
                        onChange={handleChange('name')}
                        required
                        placeholder="Nombre del producto"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descripcion:
                    </label>
                    <TextArea
                        value={formData.description}
                        onChange={handleChange('description')}
                        required
                        placeholder="Descripcion del producto"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        precio:
                    </label>
                    <Input
                        type="number"
                        value={formData.price}
                        onChange={handleChange('price')}
                        required
                        placeholder="0.00"
                        min="0"
                    />
                </div>

                                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Categoria:
                    </label>
                    <Input
                        type="text"
                        value={formData.category}
                        onChange={handleChange('category')}
                        required
                        placeholder="Categoria de producto"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock:
                    </label>
                    <Input
                        type="number"
                        value={formData.stock}
                        onChange={handleChange('stock')}
                        required
                        placeholder="0"
                        min="0"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        URL imagen (opcional):
                    </label>
                    <Input
                        type="text"
                        value={formData.imageUrl}
                        onChange={handleChange('imageUrl')}
                        placeholder="https://"
                    />
                </div>

                <div className="flex gap-2 pt4">
                    <Button type="submit" className="flex-1">
                        {product ? "Actualizar" : "Crear"}
                    </Button>
                    <Button type="button" variant="secondary" className="flex-1" onClick={onCancel}>
                        Cancelar
                    </Button>
                </div>

            </form>

        </div>

    );

}

export default ProductForm;