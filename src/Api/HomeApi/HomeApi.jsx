import config from '../Apiconfig';

export const fetchLifts = async () => {
    const response = await fetch(`${config.backendUrl}/skilifts/getAllLifts`);
    const data = await response.json();
    if (!Array.isArray(data)) {
        throw new Error('Data is not an array: ' + JSON.stringify(data));
    }
    return data;
};