import { useState, useContext, createContext } from "react";

const SearchContext = createContext();
const SearchProvider = ({ children }) => {
  const [reply, setReply] = useState({
    search:"",
    results: [],
  });


  return (
    <SearchContext.Provider value={[reply, setReply]}>
      {children}
    </SearchContext.Provider>
  );
};

// custom hook
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };