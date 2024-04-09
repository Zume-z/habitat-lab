export interface Employee {
  id: string
  name: string
  description: string
  thumbnail: string
}

export interface Label {
  title: string
  value: string
}

export interface Project {
  id: string
  label: string
  scope: string
  date: string
  thumbnail: string
  location: string
  description: string
}
