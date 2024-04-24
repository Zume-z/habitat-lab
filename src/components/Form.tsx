import Image from 'next/image'
import InputField from './InputField'
import RadioButton from './RadioButton'
import { FormEvent, useRef } from 'react'

interface FormProps {
  setLoading: (loading: boolean) => void
  setModalData: (data: { display: boolean; text: string }) => void
}

export default function Form({ setLoading, setModalData }: FormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const radioButtonItems = [
    { label: 'Less than $25K', id: 'budget-under-25k', defaultValue: 'under_25k' },
    { label: '$25K – $50K', id: 'budget-25k-50k', defaultValue: '25k-50k' },
    { label: '$50K – $100K', id: 'budget-50k-100k', defaultValue: '50k-100k' },
    { label: '$100K+', id: 'budget-over-100k', defaultValue: 'over_100k' },
  ]

  const inputFieldItems = [
    { label: 'First name', id: 'firstName', type: 'text', autoComplete: 'given-name', placeholder: '', required: true },
    { label: 'Last name', id: 'lastName', type: 'text', autoComplete: 'family-name', placeholder: '', required: true },
    { label: 'Email', id: 'email', type: 'email', autoComplete: 'email', placeholder: '', style: 'sm:col-span-2', required: true },
    { label: 'Project Time Frame', id: 'timeFrame', type: 'text', autoComplete: 'organization', placeholder: '', style: 'sm:col-span-2', required: false },
    { label: 'Phone', id: 'phone', type: 'tel', autoComplete: 'tel', placeholder: '', style: 'sm:col-span-2', isOptional: true, required: false },
    { label: 'How can we help you?', id: 'message', type: 'text', autoComplete: 'organization', placeholder: '', style: 'sm:col-span-2', textArea: true, required: true },
  ]

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const res = await fetch('/api/contact', {
      method: 'POST',
      body: formData,
    })

    if (!res.ok) {
      if (res.status === 400) setModalData({ display: true, text: 'Please fill in all required fields.' })
      else setModalData({ display: true, text: 'An error occurred, please try again later or email us directly at team@habitatlab.com.au' })
    } else {
      setModalData({ display: true, text: 'Thank you, we will be in contact soon.' })
      formRef.current?.reset()
    }
  }

  return (
    <div className="md:pl-52">
      <div className="relative">
        <div className="relative lg:absolute lg:inset-0 lg:left-1/2">
          <div className="relative h-64 sm:h-80 lg:h-full">
            <Image
              src="/assets/contact.jpeg"
              fill={true}
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="contact"
              onLoadingComplete={() => setLoading(false)}
            />
          </div>
        </div>
        <div className="bg-black pb-24 pt-16 sm:pb-32 sm:pt-24 lg:mx-auto lg:grid lg:grid-cols-2 lg:pt-32">
          <div className="mx-auto px-6 lg:mx-0 xl:px-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-100">Let's work together</h2>
            <p className="mt-2 text-lg leading-8 text-gray-400">Please get in touch as below or via our project enquiry form. We look forward to hearing from you.</p>
            <form ref={formRef} onSubmit={onSubmit} action="#" method="POST" className="mt-16 ">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                {inputFieldItems.map((item) => (
                  <InputField key={item.id} {...item} />
                ))}
                <fieldset className="sm:col-span-2">
                  <legend className="block text-sm font-semibold leading-6 text-gray-100">Expected budget</legend>
                  <div className="mt-4 space-y-4 text-sm leading-6 text-gray-300">
                    {radioButtonItems.map((item) => (
                      <RadioButton key={item.id} {...item} />
                    ))}
                  </div>
                </fieldset>
              </div>
              <div className="mt-10 flex justify-end border-t border-white/50 pt-8">
                <button type="submit" className="transition-200 border border-gray-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white hover:bg-gray-100 hover:text-gray-900 ">
                  Send message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
