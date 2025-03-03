import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function PreviousOrders({ orders }) {
    const calculateTotalPrice = (order) => {
        return order.products.reduce((total, product) => total + product.product.price * product.quantity, 0);
    };

    return (
        <div className="container">
            <h2 className="mb-4">Previous Orders</h2>
            {orders && orders.map((order, index) => (
                <div key={index} className="mb-4">
                    <h3>Order {index + 1}</h3>
                    <table className="table table-striped">
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
                                <td><strong>Total Price</strong></td>
                                <td><strong>{calculateTotalPrice(order)} :-</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

export default PreviousOrders;