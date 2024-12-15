import { useContext, useEffect, useState } from "react";

import { categories } from "../../Components/Categories/Categories.jsx";
import CartContext from "../../Contexts/CartContext/CartContext.jsx";
import { fetchProductsByCategory, getAllProducts } from "../../Api/StoreApi/StoreApi.jsx";

import './Store.css';

function Store() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const { cart, setCart } = useContext(CartContext);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleCategoryChange = (event) => {
        const category = event.target.name;
        if (event.target.checked) {
            setSelectedCategories([...selectedCategories, category]);
        } else {
            setSelectedCategories(selectedCategories.filter(item => item !== category));
        }
    };

    useEffect(() => {
        if (selectedCategories.length > 0) {
            fetchProductsByCategory(selectedCategories).then(setProducts);
        } else {
            getAllProducts().then(setProducts);
        }
    }, [selectedCategories]);

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
                <div className="search-container">
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search products"
                    />
                </div>
                <div className="filter-container">
                    {categories.map((category, index) => (
                        <div key={index}>
                            <input
                                type="checkbox"
                                name={category}
                                onChange={handleCategoryChange}
                            />
                            <label>{category}</label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="product-container">
                {filteredProducts.map((product, index) => (
                    <div key={index} className="product-item">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                        <button onClick={() => addToCart(product, 1)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Store;