import { Alert, Box, Fab, Skeleton, styled, Typography } from '@mui/material'
import { useOnInit } from '../../../hooks/fetchHook'
import { useState } from 'react'
import { BookDto } from '../../../components/common/types/bookDto'
import { bookService } from '../../../services/bookService'
import CardBook from '../../common/card_books/CardBook'
import SearchBar from '../../common/search_bar/SearchBar'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined'
import { useNavigate } from 'react-router-dom'

export const Books = () => {
  const [bookList, setBookList] = useState<BookDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()

  const CardContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '1rem',
    padding: '1rem',
    paddingBottom: '5rem',
  })

  const fetchBooks = async () => {
    setIsLoading(true)
    setIsError(false)

    try {
      const books = await bookService.getAllBooks()
      setBookList(books)
    } catch (error) {
      console.error('Error fetching books', error)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useOnInit(() => {
    fetchBooks()
  })

  const handleSearchResult = (result: BookDto[]) => {
    setBookList(result)
  }

  const handleClick = () => {
    navigate(`/books/${null}`)
  }

  return (
    <>
      <SearchBar onBookSearchResult={handleSearchResult} searchType="book" />
      <CardContainer>
        {isLoading ? (
          <>
            <Skeleton variant="rounded" width={'80vw'} height={'350px'} />
            <Skeleton variant="rounded" width={'80vw'} height={'350px'} />
            <Skeleton variant="rounded" width={'80vw'} height={'350px'} />
          </>
        ) : isError ? (
          <Alert severity="error">
            Error fetching books. Please try again later.
          </Alert>
        ) : bookList.length > 0 ? (
          bookList.map((book: BookDto, index: number) => (
            <CardBook key={index} {...book} onDelete={fetchBooks} />
          ))
        ) : (
          <Typography>No books found.</Typography>
        )}
        <Fab
          variant="circular"
          color="primary"
          size="large"
          sx={{
            position: 'fixed',
            bottom: '4.3rem',
            right: '0.5rem',
          }}
        >
          <AddCircleOutlinedIcon onClick={handleClick} />
        </Fab>
      </CardContainer>
    </>
  )
}
