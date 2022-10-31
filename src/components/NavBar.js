import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router";
import { Button } from 'react-bootstrap';

function Navbar() {
    let location = useLocation();
    React.useEffect(() => {
    }, [location]);
    const { logOut } = useUserAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logOut();
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <>
            <nav className="navbar fixed-top navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/home">
                        <img src="/favicon.ico" alt="movies4u" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/reviews" ? 'active' : ''}`} aria-current="page" to="/reviews">Reviews</Link>
                            </li>
                            <li className={`nav-item ${location.pathname === "/suggestions" ? 'active' : ''}`}>
                                <Link className="nav-link" to="/suggestions">Suggestions</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/pre-release-business" ? 'active' : ''}`} to="/pre-release-business">Pre Release Business</Link>
                            </li>
                        </ul>
                        <Button className='btn btn-primary' onClick={handleLogout}>Sign out</Button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar