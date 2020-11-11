import React, { useState, useEffect } from 'react';


const RepoList = ({filter, sortOption}) => {
    console.log(filter)
    console.log(sortOption)
    const [repos, setRepos] = useState([])

    const getRepos = async () => {
        // call api
        // save data to state
        try {
            const response = await fetch("https://api.github.com/orgs/catalyst/repos");
            const data = await response.json();
            setRepos(data);
            console.log(data);
        } catch (err) {
            console.error(err.message)
        }
    }
    useEffect(() => {
        getRepos();
    }, [])
    return (<>
        {repos.map(repo => {
            // should render a repo component
            // expand on mobile/ open modal on desktop
            return (<p>{repo.name}</p>)
        }) }
    </>)
}

export default RepoList;