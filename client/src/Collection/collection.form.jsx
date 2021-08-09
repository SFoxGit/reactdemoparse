import React from 'react'
import { Container, Form, Button } from 'react-bootstrap'

export default function CollectionForm(props) {
  const setCollection = props.setCollection
  return (
    <Container>
      <Form>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Collection Name:</Form.Label>
          <Form.Control type="text" placeholder="Enter text" />
          <Form.Text className="text-muted">
            E.g. Scrim vs Rare 2-14
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Team 1:</Form.Label>
          <Form.Control type="text" placeholder="BLU" />
          <Form.Text className="text-muted">
            Your team name
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Team 2:</Form.Label>
          <Form.Control type="text" placeholder="Enter text" />
          <Form.Text className="text-muted">
            Enemy team name
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  )
}
