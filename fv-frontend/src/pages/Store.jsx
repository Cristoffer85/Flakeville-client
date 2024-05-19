import {useContext, useEffect, useState} from "react";
import CartContext from "../components/CartContext.jsx";
import './css/Store.css';
import Products, {getAllProducts} from "../components/Products.jsx";
import {categories} from "../components/Categories.jsx";

function Store() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const { cart, setCart } = useContext(CartContext);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const fetchProductsByCategory = async (categories) => {
        const products = await Promise.all(categories.map(async (category) => {
            const response = await fetch(`https://snofjallbyservice-snofjallbywithpt.azuremicroservices.io/products/category/${category}`);
            return await response.json();
        }));

        // Flatten the array of arrays into a single array
        setProducts(products.flat());
    };

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
            // Fetch products by selected categories
            // You need to modify the fetchProductsByCategory function to accept an array of categories
            fetchProductsByCategory(selectedCategories);
        } else {
            const fetchProducts = async () => {
                const products = await getAllProducts();
                setProducts(products);
            };

            fetchProducts();
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
                    <Products key={index} product={product} addToCart={addToCart}/>
                ))}
            </div>
        </div>
    );
}

export default Store;