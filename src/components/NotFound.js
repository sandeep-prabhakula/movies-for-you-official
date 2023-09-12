import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Navbar from './NavBar'

function NotFound() {
  const navigate = useNavigate()
  const toHome = () => {
    navigate('/')
  }
  const toLatestUpdates = () => {
    navigate('/news')
  }
  return (
    <>
<Navbar/>
      <div className="d-flex  justify-content-center ">
        <div className="card">
          <img src="/logo512.png" alt="" className='card-img ing-fluid opacity-25 ' />
          <div className="card-img-overlay d-flex flex-column justify-content-center">
            <h1 className='bebasneue'>Error 404</h1>
            <h1 className='bebasneue'>
              Oops!.. You've lost the path.
            </h1>
            <div className="container d-flex flex-row justify-content-around align-items-center gap-3">

              <Button onClick={toHome} className='btn btn-dark nexa'>
                Go to Home
              </Button>
              <Button onClick={toLatestUpdates} className='btn btn-dark nexa'>
                Watch Latest Updates
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFound