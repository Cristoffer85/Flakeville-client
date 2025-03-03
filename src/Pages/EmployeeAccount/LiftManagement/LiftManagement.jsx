import React, { useState, useEffect } from 'react';
import { fetchLifts, startLift, stopLift } from '../../../Api/EmployeeApi/EmployeeApi.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function LiftManagement() {
    const [lifts, setLifts] = useState([]);

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
        <div className="container">
            <h2 className="mb-4">Lift Management</h2>
            <ul className="list-group">
                {lifts.map((lift) => (
                    <li key={lift.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {lift.name} - {lift.status}
                        <div>
                            <button onClick={() => handleStartLift(lift.id)} className="btn btn-success btn-sm me-2">Start</button>
                            <button onClick={() => handleStopLift(lift.id)} className="btn btn-danger btn-sm">Stop</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LiftManagement;