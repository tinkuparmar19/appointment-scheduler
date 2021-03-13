import React from 'react'
import {Link} from 'react-router-dom'
import { Button } from 'react-bootstrap'

function LandingPage() {
    return (
        <div 
            style={{ background: 'linear-gradient(to top, rgba(0,0,160,0.6), rgba(0,0,170,0.8))', height: '100vh',}}
            className="d-flex flex-column justify-content-center align-items-center"
        >
            <h1 style={{color: 'white', fontSize: '60px', fontStyle: 'bold'}}>Appointment Scheduler</h1>
            <Link to='/book'  style={{textDecoration: 'none', color: 'white'}}>
                <Button type='button' variant="primary" size="lg">
                    Schedule Now
                </Button>
            </Link>
        </div>
    )
}

export default LandingPage
