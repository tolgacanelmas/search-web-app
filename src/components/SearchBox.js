import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import SearchBar from '../components/SearchBar'
import { Link, useHistory } from 'react-router-dom'


const SearchBox = ({ data, handleChangeInput, searchText }) => {
    const [filteredPeople, setFilteredPeople] = useState([])
    const [index, setIndex] = useState(1)

    const history = useHistory()

    useEffect(() => {
        const matchedPeople = data.filter(person => person.name.toLowerCase().includes(searchText.toLowerCase()))
        setFilteredPeople(matchedPeople)
    }, [searchText])

    const handleSelectedPerson = () => {
        history.push({
            pathname: `/list`,
            state: data
        })
    }

    const showMore = () => {
        setIndex(prev => prev + 1)
    }

    const renderPeople = () => {
        const renderedPeople = filteredPeople.slice(0, index * 3)
        if (filteredPeople.length > 0) {
            return (
                <div className="person-container">
                    <div className="person-inner">
                        {
                            renderedPeople.map((person, i) => {
                                return (
                                    <Link to={`/list`} className="person" key={i} onClick={handleSelectedPerson}>
                                        <h3>
                                            {person.title}
                                        </h3>
                                        <p>
                                            {person.name} - {person.createdAt.slice(0, 4)}
                                        </p>
                                    </Link>
                                )
                            })
                        }
                    </div>
                    {filteredPeople.length > 3 && <div className="show" onClick={showMore}>Show more ...</div>}
                </div>
            )
        }

    }

    return (
        <div className="search-box">
            <Link to="/">
                <img src={logo} />
            </Link>
            <p>Search web  app</p>
            <SearchBar handleChangeInput={handleChangeInput} />
            {
                searchText.length > 0 ? renderPeople() : null
            }
        </div>
    )
}

export default SearchBox
