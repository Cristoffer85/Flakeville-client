import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../CONTEXTS2/CONTEXT2/AUTHCONTEXT2.jsx';

const HOC = ({ children, requiredRole }) => {
    const { authState } = useContext(AuthContext);
    const { isLoggedIn, role } = authState;
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/signin');
        } else if (requiredRole && role !== requiredRole) {
            navigate('/not-authorized');
        }
    }, [isLoggedIn, role, requiredRole, navigate]);

    return isLoggedIn && (!requiredRole || role === requiredRole) ? children : null;
};

export default HOC;