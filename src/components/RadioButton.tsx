interface RadioButtonProps {
  label: string
  id: string
  defaultValue: string
}

export default function RadioButton({ label, id, defaultValue }: RadioButtonProps) {
  return (
    <div className="flex gap-x-2.5">
      <input id={id} name="budget" defaultValue={defaultValue} type="radio" className="mt-1 h-4 w-4 border-gray-300 text-gray-300 shadow-sm focus:ring-gray-500" />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}
