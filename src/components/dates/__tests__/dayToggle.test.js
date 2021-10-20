import { DayToggle } from '../dayToggle.js'
import React from 'react'
import { render } from 'testUtils'
import '@testing-library/jest-dom'

describe('dayToggle', () => {
  it('renders', async () => {
    render(<DayToggle dayText='Day 1' />)
  })
})
