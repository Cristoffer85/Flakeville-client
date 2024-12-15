import React, { useState, useEffect } from 'react';
import { fetchLifts, startLift, stopLift } from '../../../Api/EmployeeApi/EmployeeApi.jsx';
import '../EmployeeAccount.css';

function LiftManagement() {
    const [lifts, setLifts] = useState([]);
    const [liftStatus, setLiftStatus] = useState({});

    useEffect(() => {
        fetchLifts().then(setLifts);
    }, []);

    const handleStartLift = async (id) => {
        await startLift(id);
        const updatedLifts = await fetchLifts();
        setLifts(updatedLifts);
    };

    const handleStopLift = async (id) => {
        await stopLift(id);
        const updatedLifts = await fetchLifts();
        setLifts(updatedLifts);
    };

    return (
        <div className="liftManagementBox">
            <h2>Lift Management</h2>
            <ul>
                {lifts.map((lift) => (
                    <li key={lift.id}>
                        {lift.name} - {lift.status}
                        <button onClick={() => handleStartLift(lift.id)}>Start</button>
                        <button onClick={() => handleStopLift(lift.id)}>Stop</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LiftManagement;