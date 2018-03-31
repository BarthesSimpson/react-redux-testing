import React from 'react'

const Jumbotron = ({ message, testId }) => (
  <h5 data-testid={testId}>{message}</h5>
)

export default Jumbotron
