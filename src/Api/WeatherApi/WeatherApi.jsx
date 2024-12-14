import config from '../Apiconfig';

export const fetchCurrentConditions = async () => {
    const response = await fetch(`${config.backendUrl}/skiResort/currentConditions`);
    return await response.json();
};

export const fetchFiveDayConditions = async () => {
    const response = await fetch(`${config.backendUrl}/skiResort/5DayConditions`);
    return await response.json();
};