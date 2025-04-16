import { createContext, useState } from "react";

import { SearchContextType, ChildrenProp } from "../types";

const SearchContext = createContext<SearchContextType | undefined>(undefined);

const SearchProvider = ({ children }: ChildrenProp) => {

    const [searchValue, setSearchValue] = useState('');

    return(
        <SearchContext.Provider
            value={{
                searchValue,
                setSearchValue
            }}
        >
            { children }
        </SearchContext.Provider>
    )
}

export {SearchProvider};
export default SearchContext;