import React, { useState } from "react";
import { Select, MenuItem, Switch } from "@material-ui/core";
import RepoList from "./RepoList";
import "../stylesheets/Home.scss";

const Home = () => {
  const [filter, setFilter] = useState("all");
  const [sortOption, setSortOption] = useState("created-at");
  const [sortDescending, setSortDescending] = useState(true);

  return (
    <div className="main">
      <div className="home">
        <div className="home-options">
          <div className="select-container">
            <label>Show: </label>
            <Select
              className="select"
              labelid="select-filter"  
              value={filter}
              onChange={(evt) => setFilter(evt.target.value)}
            >
              <MenuItem value={"forked"}>Forked</MenuItem>
              <MenuItem value={"not-forked"}>Not Forked</MenuItem>
              <MenuItem value={"all"}>All</MenuItem>
            </Select>
          </div>

          <div className="select-container">
            <label id="select-sort-option">Sort by: </label>
            <Select
              className="select"
              labelid="select-sort-option"
              value={sortOption}
              onChange={(evt) => setSortOption(evt.target.value)}
            >
              <MenuItem value={"created-at"}>Created Time</MenuItem>
              <MenuItem value={"updated-at"}>Updated Time</MenuItem>
              <MenuItem value={"name"}>Name</MenuItem>
            </Select>
            <label id="toggle-descending">{sortDescending ? 'Descending' : 'Ascending'}</label>
            <Switch
              onChange={(evt) => setSortDescending(!sortDescending)}
              color="default"
              labelid="toggle-descending"
            />
          </div>
        </div>
        <RepoList sortDescending={sortDescending} sortOption={sortOption} filter={filter} />
      </div>
    </div>
  );
};

export default Home;
