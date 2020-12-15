import React from 'react';
import {Link} from 'react-router-dom';


function LoggedOutLinks() {
    return(
        <div>
            <ul className="nav nav-pills mb-3">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">About</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">Help</Link>
                </li>
            </ul>
        </div>
    )
}

export default LoggedOutLinks;