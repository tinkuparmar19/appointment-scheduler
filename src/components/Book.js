import React, { useRef } from 'react'
import { Form, Button, Card, Container, Col, Row } from 'react-bootstrap'

function Book() {

    const title = useRef('')
    const date = useRef('')
    const fromTime = useRef('')
    const toTime = useRef('')
    const email = useRef('')


    var gapi = window.gapi
    
    var CLIENT_ID = process.env.REACT_APP_ID
    var API_KEY = process.env.REACT_APP_KEY
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    var SCOPES = "https://www.googleapis.com/auth/calendar.events"
  
    const handleSubmit = (e) => {
      e.preventDefault()

      gapi.load('client:auth2', () => {
        console.log('loaded client')
  
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
  
        gapi.client.load('calendar', 'v3', () => console.log('loaded successfully!'))
  
        gapi.auth2.getAuthInstance().signIn()
        .then(() => {
          
          var event = {
            'summary': `${title.current.value}`,
            'description': 'Really great refreshments',
            'start': {
              'dateTime': `${date.current.value}T${fromTime.current.value}:00+05:30`,
               'timeZone': 'Asia/Kolkata',
            },
            'end': {
              'dateTime': `${date.current.value}T${toTime.current.value}:00+05:30`,
              'timeZone': 'Asia/Kolkata',
            },
            'recurrence': [
              'RRULE:FREQ=DAILY;COUNT=2'
            ],
            'attendees': [
              {'email': 'tinkuparmar2913@gmail.com'},
              {'email': `${email.current.value}`}
            ],
            'reminders': {
              'useDefault': false,
              'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10}
              ]
            }
          }
  
          var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event,
          })
  
          request.execute(event => {
            console.log(event)
            window.open(event.htmlLink)
          })
          
          gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
          }).then(response => {
            const events = response.result.items
            console.log('event scheduled')
          }).catch(e => {
            console.log(e)
          })
        })
      })
    }
    return (
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{minHeight: '100vh'}}
        >
          <div className='w-100' style={{maxWidth: '400px'}}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Book Appointment</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicTitle">
                      <Form.Label>Enter Title</Form.Label>
                      <Form.Control type="text" ref={title} placeholder="Enter title" required/>
                  </Form.Group>
                  <Form.Group controlId="formBasicTitle">
                      <Form.Label>Enter Email</Form.Label>
                      <Form.Control type="email" ref={email} placeholder="Enter Email" required/>
                  </Form.Group>
                  <Form.Group controlId="formBasicDate">
                      <Form.Label>Date</Form.Label>
                      <Form.Control type="date" data-date-format='yyyy-mm-dd' ref={date} required/>
                  </Form.Group>
                  <Form.Group controlId="formTimeFrom">
                      <Form.Label>Time</Form.Label>
                      <Row>
                        <Col>
                          <Form.Control type="time" ref={fromTime} required/>
                        </Col>
                        To
                        <Col>
                          <Form.Control type="time" ref={toTime} required/>
                        </Col>
                      </Row>
                  </Form.Group>
                  <Button variant="primary" size="lg" block type="submit">
                      Submit
                  </Button>
            </Form>
            </Card.Body>
          </Card>
        </div>
        </Container>
    )
}

export default Book
