import { Fields } from 'formidable'

export function firstValues(fields: Fields) {
  return Object.fromEntries(
    Object.entries(fields).map(([key, value]) => {
      return [key, Array.isArray(value) ? value[0] : undefined]
    }),
  )
}
