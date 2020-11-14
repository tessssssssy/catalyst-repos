import React, { useState, useEffect } from 'react';
import Repo from './Repo';
import API_KEY from './api';
import './RepoList.scss';

const RepoList = ({filter, sortOption}) => {
    const [page, setPage] = useState(1); // increment on scroll and then call api again until result == []
    const [repos, setRepos] = useState([])

    const getRepos = async () => {
        try {
            const response = await fetch(`https://api.github.com/orgs/catalyst/repos?page=${page}&per_page=12`, {
                headers: {
                    Authorization: `token  350a17f9ce560b92fa12d89a0bcf3dde2a1c3bc5`
                }
            });
            const data = await response.json();
            setRepos([...repos, ...data]);
            console.log(repos);
        } catch (err) {
            console.error(err.message)
        }
    }

    const handleScroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight) - 1;
        console.log(docHeight)
        const windowBottom = windowHeight + window.pageYOffset;
        console.log(windowBottom)
        if (windowBottom >= docHeight) {
          console.log('bottom reached');
          if (page < 12) {
            setPage(prevPage => prevPage + 1);
            console.log(page)
            // getRepos();
          }
          
        } else {
          console.log('not at bottom');
        }
      }

    useEffect(() => {
        // this is getting called over and over again
        if (page === 1) {
            window.addEventListener("scroll", handleScroll);
        }
        getRepos();
    }, [page])

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
        if (sortOption === 'created-at') {
            let sortedRepos = repos.sort(GetSortOrder("created_at"))
            return sortedRepos
        } else if (sortOption === 'updated-at') {
            let sortedRepos = repos.sort(GetSortOrder("updated_at"))
            return sortedRepos
        } else {
            let sortedRepos = repos.sort(GetSortOrder("name"))
            return sortedRepos
        }
    }

    const renderRepos = (repos) => {
        let filteredRepos = filterRepos(repos)
        let sortedRepos = sortRepos(filteredRepos)
        console.log(sortedRepos)
        return sortedRepos.map((repo, index) => {
            return (
                <Repo  key={index} props={repo}/>
            )
        })
    }
    return (<div className="repos-list">
    {renderRepos(repos)}
    </div>)
}

export default RepoList;