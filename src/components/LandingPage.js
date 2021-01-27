import React from 'react'
import formImage from '../form.svg'
import {Link} from 'react-router-dom'
import { Button, Container } from 'react-bootstrap'

function LandingPage() {
    return (
        <div style={{ background: 'linear-gradient(to top, rgba(0,0,160,0.6), rgba(0,0,170,0.8))', height: '100vh',}}>
        <Container
            className="d-flex flex-direction-row justify-content-space-evenly align-items-center"
        >
            <div>
                <img src={formImage} alt='' width='750px' height='600px'/>
            </div>
            <div>
                <h1 style={{color: 'white', fontSize: '60px', fontStyle: 'bold'}}>Appointment Scheduler</h1>
                <Link to='/book'  style={{textDecoration: 'none', color: 'white'}}>
                    <Button type='button' variant="primary" size="lg">
                        Schedule Now
                    </Button>
                </Link>
            </div>
        </Container>
        </div>
    )
}

export default LandingPage
