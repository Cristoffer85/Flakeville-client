import {useContext, useEffect, useState} from "react";
import CartContext from "../components/CartContext.jsx";
import './css/Store.css';
import Products from "../components/Products.jsx";
import { getAllProducts } from "../components/Products.jsx";
import categoryContext from "../components/CategoryContext.jsx";

function Store() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const { cart, setCart } = useContext(CartContext);

    const fetchProductsByCategory = async (category) => {
        const response = await fetch(`https://snofjallbyservice-snofjallbywithpt.azuremicroservices.io/products/category/${category}`);
        const products = await response.json();
        setProducts(products);
    };

    useEffect(() => {
        if (category) {
            fetchProductsByCategory(category);
        } else {
            const fetchProducts = async () => {
                const products = await getAllProducts();
                setProducts(products);
            };

            fetchProducts();
        }
    }, [category]);

    const addToCart = (product, quantity) => {
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            const updatedCart = cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + Number(quantity) } : item
            );
            setCart(updatedCart);
        } else {
            const productWithQuantity = { ...product, quantity: Number(quantity) };
            setCart([...cart, productWithQuantity]);
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="store-container">
            <div className="sidebar">
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search products"
                />
                <select value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="">All</option>
                    <option value="Skis">Skis</option>
                    <option value="category2">Category 2</option>
                    {/* Add more options as needed */}
                </select>
            </div>
            <div className="product-container">
                {filteredProducts.map((product, index) => (
                    <Products key={index} product={product} addToCart={addToCart} />
                ))}
            </div>
        </div>
    );
}

export default Store;