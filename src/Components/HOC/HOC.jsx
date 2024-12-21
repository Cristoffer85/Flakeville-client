import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const HOC = ({ children }) => {
    const isAuthenticated = Cookies.get('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('*');
        }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? children : null;
};

export default HOC;