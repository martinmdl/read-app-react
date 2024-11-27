
export interface BookDto {
    id: number | null
    authorID: number | null
    bookTitle: string
    authorName: string
    pagesCount: number
    wordsCount: number
    numberEditions: number
    nativeLanguage: string
    languages: string[]
    weekSales: number
    complexLecture: boolean
    bestSeller: boolean
}