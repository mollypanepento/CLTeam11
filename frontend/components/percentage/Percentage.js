import React from 'react';
import './Percentage.css';

function Percentage(props) {
    const percent = props.percent || Percentage.defaultProps.percent;
    return (
        <div className = 'percent-result'>
            <h1 className = 'results-title'>Your Results</h1>
            <h1 className = 'percent'>{percent}%</h1>
            <h2></h2>
            <h3>Your music taste is {percent}% similar to other UMD members! Scroll down to see what other 
            people in your community are listening to...</h3>
        </div>
    )

}

Percentage.defaultProps = {
    percent: 0,
}

export default Percentage;

