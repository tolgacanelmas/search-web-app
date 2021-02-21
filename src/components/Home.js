import React, { useState } from 'react'

import SearchBox from './SearchBox'
import SearchList from './SearchList'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const Home = ({ data }) => {
    const [searchText, setSearchText] = useState("")

    const handleChangeInput = (e) => {
        setSearchText(e.target.value)
    }

    const homeClicked = () => {
        setSearchText("")
    }

    return (
        <div>
            <Router >
                <Switch>
                    <Route path="/" exact render={(props) => <SearchBox {...props} data={data} handleChangeInput={handleChangeInput} searchText={searchText} />} />
                    <Route path={`/list`} exact render={(props) => <SearchList {...props} data={data} handleChangeInput={handleChangeInput} homeClicked={homeClicked}/>} />
                </Switch>
            </Router>
        </div>
    )
}

export default Home
