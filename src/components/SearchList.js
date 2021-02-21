import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import logo from '../assets/logo-mini.png'
import icon from '../assets/icon-finder.png'

const SearchList = ({ data, handleChangeInput, homeClicked }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [peoplePerPage, setPeoplePerPage] = useState(6)
    const [currentPeople, setCurrentPeople] = useState(data.slice(0, 6))
    const [isOptionsClicked, setIsOptionsClicked] = useState(false)

    const pageNumbers = [];
    const lastPageNumber = Math.ceil(data.length / peoplePerPage)
    for (let i = 1; i <= lastPageNumber; i++) {
        pageNumbers.push(i)
    }

    const indexOfLastPerson = currentPage * peoplePerPage
    const indexOfFirstPerson = indexOfLastPerson - peoplePerPage

    useEffect(() => {
        setCurrentPeople(data.slice(indexOfFirstPerson, indexOfLastPerson))
    }, [currentPage])

    const paginate = (number) => {
        setCurrentPage(number)
    }

    const compareName = (a, b) => {
        if (a.title < b.title) {
            return -1
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    }

    const compareYear = (a, b) => {
        const aYear = a.createdAt.slice(0,4)
        const bYear = b.createdAt.slice(0,4)

        if (aYear < bYear) {
            return -1
        }
        if (aYear > bYear) {
            return 1;
        }
        return 0;
    }

    const handleSortAscending = () => {
        const sortedPeople = currentPeople.sort(compareName)
        setCurrentPeople(sortedPeople)
        setIsOptionsClicked(false)
    }

    const handleSortDescending = () => {
        const sortedPeople = currentPeople.sort().reverse(compareName)
        setIsOptionsClicked(false)
        setCurrentPeople(sortedPeople)
    }

    const handleYearAscending = () => {
        setIsOptionsClicked(false)
        const sortedPeople = currentPeople.sort(compareYear)
        setCurrentPeople(sortedPeople)
    }

    const handleYearDescending = () => {
        setIsOptionsClicked(false)
        const sortedPeople = currentPeople.sort().reverse(compareYear)
        setCurrentPeople(sortedPeople)
    }

    const options = (
        <div className="sort-people">
            <button onClick={handleSortAscending}>Name Ascending</button>
            <button onClick={handleSortDescending}>Name Descending</button>
            <button onClick={handleYearAscending}>Year Ascending</button>
            <button onClick={handleYearDescending}>Year Descending</button>
        </div>
    )

    const handleShowOptions = () => {
        setIsOptionsClicked(!isOptionsClicked)
    }

    return (
        <div className="search-list">
            <div className="search-list-header">
                <Link to="/" onClick={homeClicked}>
                    <img src={logo} />
                </Link>
                <SearchBar handleChangeInput={handleChangeInput} />
            </div>
            <div className="search-list-body">
                <div className="options">
                    <img src={icon} />
                    <button onClick={handleShowOptions}>
                        Order By
                    </button>
                    {
                        isOptionsClicked && options
                    }
                </div>
                <div className="all-people">
                    {
                        currentPeople.map(person => {
                            return (
                                <div className="person">
                                    <h3>
                                        {person.title}
                                    </h3>
                                    <p>
                                        {person.name} - {person.createdAt.slice(0,4)}
                                    </p>
                                </div>
                            )
                        })
                    }
                </div>
                <ul>
                    {
                        pageNumbers.map(number => (
                            <li key={number} onClick={() => paginate(number)}>
                                {number}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default SearchList
