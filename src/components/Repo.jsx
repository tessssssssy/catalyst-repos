
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
      const response = await fetch(props.contributors_url, {
        headers: {
          Authorization: `token  350a17f9ce560b92fa12d89a0bcf3dde2a1c3bc5`,
        },
      });
      const contributors = await response.json();
      setContributors(contributors);
      console.log(contributors);
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
          <h2 style={{ marginBottom: "40px" }}>{props.name}</h2>
          <p style={{ fontWeight: "bold" }}>Description</p>
          <p style={{ marginBottom: "40px" }}>{props.description}</p>
          <p>Created: {props.created_at}</p>
          <p>Updated: {props.updated_at}</p>
          <p>Stargazers: {props.stargazers_count}</p>
          <p style={{ marginBottom: "40px" }}>
            Watchers: {props.watchers_count}
          </p>
          <p style={{ fontWeight: "bold" }}>Contributors</p>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {contributors.map((contributor) => {
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
};

export default Repo;
