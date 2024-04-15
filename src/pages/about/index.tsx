import React, { useState } from 'react'
import data from '@/utils/data/en.json'
import Header from '@/components/Header'
import Layout from '@/components/Layout'
import ImageBg from '@/components/ImageBg'
import { Employee, Label } from '@/utils/types'
import PojectLabel from '@/components/ProjectLabel'

export default function About() {
  const [loading, setLoading] = useState(true)
  const employees: Employee[] = Object.values(data.about.employees)

  const labelItems: Label[] = [
    { title: 'ORGANISATION', value: 'Habitat Lab' },
    { title: 'LOCATION', value: 'Newcastle' },
    { title: 'FOUNDED', value: '2021' },
  ]

  return (
    <Layout title="Habitat Lab" loading={loading}>
      <ImageBg src={'/assets/about.jpeg'} style="md:block hidden " setLoading={setLoading} />
      <div className="w-full md:h-screen">
        <Header title="Habitat Lab" textCol="text-white" />
      </div>

      <PojectLabel labelItems={labelItems} style={'md:flex hidden'} />

      <div className="px-10 pt-28 md:pl-52 md:pt-5">
        <p className="w-full whitespace-pre-wrap pb-10 text-lg leading-9 text-gray-800 ">{data.about.baseInfo}</p>
        <div className="w-full space-y-10 py-10 md:pb-52  ">
          {employees.map((item) => (
            <div key={item.id} id={item.id} className="w-full px-2 md:flex">
              <div className="relative mb-4 w-full justify-center  xl:w-1/3">
                <img className="h-auto w-full object-contain" src={item.thumbnail} alt={`Profile of ${item.name}`} />
              </div>
              <p className="whitespace-wrap w-full text-lg leading-9 text-gray-800 md:pl-5">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
