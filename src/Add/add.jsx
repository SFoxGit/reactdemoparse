import React, { useRef } from 'react'
import { Container, Form, InputGroup, Button } from 'react-bootstrap'
import { readString } from 'react-papaparse';

export default function Add(props) {
  const setMatchData = props.setMatchData;
  const myForm = useRef();
  const csvFile = useRef();

 

  return (
    <Container>
      {/* <Form ref={myForm}>
        <input type="file" ref={csvFile} accept=".csv" />
        <Button onClick={(e) => submit(e)} type="submit" value="Submit" />
      </Form> */}

    <div className="App">
      <input
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={(e) => {
          const files = e.target.files;
          console.log(files);
          if (files) {
            console.log(files[0]);
            readString(files[0], {
              complete: function(results) {
               setMatchData(results.data);
              }}
            )
          }
        }}
      />
    </div>
  

    </Container>
  )
}

