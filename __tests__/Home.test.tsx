import React from 'react'
import Home from '@/pages/index'
import '@testing-library/jest-dom'
import RenderCounter from './utils/renderCounter'
import { RenderResult, act, render, screen } from '@testing-library/react'

jest.mock('next/router', () => ({
  useRouter: () => ({
    route: '/',
    pathname: '/',
    asPath: '/',
    push: jest.fn(),
    replace: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
  }),
}))

jest.mock('../src/utils/data/en.json', () => ({
  projects: {
    '1': { id: '1', label: 'Project 1', scope: 'scope 1', description: 'description 1' },
    '2': { id: '2', label: 'Project 2', scope: 'scope 2', description: 'description 2' },
  },
}))

describe('Home Page', () => {
  it('header should render', () => {
    render(<Home />)
    expect(screen.getByText('Projects', { selector: 'h1' })).toBeInTheDocument()
  })

  it('nav should render', () => {
    render(<Home />)
    expect(screen.getByText('About', { selector: 'a' })).toBeInTheDocument()
    expect(screen.getByText('Projects', { selector: 'a' })).toBeInTheDocument()
    expect(screen.getByText('Contact', { selector: 'a' })).toBeInTheDocument()
    expect(screen.getByText('Gallery', { selector: 'a' })).toBeInTheDocument()
  })

  it('should display project cards for each project', () => {
    const { queryByText } = render(<Home />)
    expect(queryByText('Project 1')).toBeInTheDocument()
    expect(queryByText('Project 2')).toBeInTheDocument()
    expect(queryByText('scope 1')).toBeInTheDocument()
    expect(queryByText('scope 2')).toBeInTheDocument()
  })

  it('should pass correct ref to useIntersectionObserver', () => {
    const useRefSpy = jest.spyOn(React, 'useRef')
    render(<Home />)
    expect(useRefSpy).toHaveBeenCalledWith(expect.anything())
  })

  it('should respond to window resize events', () => {
    const { getByText } = render(<Home />)

    act(() => {
      global.innerWidth = 500
      global.dispatchEvent(new Event('resize'))
    })

    expect(getByText('Projects', { selector: 'h1' })).toBeInTheDocument() // Still visible
    expect(getByText('Open main menu')).toBeInTheDocument()
  })

  it('should not re-render more than necessary', () => {
    let container: RenderResult | undefined
    act(() => {
      container = render(
        <RenderCounter>
          <Home />
        </RenderCounter>,
      )
    })
    expect(container?.getByText(/^RENDER_COUNT_/).textContent).toBe('RENDER_COUNT_1')
  })
})
