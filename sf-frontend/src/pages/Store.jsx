import {useContext, useEffect, useState} from "react";
import CartContext from "../components/CartContext.jsx";
import './css/Store.css';
import Products from "../components/Products.jsx";
import { getAllProducts } from "../components/Products.jsx";

function Store() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const { cart, setCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await getAllProducts();
            setProducts(products);
        };

        fetchProducts();
    }, []);

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
                {/* Move the search bar here */}
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search products"
                />
                {/* Add your other sidebar content here */}
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