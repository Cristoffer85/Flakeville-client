import config from '../APICONFIG2';

const getToken = () => {
    return localStorage.getItem('jwtToken');
};

export async function sendOrder(cart, setCart, setSuccessMessage, username) {
    const token = getToken();

    const order = {
        id: "Previous order",
        products: cart.map(item => ({
            product: {
                id: item.id,
                name: item.name,
                description: item.description,
                price: item.price
            },
            quantity: item.quantity
        }))
    };

    const response = await fetch(`${config.backendUrl}/user/addOrder/${username}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(order)
    });

    if (response.ok) {
        setSuccessMessage("Order Successfully sent!");
        setCart([]);
    } else {
        console.log('Failed to send order:', await response.text());
    }
}