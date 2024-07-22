// ProductContext.js
import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [getRingFunction, setGetRingFunction] = useState(null);
  const [getNecklaceFunction, setGetNecklaceFunction] = useState(null);
  const [getBanglesFunction, setGetBanglesFunction] = useState(null);
  const [getEarFunction, setGetEarFunction] = useState(null);
  const [getDiamondFunction, setGetDiamondFunction] = useState(null);
  const [getRetailFunction, setGetRetailFunction] = useState(null);
  const [getWholeFunction, setGetWholeFunction] = useState(null);
  const [getBuyFunction, setBuyFunction] = useState(null);
  return (
    <ProductContext.Provider value={{getBuyFunction,setBuyFunction,getWholeFunction,setGetWholeFunction,getRetailFunction,setGetRetailFunction,getDiamondFunction,setGetDiamondFunction,getEarFunction,setGetEarFunction,getBanglesFunction,setGetBanglesFunction, getRingFunction, setGetRingFunction, getNecklaceFunction, setGetNecklaceFunction }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
