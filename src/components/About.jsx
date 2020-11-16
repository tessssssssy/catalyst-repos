import React, { useState, useEffect } from "react";
import "../stylesheets/About.scss";

const About = () => {
  // page about Catalyst IT
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await fetch("https://api.github.com/orgs/catalyst");
      const data = await response.json();
      setData(data);
      console.log(data);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getData();
  });
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>{data.description}</p>
      <div className="about-item">
        <h3>Location</h3>
        <p>{data.location}</p>
      </div>
      <div className="about-item">
        <h3>Logo</h3>
        <img src={data.avatar_url} />
      </div>
      <div className="about-item">
        <a href={data.html_url}>See our Github</a>
        <a href={data.blog}>View our Blog</a>
      </div>
    </div>
  );
};

export default About;
