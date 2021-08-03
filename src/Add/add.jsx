import React, { useRef } from 'react'
import { Container, Form, InputGroup, Button } from 'react-bootstrap'
import { readString } from 'react-papaparse';

export default function Add(props) {
  const setMatchData = props.setMatchData;
  const myForm = useRef();
  const csvFile = useRef();

  function csvToArray(str, delimiter = ",") {

    // slice from start of text to the first \n index
    // use split to create an array from string by delimiter
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    // Map the rows
    // split values from each row into an array
    // use headers.reduce to create an object
    // object properties derived from headers:values
    // the object passed as an element of the array
    const arr = rows.map(function (row) {
      const values = row.split(delimiter);
      const el = headers.reduce(function (object, header, index) {
        object[header] = values[index];
        return object;
      }, {});
      return el;
    });

    // return the array
    return arr;
  }

  const submit = (e) => {
    e.preventDefault();
    // const input = csvFile.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const text = csvFile.current;
      const data = csvToArray(text);
      console.log(JSON.stringify(data));
      setMatchData(JSON.stringify(data));
    };

    // reader.readAsText(input);
  };

  const handleOnDrop = (data) => {
    console.log(data)
  }

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
  };

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

