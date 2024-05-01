import React from 'react'
import '@testing-library/jest-dom'
import Project from '@/pages/[projectId]/index'
import RenderCounter from './utils/renderCounter'
import { RenderResult, act, render, screen } from '@testing-library/react'

jest.mock('next/router', () => ({
  useRouter: () => ({
    route: '/project',
    pathname: '/project/1',
    asPath: '/project/1',
    query: { projectId: '1' },
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
    '1': { id: '1', label: 'Project 1', scope: 'scope 1', date: 'date 1', thumbnail: '/', location: 'location', description: 'description 1' },
  },
}))

describe('Project Page', () => {
  it('header should render', () => {
    render(<Project imgPaths={['1']} />)
    expect(screen.getByText('Project 1', { selector: 'h1' })).toBeInTheDocument()
  })

  it('nav should render', () => {
    const { getByText } = render(<Project imgPaths={['1']} />)
    expect(getByText('About', { selector: 'a' })).toBeInTheDocument()
    expect(getByText('Projects', { selector: 'a' })).toBeInTheDocument()
    expect(getByText('Contact', { selector: 'a' })).toBeInTheDocument()
    expect(getByText('Gallery', { selector: 'a' })).toBeInTheDocument()
  })

  it('should pass correct ref to useIntersectionObserver', () => {
    const useRefSpy = jest.spyOn(React, 'useRef')
    render(<Project imgPaths={['1']} />)
    expect(useRefSpy).toHaveBeenCalledWith(expect.anything())
  })

  it('should respond to window resize events', () => {
    const { getByText } = render(<Project imgPaths={['1']} />)

    act(() => {
      global.innerWidth = 500
      global.dispatchEvent(new Event('resize'))
    })

    expect(getByText('Project 1', { selector: 'h1' })).toBeInTheDocument()
    expect(getByText('Open main menu')).toBeInTheDocument()
  })

  it('should not re-render more than necessary', () => {
    let container: RenderResult | undefined
    act(() => {
      container = render(
        <RenderCounter>
          <Project imgPaths={['1']} />
        </RenderCounter>,
      )
    })
    expect(container?.getByText(/^RENDER_COUNT_/).textContent).toBe('RENDER_COUNT_1')
  })
})
