import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { currentToken, getUserData } from './token.js';
import './Info.css'
import Top from '../components/Top.js';

const Info = () => {
    console.log("Info component rendering");
    
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [school, setSchool] = useState("");
    const [major, setMajor] = useState("");
  
    const handleSchool = (e) => {
      setSchool(e.target.value);
    };
  
    const handleMajor = (e) => {
      setMajor(e.target.value);
    };
  
    useEffect(() => {
      console.log("useEffect running");
      let isMounted = true;
  
      const fetchData = async () => {
        console.log("fetchData starting");
        try {
          if (!currentToken.access_token) {
            console.log("No token available");
            throw new Error("No access token found");
          }
  
          console.log("Calling getUserData");
          const data = await getUserData();
          console.log("Data received in component:", data);
          
          if (isMounted) {
            setUserData(data);
            setLoading(false);
          }
        } catch (err) {
          console.error("Error in fetchData:", err);
          if (isMounted) {
            setError(err.message || "Failed to fetch user data");
            setLoading(false);
          }
        }
      };
  
      fetchData();
  
      return () => {
        console.log("Cleanup running");
        isMounted = false;
      };
    }, []);
  
    console.log("Current state:", { loading, error, userData });
  
    if (loading) {
      console.log("Rendering loading state");
      return <div>Loading...</div>;
    }
  
    if (error) {
      console.log("Rendering error state");
      return <div>Error: {error}</div>;
    }
  
    console.log("Rendering main component");
    return (
      <div id="info-page">
        <Top />
        <div id="info-form">
          <h1 className="info-title">A little more about you...</h1>
          <form>
            <section className="info">
              <label htmlFor="school">What school do you attend?</label>
              <select 
                id="school" 
                name="school" 
                onChange={handleSchool} 
                value={school}
              >
                <option value="" />
                <option value="UMDCP">University of Maryland - College Park</option>
              </select>
            </section>
  
            <br />
  
            <section className="info">
              <label htmlFor="major">What is your major?</label>
              <select 
                id="major" 
                name="major" 
                onChange={handleMajor} 
                value={major}
              >
                <option value="" />
                <option value="Humanities">Humanities</option>
                <option value="Business">Business</option>
                <option value="STEM">STEM</option>
                <option value="Health">Health</option>
              </select>
            </section>
          </form>
  
          <br />
          <Link to="/results" className="btn btn-primary">
            Get my results
          </Link>
        </div>
      </div>
    );
  };
  
  export default Info;