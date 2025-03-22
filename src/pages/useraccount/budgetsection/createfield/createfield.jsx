import React, { useState } from 'react';

function CreateFieldModal({ onClose, onCreate }) {
    const [fieldName, setFieldName] = useState('');
    const [fieldValue, setFieldValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(fieldName, fieldValue);
        setFieldName('');
        setFieldValue('');
        onClose();
    };

    return (
        <div className="card position-relative">
            <button
                type="button"
                className="btn-close position-absolute top-0 end-0 m-2"
                aria-label="Close"
                onClick={onClose}
            ></button>
            <div className="card-body">
                <h5 className="card-title">Create New Field</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Field Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={fieldName}
                            onChange={(e) => setFieldName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Value:</label>
                        <input
                            type="number"
                            className="form-control"
                            value={fieldValue}
                            onChange={(e) => setFieldValue(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Create Field
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateFieldModal;