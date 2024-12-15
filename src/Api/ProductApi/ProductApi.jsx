import Cookies from 'js-cookie';
import config from '../Apiconfig';

export const getOneProduct = async (id) => {
    const response = await fetch(`${config.backendUrl}/products/getOneProduct/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch product: ' + await response.text());
    }
    return await response.json();
};

export const getAllProducts = async () => {
    const response = await fetch(`${config.backendUrl}/products/getAllProducts`);
    if (!response.ok) {
        throw new Error('Failed to fetch products: ' + await response.text());
    }
    return await response.json();
};

export const createProduct = async (product) => {
    const token = Cookies.get('token');
    const response = await fetch(`${config.backendUrl}/products/createProduct`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(product)
    });
    if (!response.ok) {
        throw new Error('Product creation failed: ' + await response.text());
    }
    return await response.json();
};

export const updateProduct = async (id, product) => {
    const token = Cookies.get('token');
    const response = await fetch(`${config.backendUrl}/products/updateProduct/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(product)
    });
    if (!response.ok) {
        throw new Error('Product update failed: ' + await response.text());
    }
    return await response.json();
};

export const deleteProduct = async (id) => {
    const token = Cookies.get('token');
    const response = await fetch(`${config.backendUrl}/products/deleteProduct/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Product deletion failed: ' + await response.text());
    }
};