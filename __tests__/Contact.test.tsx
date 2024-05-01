import React from 'react'
import '@testing-library/jest-dom'
import Contact from '@/pages/contact/index'
import RenderCounter from './utils/renderCounter'
import { RenderResult, act, render, screen } from '@testing-library/react'

jest.mock('next/router', () => ({
  useRouter: () => ({
    route: '/contact',
    pathname: '/contact',
    asPath: '/contact',
    push: jest.fn(),
    replace: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
  }),
}))

describe('Contact Page', () => {
  it('header should render', () => {
    render(<Contact />)
    expect(screen.getByText('Contact', { selector: 'h1' })).toBeInTheDocument()
  })

  it('nav should render', () => {
    const { getByText } = render(<Contact />)
    expect(getByText('About', { selector: 'a' })).toBeInTheDocument()
    expect(getByText('Projects', { selector: 'a' })).toBeInTheDocument()
    expect(getByText('Contact', { selector: 'a' })).toBeInTheDocument()
    expect(getByText('Gallery', { selector: 'a' })).toBeInTheDocument()
  })

  it('should respond to window resize events', () => {
    const { getByText } = render(<Contact />)
    act(() => {
      global.innerWidth = 500
      global.dispatchEvent(new Event('resize'))
    })

    expect(getByText('Contact', { selector: 'h1' })).toBeInTheDocument() // Still visible
    expect(getByText('Open main menu')).toBeInTheDocument()
  })

  it('should not re-render more than necessary', () => {
    let container: RenderResult | undefined
    act(() => {
      container = render(
        <RenderCounter>
          <Contact />
        </RenderCounter>,
      )
    })
    expect(container?.getByText(/^RENDER_COUNT_/).textContent).toBe('RENDER_COUNT_1')
  })
})
