import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import CollectionForm from './collection.form'
import { useHistory } from "react-router";

export default function Collection(props) {
  const history = useHistory();
  const userId = props.userId
  const collection = props.collection
  const setCollection = props.setCollection
  const [showForm, setShowForm] = useState(false)
  return (
    <Container>
      <Row>
        <Button onClick={() => setShowForm(!showForm)}>Add New</Button>
      </Row>
      {showForm ? <CollectionForm setCollection={setCollection} userId={userId} /> : null}
      {collection.length ? collection.map(element => (
        <Row key={element.name}>
          <Col>{element.name}</Col>
          <Col><Button>View Stats</Button></Col>
          <Col><Button onClick={() => history.push(`/add/${element.id}`)}>Add Match</Button></Col>
        </Row>)) : null}
    </Container>
  )
}
