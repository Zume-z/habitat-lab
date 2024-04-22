import Form from '@/components/Form'
import React, { useState } from 'react'
import Header from '@/components/Header'
import Layout from '@/components/Layout'
import Modal from '@/components/Modal'

export default function Contact() {
  const [loading, setLoading] = useState(true)
  const [contactSuccess, setContactSuccess] = useState(false)

  return (
    <Layout title="Contact" loading={loading}>
      <Header title="Contact" />
      <Form setLoading={setLoading} setContactSuccess={setContactSuccess} />
      {contactSuccess && <Modal setContactSuccess={setContactSuccess} />}
    </Layout>
  )
}
