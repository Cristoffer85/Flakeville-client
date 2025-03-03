import React, { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState(null);

    return (
        <UserContext.Provider value={{ username, setUsername }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;