
import React, { useState, useEffect } from 'react';
import { Select, MenuItem } from '@material-ui/core';
import RepoList from './RepoList';

const Home = () => {
    const [filter, setFilter] = useState('all')
    const [sortOption, setSortOption] = useState('name')

    // dashboard with filters and repo list
    // call the repos api and filter them based on state - toggle forked, sort options etc
    return (
        <div>
            <h1>Catalyst IT</h1>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            onChange={(evt) => setFilter(evt.target.value)}
            >
          <MenuItem value={'forked'}>Forked</MenuItem>
          <MenuItem value={'not-forked'}>Not Forked</MenuItem>
          <MenuItem value={'all'}>All</MenuItem>
        </Select>

        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sortOption}
            onChange={(evt) => setSortOption(evt.target.value)}
            >
          <MenuItem value={'created-time'}>Created Time</MenuItem>
          <MenuItem value={'updated-time'}>Updated Time</MenuItem>
          <MenuItem value={'name'}>Name</MenuItem>
        </Select>     

            <RepoList sortOption={sortOption} filter={filter}/>
        </div>
    )
}

export default Home;

