import Link from 'next/link'
import Image from 'next/image'
import { Project } from '@/utils/types'
import { proximaSB } from '@/utils/fonts'
import { MutableRefObject, RefObject } from 'react'

interface ProjectCardProps {
  project: Project
  visibility: { [key: string]: boolean }
  refs: MutableRefObject<{ [key: string]: RefObject<unknown> }>
}

export default function ProjectCard({ project, visibility, refs }: ProjectCardProps) {
  return (
    <Link
      id={project.id}
      ref={refs.current[project.id] as RefObject<HTMLAnchorElement>}
      href={project.id}
      key={project.id}
      className={`card-class group transition-opacity duration-700 ease-in ${proximaSB.className} md:w-1/2 lg:w-1/3  
              ${visibility[project.id as keyof typeof visibility] ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
        <Image
          className="transition-500 h-full w-full transform-gpu group-hover:scale-105 group-hover:opacity-80"
          src={`/assets/projects/${project.id}/thumbnail.png`}
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={project.label}
        />
      </div>
      <div>
        <div className="card-label absolute -translate-x-5 -translate-y-3.5 text-3xl">{project.label}</div>
      </div>
      <div className="flex space-x-10 pb-3 pt-7 font-mono ">
        {[project.scope, project.location, project.date].map((text, index) => (
          <div key={index}>
            <div className="text-[11px] text-gray-500">{['SCOPE', 'LOCATION', 'DATE'][index]}</div>
            <div className="pt-1 text-[13px] text-sm">{text}</div>
          </div>
        ))}
      </div>
    </Link>
  )
}
