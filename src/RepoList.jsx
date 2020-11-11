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

    const filterRepos = (repos) => {
        if (filter === 'forked') {
            return repos.filter(repo => repo.fork)
        } else if (filter === 'not-forked') {
            return repos.filter(repo => !repo.fork)
        } else {
            return repos;
        }
    }
    //Comparer Function    
    const GetSortOrder = (prop) => {    
        return (a, b) => {    
            if (a[prop] > b[prop]) {    
                return 1;    
            } else if (a[prop] < b[prop]) {    
                return -1;    
            }    
            return 0;    
        }    
    }    
    const sortRepos = (repos) => {
        if (sortOption === 'created-time') {
            let sortedRepos = repos.sort(GetSortOrder("created_at"))
            console.log(sortedRepos)
            return sortedRepos
        } else if (sortOption === 'updated-time') {
            let sortedRepos = repos.sort(GetSortOrder("updated_at"))
            console.log(sortedRepos)
            return sortedRepos
        } else {
            let sortedRepos = repos.sort(GetSortOrder("name"))
            console.log(sortedRepos)
            return sortedRepos
        }
    }

    const renderRepos = (repos) => {
        let filteredRepos = filterRepos(repos)
        let sortedRepos = sortRepos(filteredRepos)
        console.log(sortedRepos)
        return sortedRepos.map((repo) => {
            return <p>{repo.name}</p>
        })
    }

    return (<>
    {renderRepos(repos)}
    </>)
}

export default RepoList;