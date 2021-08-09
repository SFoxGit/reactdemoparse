import axios from 'axios';
import React, { useRef } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

export default function CollectionForm(props) {
  const setCollection = props.setCollection
  const userId = props.userId
  const collectionName = useRef();
  const team1 = useRef();
  const team2 = useRef();

  const addNewCollection = async (event) => {
    event.preventDefault();
    const colName = collectionName.current.value;
    const teamOne = team1.current.value;
    const teamTwo = team2.current.value;
    if (colName && teamOne && teamTwo) {
      await axios.post('/api/collection', { userId, colName, teamOne, teamTwo })
        .then(res => {
          setCollection(res.data)
        })
        .catch(err => console.log(err))
    }
  }
  return (
    <Container>
      <Form>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Collection Name:</Form.Label>
          <Form.Control ref={collectionName} type="text" placeholder="Enter text" />
          <Form.Text className="text-muted">
            E.g. Scrim vs Rare 2-14
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Team 1:</Form.Label>
          <Form.Control ref={team1} type="text" placeholder="BLU" />
          <Form.Text className="text-muted">
            Your team name
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Team 2:</Form.Label>
          <Form.Control ref={team2} type="text" placeholder="Enter text" />
          <Form.Text className="text-muted">
            Enemy team name
          </Form.Text>
        </Form.Group>
        <Button onClick={addNewCollection} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  )
}
