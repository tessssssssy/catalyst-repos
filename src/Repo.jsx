
// html_url - link to repo
// contributors_url - contributors api

import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import './Repo.scss';

const Repo = ({props}) => {
  const [open, setOpen] = useState(false);
  const [contributors, setContributors] = useState([]);
  const theme = useTheme();

  const getContributors = async () => {
      try {
        const response = await fetch(props.contributors_url, {
            headers: {
                Authorization: `token  350a17f9ce560b92fa12d89a0bcf3dde2a1c3bc5`
            }
        });
        const contributors = await response.json();
        setContributors(contributors);
        console.log(contributors);
      } catch (err) {
          console.error(err.message)
      }
  }

  const handleClickOpen = () => {
    getContributors();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log(props.name)
    // getContributors();
}, [])

  return (
    <div className="card">
      <div className="card-content">

        <div class="card-top">
          <h4>{props.name}</h4>
          <p>{props.description}</p>
        </div>

        <div className="card-bottom">
          <div className="stars-watchers">
            <p>Stargazers: {props.stargazers_count}</p>
            <p>Watchers: {props.watchers_count}</p>
          </div>
          <div className="button-container">
            <button onClick={handleClickOpen}> 
            <i  class="fas fa-plus-circle"></i>
            </button>
          </div>

        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {/* <DialogTitle id="responsive-dialog-title">{props.name}</DialogTitle> */}
        {/* <DialogContent> */}
          {/* <DialogContentText> */}
          <div className="modal-content" style={{margin: "20px", border: "none", width: '90%', minWidth: "350px"}}>
          <h2 style={{marginBottom: "40px"}}>{props.name}</h2>
          <p style={{fontWeight: "bold"}} >Description</p>
          <p style={{marginBottom: "40px"}}>{props.description}</p>
          <p>Created: {props.created_at}</p>
          <p>Updated: {props.updated_at}</p>
          <p>Stargazers: {props.stargazers_count}</p>
            <p style={{marginBottom: "40px"}}>Watchers: {props.watchers_count}</p>
            <p style={{fontWeight: "bold"}}>Contributors</p>
          <div style={{display: "flex", flexWrap: "wrap"}}>
          {contributors.map(contributor => {
                return (
                  <div className="contributor" style={{margin: "10px"}}>
                    <img style={{width: "50px", display: "block"}} src={contributor.avatar_url} alt="profile photo"/>
                    <a href={contributor.html_url} target="_blank">{contributor.login}</a>
                  </div>
                )
            })}
          </div> 
          </div>
          {/* </DialogContentText> */}
        {/* </DialogContent> */}
        <DialogActions>
        <a href={props.html_url} target="_blank">
            Github
          </a>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Repo;

