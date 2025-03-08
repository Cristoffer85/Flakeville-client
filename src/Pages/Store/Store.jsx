import { useContext, useEffect, useState } from "react";
import { categories } from "../../Components/Categories/Categories.jsx";
import CartContext from "../../Contexts/CartContext/CartContext.jsx";
import { fetchProductsByCategory, getAllProducts } from "../../Api/StoreApi/StoreApi.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <div className="container-fluid" style={{ paddingTop: '7rem', paddingBottom: '2rem', paddingRight: '1.5rem' }}>
          {/* Flex container with gap added for margin between columns */}
          <div className="d-flex flex-column flex-md-row gap-3" style={{ height: 'calc(100vh - 9rem)' }}>
            {/* Left column: sticky on md+ */}
            <div className="col-md-3 flex-shrink-0 sticky-md-top">
              <div className="list-group">
                <div className="list-group-item">
                  <input
                    type="text"
                    className="form-control"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search products"
                  />
                </div>
                {categories.map((category, index) => (
                  <div key={index} className="list-group-item">
                    <input
                      type="checkbox"
                      name={category}
                      onChange={handleCategoryChange}
                      className="form-check-input me-2"
                    />
                    <label className="form-check-label">{category}</label>
                  </div>
                ))}
              </div>
            </div>
            {/* Right column: only vertical scroll, horizontal overflow hidden */}
            <div className="col-md-9" style={{ overflowY: 'auto', overflowX: 'hidden' }}>
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {filteredProducts.map((product, index) => (
                  <div key={index} className="col">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.description}</p>
                        <p className="card-text">${product.price}</p>
                        <button onClick={() => addToCart(product, 1)} className="btn btn-primary">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

export default Store;