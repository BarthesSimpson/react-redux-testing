import React from 'react'

const Button = ({ onClick, text = 'Click Me', testId }) => (
  <button data-testid={testId} onClick={onClick}>
    {text}
  </button>
)

export default Button
