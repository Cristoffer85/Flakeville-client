import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const HOC = ({ children }) => {
    const isAuthenticated = Cookies.get('token'); // replace this with your authentication logic
    const navigate = useNavigate();

    if (!isAuthenticated) {
        navigate('*');
    }

    return children;
};

export default HOC;