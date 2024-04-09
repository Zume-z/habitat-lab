import InputField from './InputField'
import RadioButton from './RadioButton'

export default function Form() {
  const radioButtonItems = [
    { label: 'Less than $25K', id: 'budget-under-25k', defaultValue: 'under_25k' },
    { label: '$25K – $50K', id: 'budget-25k-50k', defaultValue: '25k-50k' },
    { label: '$50K – $100K', id: 'budget-50k-100k', defaultValue: '50k-100k' },
    { label: '$100K+', id: 'budget-over-100k', defaultValue: 'over_100k' },
  ]

  const inputFieldItems = [
    { label: 'First name', id: 'first-name', type: 'text', autoComplete: 'given-name', placeholder: '' },
    { label: 'Last name', id: 'last-name', type: 'text', autoComplete: 'family-name', placeholder: '' },
    { label: 'Email', id: 'email', type: 'email', autoComplete: 'email', placeholder: '', style: 'sm:col-span-2' },
    { label: 'Project Time Frame', id: 'timeFrame', type: 'text', autoComplete: 'organization', placeholder: '', style: 'sm:col-span-2' },
    { label: 'Phone', id: 'phone', type: 'tel', autoComplete: 'tel', placeholder: '', style: 'sm:col-span-2', isOptional: true },
    { label: 'How can we help you?', id: 'message', type: 'text', autoComplete: 'organization', placeholder: '', style: 'sm:col-span-2', textArea: true },
  ]

  return (
    <div className="relative md:pl-52">
      <div className="relative">
        <div className=" lg:absolute lg:inset-0 lg:left-1/2">
          <img className="h-64 w-full bg-gray-50 object-cover sm:h-80 lg:absolute lg:h-full" src="/assets/contact.jpeg" alt="contact" />
        </div>

        <div className="bg-black pb-24 pt-16 sm:pb-32 sm:pt-24 lg:mx-auto lg:grid lg:grid-cols-2 lg:pt-32">
          <div className="mx-auto px-6 lg:mx-0 xl:px-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-100">Let's work together</h2>
            <p className="mt-2 text-lg leading-8 text-gray-400">Please get in touch as below or via our project enquiry form. We look forward to hearing from you.</p>
            <form action="#" method="POST" className="mt-16 ">
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
