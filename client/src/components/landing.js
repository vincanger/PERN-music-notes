import React from 'react';
import { Link } from 'react-router-dom';

const landing = () => {
    return(
        <div className="jumbotron bg-light jumbotron-fluid m-5 p-4">
            <h1 className="display-4">Music Notes</h1>
            <h2 className="display-6">Notes for your music ;)</h2>
            <p>Sign in and keep your musical ideas safe</p>
            <Link to="/login" className="btn btn-primary">Let's go</Link>
        </div>
    );
};



export default landing;