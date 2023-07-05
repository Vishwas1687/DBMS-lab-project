import { useState, useContext, createContext, useEffect } from "react";

const QuantityContext = createContext();
const QuantityProvider = ({ children }) => {
  const [quantityLocal, setQuantityLocal] = useState([]);

    useEffect(() =>{
        let existingQuantityItem = localStorage.getItem('quantityLocal')
        if(existingQuantityItem) setQuantityLocal(JSON.parse(existingQuantityItem)) 
    }, [])

  return (
    <QuantityContext.Provider value={[quantityLocal, setQuantityLocal]}>
      {children}
    </QuantityContext.Provider>
  );
};

// custom hook
const useQuantityLocal = () => useContext(QuantityContext);

export { useQuantityLocal, QuantityProvider };