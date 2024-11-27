export interface AuthorDTO {
  id: number
  fullName: string
  nativeLanguage: string
}

export interface editAuthorDTO {
  id: number | null
  name: string
  lastName: string
  nativeLanguage: string
}
