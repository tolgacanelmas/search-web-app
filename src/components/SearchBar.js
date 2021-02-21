import React from 'react'

function SearchBar({ handleChangeInput }) {

    return (
        <div className="search-bar">
            <input type="text" placeholder="Search anything" onChange={e => handleChangeInput(e)} />
            <button className="search-button">Search</button>
        </div>
    )
}

export default SearchBar
