import React, { useState } from 'react';
import Cookies from 'js-cookie';
import EmployeeDetails from '../../Pages/EmployeeAccount/EmployeeDetails/EmployeeDetails.jsx';
import ProductManagement from '../../Pages/EmployeeAccount/ProductManagement/ProductManagement.jsx';
import LiftManagement from '../../Pages/EmployeeAccount/LiftManagement/LiftManagement.jsx';
import Chat from '../../Components/Chat/Chat.jsx';

import './EmployeeAccount.css';

function EmployeeAccount() {
    const username = Cookies.get('username');
    const [currentSection, setCurrentSection] = useState('employeeDetails');

    return (
        <div>
            <div className="sidebar">
                <p onClick={() => setCurrentSection('employeeDetails')}>Employee Details</p>
                <p onClick={() => setCurrentSection('productManagement')}>Product Management</p>
                <p onClick={() => setCurrentSection('liftManagement')}>Lift Management</p>
                <Chat />
            </div>

            {currentSection === 'employeeDetails' && <EmployeeDetails username={username} />}
            {currentSection === 'productManagement' && <ProductManagement />}
            {currentSection === 'liftManagement' && <LiftManagement />}
        </div>
    );
}

export default EmployeeAccount;