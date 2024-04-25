import {useContext, useEffect, useState} from "react";
import CartContext from "../components/CartContext.jsx";
import './css/Store.css';
import Products from "../components/Products.jsx";

function Store() {
    const [products, setProducts] = useState([]);
    const { cart, setCart } = useContext(CartContext);

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        const response = await fetch('http://localhost:8080/products/getAllProducts');
        const data = await response.json();
        setProducts(data);
    };

    const addToCart = (product, quantity) => {
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            // Update the quantity of the existing product
            const updatedCart = cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + Number(quantity) } : item
            );
            setCart(updatedCart);
        } else {
            // Add the new product to the cart
            const productWithQuantity = { ...product, quantity: Number(quantity) };
            setCart([...cart, productWithQuantity]);
        }
    };

    return (
        <div className="product-container">
            {products.map((product, index) => (
                <Products key={index} product={product} addToCart={addToCart} />
            ))}
        </div>
    );
}

export default Store;