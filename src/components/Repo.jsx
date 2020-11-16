
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import "../stylesheets/Repo.scss";

const Repo = ({ props }) => {
  const [open, setOpen] = useState(false);
  const [contributors, setContributors] = useState([]);


  const getContributors = async () => {
    try {
      const response = await fetch(props.contributors_url);
      const contributors = await response.json();
      setContributors(contributors);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleClickOpen = () => {
    getContributors();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
              <i class="fas fa-plus-circle"></i>
            </button>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div
          className="modal-content"
          style={{
            margin: "20px",
            border: "none",
            width: "90%",
            minWidth: "350px",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>{props.name}</h2>
          <p style={{ fontWeight: "bold" }}>Description</p>
          <p style={{ marginBottom: "20px" }}>{props.description}</p>
          <p>Created: {props.created_at}</p>
          <p>Updated: {props.updated_at}</p>
          <p>Fork: {props.fork ? 'Yes' : 'No'}</p>
          <div style={{display: "flex"}}>
          <p>Stargazers: {props.stargazers_count}</p>
          <p style={{ marginLeft: "10px" }}>
            Watchers: {props.watchers_count}
          </p>
          </div>
          <p>
            Language: {props.language}
          </p>
          {props.license && <p>
            License: {props.license.name}
          </p>}
          <p style={{ fontWeight: "bold", marginTop: "20px" }}>Top Contributors</p>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            
            {contributors.filter((c, i) => i < 5 ).map((contributor) => {
              return (
                <div className="contributor" style={{ margin: "10px" }}>
                  <img
                    style={{ width: "50px", display: "block" }}
                    src={contributor.avatar_url}
                    alt="profile photo"
                  />
                  <a href={contributor.html_url} target="_blank">
                    {contributor.login}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
        <DialogActions>
          <Button>
          <a href={props.html_url} target="_blank">
            Github
          </a>
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Repo;
