import React from 'react'
import App from '../App'
import { flushPromises, Simulate, render, wait } from 'react-testing-library'
import 'react-testing-library/extend-expect'
import debug from '../helpers/debug'
import { changeInputValue } from '../helpers/input'

describe('Basic test (surprisingly useful)', () => {
  it('renders without crashing', () => {
    const { container, getByTestId } = render(<App />)
    expect(getByTestId('title').textContent).toBe('Greetings')
  })

  describe('Without Redux tests', () => {
    it('toggles message', () => {
      const { container, getByTestId } = render(<App />)
      expect(getByTestId('jumbotron').textContent).toBe('Lo')
      Simulate.click(getByTestId('button-no-redux'))
      expect(getByTestId('jumbotron').textContent).toBe('Hi')
      Simulate.click(getByTestId('button-no-redux'))
      expect(getByTestId('jumbotron').textContent).toBe('Lo')
    })
    it('enters and displays text correctly', () => {
      const { container, getByTestId } = render(<App />)
      const input = getByTestId('textInput-no-redux')
      changeInputValue(input, 'Woot')
      Simulate.click(getByTestId('button-no-redux'))
      expect(getByTestId('jumbotron').textContent).toBe('Woot')
    })
  })

  describe('With Redux tests', () => {
    it('Adds resources', () => {
      const { container, getByTestId, queryByTestId, unmount } = render(<App />)
      /* add the first resource */
      expect(queryByTestId('resource-1')).not.toBeInTheDOM()
      const input = getByTestId('textInput-with-redux')
      changeInputValue(input, 'Soldat Inconnu')
      Simulate.click(getByTestId('button-with-redux'))
      expect(getByTestId('resource-1').textContent).toBe('Soldat Inconnu')

      /* add the second resource */
      expect(queryByTestId('resource-2')).not.toBeInTheDOM()
      changeInputValue(input, 'Soldat Malentendu')
      Simulate.click(getByTestId('button-with-redux'))
      expect(getByTestId('resource-1').textContent).toBe('Soldat Inconnu')
      expect(getByTestId('resource-2').textContent).toBe('Soldat Malentendu')
    })
    it('Shows correct notification when adding a resource', async () => {
      const { container, getByTestId, queryByTestId } = render(<App />)
      /* wait for previous notification to expire */
      await wait(() => expect(queryByTestId('notification')).not.toBeInTheDOM())
      /* add the resource */
      const input = getByTestId('textInput-with-redux')
      changeInputValue(input, 'Soldat Inconnu')
      Simulate.click(getByTestId('button-with-redux'))
      await wait(() => getByTestId('notification'))
      expect(getByTestId('notification').textContent).toBe(
        'Successfully added new resource Soldat Inconnu'
      )
    })
    it('deletes a resource', () => {
      //TODO
    })
  })
})
