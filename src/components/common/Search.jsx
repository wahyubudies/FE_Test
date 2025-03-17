// Search.jsx
import React, { useState, useImperativeHandle, forwardRef } from "react";

const Search = forwardRef(({ onSearch, placeholder = "Search" }, ref) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Expose reset method to parent components
    useImperativeHandle(ref, () => ({
        reset: () => {
            setSearchTerm('');
            onSearch('');
        }
    }));

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div>
            <input
                type="text"
                placeholder={placeholder}
                className="border p-2 rounded w-full"
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
    );
});

// Add display name for better debugging
Search.displayName = "Search";

export default Search;