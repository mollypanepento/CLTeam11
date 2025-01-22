import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


function Info() {
    const[school, setSchool] = useState('');
    const[major, setMajor]  = useState('');

    const handleSchool = (e) => {
        setSchool(e.target.value);
    }

    const handleMajor = (e) => {
        setMajor(e.target.value);
    }


    return (
        <>
            <h1>A little more about you...</h1>
            <form>
                <section className='info'>
                    <label htmlFor='school' > What school do you attend? </label>
                    <select id="school" name="school" onChange={handleSchool} value = {school}>
                        <option value='' />
                        <option value='UMDCP'>University of Maryland - College Park</option>
                    </select>
                </section>

                <br></br>

                <section className='info'>
                    <label htmlFor='major'> What is your major? </label>
                    <select id='major' name='major' onChange={handleMajor} value = {major}>
                        <option value='' />
                        <option value='Humanities'>Humanities</option>
                        <option value='Business'>Business</option>
                        <option value='STEM'>STEM</option>
                        <option value='Health'>Health</option>
                    </select>
                </section>
                {/* <br></br>
                <section class='submission'>
                    <input type='submit' value='Save Changes'/>
                </section> */}
            </form>

            <br></br>
            <Link to = '/results' className = "btn btn-primary">Get my results</Link>
        </>
    )
}

export default Info;