import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AuthContext from '../context/auth/AuthContext';
function NavBar() {
  let location = useLocation();
  React.useEffect(() => {
  }, [location]);
  const context = useContext(AuthContext)
  const { user, signInUser, signOut, admin } = context
  const handleSignOut = () => {
    signOut()
  }
  const handleSignIn = () => {
    signInUser()
  }
  return (
    <nav className="navbar navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Movies For You</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Movies For You</h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/blogs' ? 'active' : ''}`} to="/blogs">Blogs</Link>
              </li>
              <li className="nav-item">
                <Link to="/">
                  <button className='btn btn-primary' onClick={handleSignOut} style={{
                    display: user !== null ? 'inline' : 'none'
                  }}>Sign out</button>
                </Link>
              </li>
              <li className="nav-item my-3">
                <button className='btn btn-primary' onClick={handleSignIn} style={{
                  display: user !== null ? 'none' : 'inline'
                }}>Sign in with Google</button>
              </li>
              <li className="nav-item my-3">
                <Link className='btn btn-outline-primary' style={{
                  display: admin !== null && user !== null ? 'inline' : 'none'
                }} to='/addpost'>Add new Post</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar