import Form from '@/components/Form'
import React, { useState } from 'react'
import Header from '@/components/Header'
import Layout from '@/components/Layout'

export default function Contact() {
  const [loading, setLoading] = useState(true)

  return (
    <Layout title="Contact" loading={loading}>
      <Header title="Contact" />
      <Form setLoading={setLoading} />
    </Layout>
  )
}
