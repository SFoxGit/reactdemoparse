import React from 'react'
import { Table } from 'react-bootstrap'

export default function Summary(props) {
  const summary = props.summary
  const match = props.match
  return (
    <Table striped bordered hover variant="dark" className="sortable">
      <thead>
        <tr>
          <th></th>
          <th>Blue</th>
          <th>Red</th>
        </tr>
      </thead>
      <tbody>
        {summary.length ? summary.map(data => {
          if (data.match === match) {
            return (
              <tr key={data.title}>
                <td>{data.title}</td>
                <td>{data.blue}</td>
                <td>{data.red}</td>
              </tr>
            )
          } else {
            return (null)
          }
        }
        )
          :
          null
        }
      </tbody>
    </Table>
  )
}
