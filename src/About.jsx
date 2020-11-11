import React, { useState, useEffect } from 'react';


const About = () => {
    // page about Catalyst IT
    const [data, setData] = useState([]);
    const getData = async () => {
        try {
            const response = await fetch("https://api.github.com/orgs/catalyst");
            const data = await response.json();
            console.log(data)
        } catch (err) {
            console.error(err.message)
        }
    }
    useEffect(() => {
        getData();
    })
    return (
        <div>
            <h1>About Us</h1>
        </div>
    )
}

export default About;
