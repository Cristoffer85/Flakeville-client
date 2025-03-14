import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function PreviousOrders({ orders }) {
    const calculateTotalPrice = (order) => {
        return order.products.reduce((total, product) => total + product.product.price * product.quantity, 0);
    };

    return (
        <div className="container-fluid" style={{ paddingRight: '1.5rem' }}>
            <div className="d-flex flex-column flex-md-row gap-3" style={{ height: '100%', overflowY: 'auto' }}>
                <div className="col-md-12" style={{ overflowY: 'auto', overflowX: 'hidden', paddingBottom: '2rem' }}>
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
            </div>
        </div>
    );
}

export default PreviousOrders;