import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import { ChangeEvent, useState } from 'react'
import { SearchService } from '../../../services/searchService'
import { AuthorDTO } from '../types/authorDto'
import { brand } from '../theme/themePrimitives'
import { BookDto } from '../types/bookDto'
import { shakeAnimation } from '../theme/customizations/animations'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    color: theme.palette.mode === 'dark' ? brand[100] : brand[900],
    width: '80vw',
    border:
      theme.palette.mode === 'dark'
        ? '1px solid hsla(220, 20%, 25%, 0.6)'
        : `1px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.shape.borderRadius,
  },
}))

interface SearchBarProps {
  onAuthorSearchResult?: (authors: AuthorDTO[]) => void
  onBookSearchResult?: (books: BookDto[]) => void
  searchType: 'author' | 'book'
}

export default function SearchBar({
  onAuthorSearchResult,
  onBookSearchResult,
  searchType,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false)

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value
    let response
    if (searchType === 'author') {
      response = await SearchService.searchAuthor(searchValue)
      onAuthorSearchResult?.(response)
    } else if (searchType === 'book') {
      response = await SearchService.searchBook(searchValue)
      onBookSearchResult?.(response)
    }
  }

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'dark'
                      ? theme.palette.common.white
                      : 'hsla(220, 20%, 25%, 0.6)',
                  animation: isFocused
                    ? `${shakeAnimation} 0.5s linear`
                    : 'none',
                }}
              />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearch}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
