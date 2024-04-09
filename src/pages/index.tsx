import Nav from '@/components/Nav'
import { Project } from '@/utils/types'
import data from '@/utils/data/en.json'
import Header from '@/components/Header'
import Layout from '@/components/Layout'
import ProjectCard from '@/components/ProjectCard'
import { createRef, useRef, RefObject } from 'react'
import { useIntersectionObserver } from '@/utils/hooks'

export default function Home() {
  const projects: Project[] = Object.values(data.projects)

  const refs = useRef(
    projects.reduce((acc: { [key: string]: RefObject<unknown> }, project) => {
      acc[project.id] = createRef()
      return acc
    }, {}),
  )

  const visibility = useIntersectionObserver(
    refs,
    projects.map((project) => project.id),
    { threshold: 0.1 },
  )

  return (
    <Layout>
      <Nav title="Projects" />
      <Header title="Projects" />
      <div className="flex w-full flex-wrap pt-32 md:pl-36 md:pt-56">
        {projects.map((project) => (
          <ProjectCard project={project} visibility={visibility} refs={refs} key={project.id} />
        ))}
      </div>
    </Layout>
  )
}
