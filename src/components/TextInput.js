import React from 'react'

const TextInput = ({ onChange, testId }) => (
  <input data-testid={testId} onChange={onChange} />
)

export default TextInput
