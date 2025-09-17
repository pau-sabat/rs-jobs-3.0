// Tipos globales para la aplicación

export interface Job {
  id: string
  title: string
  company: string
  location: string
  salary?: string
  type: string
  description: string
  requirements: string[]
  benefits: string[]
  publishedAt: string
  category: string
  url: string
  conditions: string[]
}

export interface Offer {
  company: Company
  job: Job
}

export interface Company {
  id: string
  name: string
  logo: string
  description: string
  website: string
  location: string
  size: string
  industry: string
  featured?: boolean
}

export interface Category {
  id: string
  name: string
  icon: string
  count: number
}

export interface City {
  id: string
  name: string
  image: string
  count: number
}

export interface Filter {
  id: string
  name: string
  type: 'checkbox' | 'radio' | 'range'
  options?: Array<{
    value: string
    label: string
    count?: number
  }>
  min?: number
  max?: number
}

// Tipos para formularios
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

// Tipos para componentes
export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export interface SearchProps {
  placeholder?: string
  value?: string
  onSearch: (query: string) => void
}
