import config from '../Apiconfig';

export const fetchProductsByCategory = async (categories) => {
    const products = await Promise.all(categories.map(async (category) => {
        const response = await fetch(`${config.backendUrl}/products/category/${category}`);
        return await response.json();
    }));

    return products.flat();
};

export const getAllProducts = async () => {
    const response = await fetch(`${config.backendUrl}/products/getAllProducts`);
    return await response.json();
};