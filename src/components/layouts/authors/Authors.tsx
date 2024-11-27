import Box from '@mui/material/Box/Box'
import SearchBar from '../../common/search_bar/SearchBar'
import CardAuthor from '../../common/card_authors/CardAuthor'
import styled from '@emotion/styled'
import { useOnInit } from '../../../hooks/fetchHook'
import { useState } from 'react'
import { authorService } from '../../../services/authorService'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined'

import { Alert, Fab, Skeleton, Typography } from '@mui/material'
import { AuthorDTO } from '../../common/types/authorDto'
import { useNavigate } from 'react-router-dom'

export const Authors = () => {
  const [authorsList, setAuthorsList] = useState<
    { id: number; fullName: string; nativeLanguage: string }[]
  >([])
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

  const fetchAuthors = async () => {
    setIsLoading(true)
    setIsError(false)
    try {
      const authors = await authorService.getAllAuthors()
      setAuthorsList(authors)
    } catch {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useOnInit(() => {
    fetchAuthors()
  })

  const handleSearchResult = (result: AuthorDTO[]) => {
    setAuthorsList(result)
  }

  const handleClick = () => {
    navigate(`/author/${null}`)
  }

  return (
    <>
      <SearchBar
        onAuthorSearchResult={handleSearchResult}
        searchType="author"
      />
      <CardContainer>
        {isLoading ? (
          <>
            <Skeleton variant="rounded" width={'80vw'} height={'110px'} />
            <Skeleton variant="rounded" width={'80vw'} height={'110px'} />
            <Skeleton variant="rounded" width={'80vw'} height={'110px'} />
            <Skeleton variant="rounded" width={'80vw'} height={'110px'} />
            <Skeleton variant="rounded" width={'80vw'} height={'110px'} />
          </>
        ) : isError ? (
          <Alert severity="error">
            Error fetching books. Please try again later.
          </Alert>
        ) : authorsList.length > 0 ? (
          authorsList.map((author, index) => (
            <CardAuthor key={index} {...author} onDelete={fetchAuthors} />
          ))
        ) : (
          <Typography>No authors found</Typography>
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
