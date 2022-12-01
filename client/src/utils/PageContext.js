import React, { createContext, useContext } from "react";

const PageContext = createContext();

export const usePageContext = () => useContext(PageContext);

export const PageProvider = ({ children }) => {
    const pageInfo = {
        currentPage: 'About',
        pages: [
            'About',
            'Contact',
            'Something Else'
        ],
    }

    return (
        <PageContext.Provider value={pageInfo}>
            {children}
        </PageContext.Provider>
    )
}