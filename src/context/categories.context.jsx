import { createContext, useState, useEffect } from "react";

import { addCollectionAndDocuments, getCategriesAndDocuments } from "../utils/firebase/firebase.utils.js";

//import SHOP_DATA from '../shop-data.js';

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState ({});

    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []);

    useEffect(() => {
        const getCategoriesMap = async () => { // this because getCategriesAndDocuments is async func
            const categoryMap = await getCategriesAndDocuments();
            setCategoriesMap(categoryMap);
        }

        getCategoriesMap();
    }, []);

    const value = { categoriesMap };
    return (
        <CategoriesContext.Provider value={value}> 
            {children}
        </CategoriesContext.Provider>)
}