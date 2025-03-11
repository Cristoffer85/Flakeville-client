import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../Contexts/AuthContext/AuthContext.jsx';

const HOC = ({ children }) => {
    const { authState } = useContext(AuthContext);
    const { isLoggedIn } = authState;
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('*');
        }
    }, [isLoggedIn, navigate]);

    return isLoggedIn ? children : null;
};

export default HOC;