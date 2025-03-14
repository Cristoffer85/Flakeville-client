import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import PageTitleContext from '../contexts/pagetitlecontext/pagetitlecontext.jsx';
import CartContext from '../contexts/cartcontext/cartcontext.jsx';
import LiftsContext from '../contexts/liftscontext/liftscontext.jsx';
import AuthContext from '../contexts/authcontext/authcontext.jsx';

import { fetchLifts } from '../api/employeeapi/employeeapi.jsx';
import { getUnreadMessagesCount } from '../api/chatapi/chatapi.jsx';
import { navigateBasedOnRole } from '../components/router/router.jsx';

const useNavbarLogic = (handleLogout) => {
  const { cart } = useContext(CartContext);
  const pageTitle = useContext(PageTitleContext);
  const { authState } = useContext(AuthContext);
  const { isLoggedIn, username, token } = authState;
  const navigate = useNavigate();
  const { setLifts } = useContext(LiftsContext);

  const [isSnowing, setIsSnowing] = useState(false);
  const [snowKey, setSnowKey] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);

  const totalItems = cart.reduce((total, product) => total + product.quantity, 0);

  useEffect(() => {
    const fetchLiftsData = async () => {
      try {
        const data = await fetchLifts();
        if (Array.isArray(data)) {
          setLifts(data);
        } else {
          console.error('Data is not an array:', data);
        }
      } catch (error) {
        console.error('Failed to fetch lifts:', error);
      }
    };
    fetchLiftsData();
  }, [setLifts]);

  useEffect(() => {
    const fetchUnreadMessages = async () => {
      try {
        const count = await getUnreadMessagesCount(username, token);
        setUnreadMessages(count);
      } catch (error) {
        console.error('Failed to fetch unread messages:', error);
      }
    };

    if (isLoggedIn) {
      fetchUnreadMessages();
      const interval = setInterval(fetchUnreadMessages, 1000);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn, username, token]);

  const handleSignInClick = () => {
    navigate('/signin');
  };

  const handleSignOutClick = () => {
    handleLogout();
    toast.success('Successfully logged out.');
    setTimeout(() => navigate('/'), 5);
  };

  const handleAccountClick = () => {
    if (isLoggedIn) {
      const { role } = authState;
      navigateBasedOnRole(role, navigate);
    }
  };

  const handleStartSnow = () => {
    setIsSnowing(true);
    setSnowKey(prev => prev + 1);
  };

  return {
    isLoggedIn,
    totalItems,
    pageTitle,
    isSnowing,
    snowKey,
    unreadMessages,
    handleSignInClick,
    handleSignOutClick,
    handleAccountClick,
    handleStartSnow,
  };
};

export default useNavbarLogic;