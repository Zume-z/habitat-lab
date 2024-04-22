interface InputFieldProps {
  label: string
  id: string
  type: string
  autoComplete: string
  placeholder: string
  required: boolean
  style?: string
  isOptional?: boolean
  textArea?: boolean
}

export default function InputField({ label, id, type, autoComplete, placeholder, required, style, isOptional = false, textArea = false }: InputFieldProps) {
  return (
    <div className={`${style} `}>
      <div className={`${isOptional ? 'flex justify-between' : ''}`}>
        <label htmlFor={id} className="block text-sm font-semibold leading-6 text-gray-100">
          {label}
        </label>
        {isOptional && <span className="text-sm text-gray-400">Optional</span>}
      </div>
      <div className="mt-2.5">
        {textArea ? (
          <textarea
            id="message"
            name="message"
            required={required}
            rows={4}
            aria-describedby="message-description"
            className="block w-full border-0 bg-transparent px-3.5 py-2 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6"
            defaultValue={''}
          />
        ) : (
          <input
            type={type}
            name={id}
            id={id}
            required={required}
            autoComplete={autoComplete}
            placeholder={placeholder}
            className="block w-full border-0 bg-transparent px-3.5 py-2 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6"
          />
        )}
      </div>
    </div>
  )
}
