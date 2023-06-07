import React, { useState, useEffect } from "react";
import { SearchField } from "./searchField";

export const SearchForm = () => {
    const [strFound, setStrFound] = useState("one");
    useEffect(() => {
        console.log(strFound);
    }, [strFound]);

    const handleChange = (e) => {
        setStrFound(e.target.value);
    };
    const handleSubmint = (e) => {
        e.preventDefault();
    };
    console.log("searchField:", strFound);
    return (
        <div>
            <form onSubmit={handleSubmint}>
                <SearchField
                    id="search"
                    name="search"
                    value={strFound}
                    onChange={handleChange}
                />
            </form>
        </div>
    );
};
