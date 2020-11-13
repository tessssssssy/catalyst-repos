
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
import './RepoList.scss';

const Repo = ({name, description, contributorsUrl }) => {
  const [open, setOpen] = useState(false);
  const [contributors, setContributors] = useState([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const getContributors = async () => {
      try {
        const response = await fetch(contributorsUrl, {
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
    console.log(name)
    // getContributors();
}, [])
  return (
    <div className="card">
      <div>
        <p>{name}</p>
        <p>{description}</p>
        <Button onClick={handleClickOpen}>+</Button>
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {description}
          </DialogContentText>
          {/* <DialogContentText>
            {contributors.map(contributor => {
                return <a href={contributor.html_url} target="_blank">{contributor.login}</a>
            })}
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
            View
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Repo;

