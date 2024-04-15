import { useRouter } from 'next/router'
import data from '@/utils/data/en.json'
import Header from '@/components/Header'
import Layout from '@/components/Layout'
import ImageBg from '@/components/ImageBg'
import React, { createRef, useRef, useState } from 'react'
import ImageSlider from '@/components/ImageSlider'
import type { Label, Project } from '@/utils/types'
import ProjectLabel from '@/components/ProjectLabel'
import ScrollButton from '@/components/ScrollButton'
import { useIntersectionObserver } from '@/utils/hooks'
import { getImageDirPath, getImagePaths } from '@/utils/getImagePaths'

export async function getServerSideProps(context: { query: { projectId: string } }) {
  const projectId = context.query.projectId as string
  const imgDirPath = await getImageDirPath(projectId)
  const imgPaths = await getImagePaths(imgDirPath)
  return { props: { imgPaths } }
}

export default function ProjectId({ imgPaths }: { imgPaths: string[] }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const projectId = router.query.projectId as string
  const project = (data.projects as { [key: string]: Project })[projectId] as Project

  const labelItems: Label[] = [
    { title: 'SCOPE', value: project.scope },
    { title: 'LOCATION', value: project.location },
    { title: 'DATE', value: project.date },
  ]

  const refs = useRef(
    imgPaths.reduce((acc: { [key: string]: React.RefObject<unknown> }, img) => {
      acc[img] = createRef()
      return acc
    }, {}),
  )

  const visibility = useIntersectionObserver(refs, imgPaths, { threshold: 0.5 })

  return (
    <Layout title={project?.label || projectId} loading={loading}>
      <ImageBg src={`/assets/projects/${projectId}/thumbnail.png`} setLoading={setLoading} />
      <div className="h-screen w-full">
        <Header title={project?.label || projectId} textCol="text-white" top={true} />
      </div>

      <ProjectLabel labelItems={labelItems} style={'flex'} />

      <div className="flex w-full justify-center md:pb-10 ">
        <p className="whitespace-pre-wrap border-l border-gray-500 p-8 py-20 text-lg leading-9 text-gray-800 md:w-1/2">{project?.description}</p>
      </div>

      <ImageSlider imgPaths={imgPaths} imgPathPrefix={`/assets/projects/${projectId}`} refs={refs} visibility={visibility} />
      <ScrollButton label="Return to top" clickHandler={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style="flex" />
    </Layout>
  )
}
