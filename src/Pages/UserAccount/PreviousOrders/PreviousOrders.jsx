import React from 'react';
import '../UserAccount.css';

function PreviousOrders({ orders }) {
    const calculateTotalPrice = (order) => {
        return order.products.reduce((total, product) => total + product.product.price * product.quantity, 0);
    };

    return (
        <div className="previousOrdersBox">
            <h2>Previous Orders</h2>
            {orders && orders.map((order, index) => (
                <div key={index} className="orderDetails">
                    <h3>Order {index + 1}</h3>
                    <table>
                        <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                        </tr>
                        </thead>
                        <tbody>
                        {order.products.map((product, i) => (
                            <tr key={i}>
                                <td>{product.product.name}</td>
                                <td>{product.quantity}</td>
                            </tr>
                        ))}
                        <tr>
                            <td>Total Price</td>
                            <td>{calculateTotalPrice(order)} :-</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

export default PreviousOrders;