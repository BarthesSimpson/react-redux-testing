import { Simulate } from 'react-testing-library'

export const changeInputValue = (input, value) => {
  input.value = value
  Simulate.change(input)
}
