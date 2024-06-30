import React from 'react';

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        time_horizon: 1, // Default to 1
        // Other form data fields...
    });

    return (
        <AppContext.Provider value={{ formData, setFormData }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;