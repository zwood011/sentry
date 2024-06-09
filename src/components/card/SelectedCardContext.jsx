import React, { createContext, useContext, useState } from 'react';

const SelectedCardContext = createContext();

export const SelectedCardProvider = ({ children }) => {
    const [selectedCardId, setSelectedCardId] = useState(null);

    return (
        <SelectedCardContext.Provider value={{ selectedCardId, setSelectedCardId }}>
            {children}
        </SelectedCardContext.Provider>
    );
};

export const useSelectedCard = () => useContext(SelectedCardContext);