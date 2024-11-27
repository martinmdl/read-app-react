import { useNavigate, useParams } from 'react-router-dom'
import { useOnInit } from '../../../../hooks/fetchHook'
import { useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Divider,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { bookService } from '../../../../services/bookService'
import styled from '@emotion/styled'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BookDto } from '../../../common/types/bookDto'
import { SnackMessage } from '../../../common/snackMessages/SnackMessage'
import { AuthorDTO } from '../../../common/types/authorDto'
import { authorService } from '../../../../services/authorService'
import { gray } from '../../../common/theme/themePrimitives'

const languageOptions = [
  { code: 'en_US', label: 'INGLES' },
  { code: 'es_ES', label: 'ESPAÑOL' },
  { code: 'de_DE', label: 'ALEMAN' },
  { code: 'it_IT', label: 'ITALIANO' },
  { code: 'pt_PT', label: 'PORTUGUES' },
  { code: 'zh_CN', label: 'MANDARIN' },
  { code: 'ar_AE', label: 'ARABE' },
  { code: 'ru_RU', label: 'RUSO' },
  { code: 'hi_IN', label: 'HINDI' },
  { code: 'fr_FR', label: 'FRANCES' },
  { code: 'bn_BD', label: 'BENGALI' },
  { code: 'ja_JP', label: 'JAPONES' },
]

const BookEditContainer = styled(Container)({
  paddingTop: '1rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  flexDirection: 'column',
})

const BookEditBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  gap: '1rem',
})

const SelectLabel = styled(InputLabel)({
  color: gray[100],
  fontSize: '0.775rem',
  lineHeight: '1.4375em',
  fontFamily: 'Roboto, sans-serif',
  fontWeight: 400,
  padding: '0 0 0 0.875rem',
  margin: '0',
  whiteSpace: 'nowrap',
})
export const BookEdit = () => {
  const { id } = useParams<{ id: string | undefined }>()
  const [data, setData] = useState<BookDto>({
    id: id ? Number(id) : null,
    authorID: Number(id) || null,
    bookTitle: '',
    authorName: '',
    pagesCount: 0,
    wordsCount: 0,
    numberEditions: 0,
    nativeLanguage: '',
    languages: [''],
    weekSales: 0,
    complexLecture: false,
    bestSeller: false,
  })
  const [authorData, setAuthorData] = useState<AuthorDTO[]>([])
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    reset,
  } = useForm<BookDto>({
    defaultValues: data,
  })

  const navigate = useNavigate()

  const fetchingBook = async () => {
    if (id !== 'null') {
      try {
        const book = await bookService.getBookById(Number(id))
        setData(book)
        reset(book)
      } catch (error) {
        console.error(error)
      }
    }
    const authors = await authorService.getAllAuthors()
    if (authors.length > 0) {
      setAuthorData(authors)
    }
  }

  useOnInit(() => {
    fetchingBook()
  })

  const handleCancel = () => {
    navigate(-1)
  }

  const getAuthorID = (): number => {
    const author = authorData.find(
      (author) => author.fullName === data.authorName,
    )
    return author ? author.id : 0
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  const handleDisabledButton = () => {
    setIsSubmitting(!isSubmitting)
  }

  const onSubmit: SubmitHandler<BookDto> = async (data) => {
    handleDisabledButton()

    if (!data.authorName) {
      setError('authorName', { type: 'manual', message: 'Author is required' })
      return
    }
    if (!data.nativeLanguage) {
      setError('nativeLanguage', {
        type: 'manual',
        message: 'Native language is required',
      })
      return
    }

    try {
      if (Number.isNaN(data.id)) {
        await bookService.createBook(data, getAuthorID())
        setSnackbarMessage('Created book successfully')
      } else {
        await bookService.updateBook(Number(id), data, getAuthorID())
        setSnackbarMessage('Updated book successfully')
      }
      setOpenSnackbar(true)
      setTimeout(() => {
        navigate(-1)
        handleDisabledButton()
      }, 2000)
    } catch (error) {
      console.error(error)
      setIsSubmitting(false)
    }
  }

  return (
    <BookEditContainer>
      <Card
        variant="outlined"
        sx={{ width: '80vw', height: '90dvh', overflowY: 'auto' }}
        component={'form'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Divider variant="middle">
          {id == 'null' ? (
            <Typography variant="h5" component="h1">
              Create
            </Typography>
          ) : (
            <Typography variant="h5" component="h1">
              Edit
            </Typography>
          )}
        </Divider>
        <BookEditBox>
          <TextField
            label="Book Title"
            variant="outlined"
            {...register('bookTitle', {
              required: 'A title is required',
              minLength: {
                value: 2,
                message: 'Title must be at least 2 characters',
              },
              validate: {
                noSpecialCharacters: (value) =>
                  /^[a-zA-Z1-9\s]*$/.test(value) ||
                  'Title must contain only alphabetic charactes',
              },
            })}
            error={!!errors.bookTitle}
            slotProps={{ inputLabel: { shrink: true } }}
          />
          {errors.bookTitle && (
            <Alert severity="error">{errors.bookTitle.message}</Alert>
          )}
          <FormGroup>
            <SelectLabel>Author</SelectLabel>
            <Select
              label="Author"
              variant="outlined"
              value={data.authorName}
              {...register('authorName', {
                required: 'Author is required',
                onChange: (e) => {
                  setData({
                    ...data,
                    authorName: e.target.value,
                  })
                  clearErrors('authorName')
                },
              })}
              error={!!errors.authorName}
              sx={{ color: 'white' }}
            >
              <MenuItem defaultValue={data.authorName} disabled>
                Select an author
              </MenuItem>
              {authorData.map((author) => (
                <MenuItem key={author.id} value={author.fullName}>
                  {author.fullName}
                </MenuItem>
              ))}
            </Select>
            {errors.authorName && (
              <Alert severity="error" sx={{ marginTop: '1rem' }}>
                {errors.authorName.message}
              </Alert>
            )}
          </FormGroup>
          <Divider sx={{ marginBottom: '0.5rem' }} />
          <TextField
            label="Number Editions"
            variant="outlined"
            type="number"
            {...register('numberEditions', {
              required: 'Number of editions is required',
              min: {
                value: 1,
                message: 'Number of editions must be greater than 0',
              },
            })}
            error={!!errors.numberEditions}
            slotProps={{ inputLabel: { shrink: true } }}
          />
          {errors.numberEditions && (
            <Alert severity="error">{errors.numberEditions.message}</Alert>
          )}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1rem',
              justifyContent: 'space-evenly',
            }}
          >
            <TextField
              label="Pages Count"
              variant="outlined"
              type="number"
              {...register('pagesCount', {
                required: 'Pages count is required',
                min: {
                  value: 1,
                  message: 'Pages count must be greater than 0',
                },
              })}
              error={!!errors.pagesCount}
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              label="Words Count"
              variant="outlined"
              type="number"
              {...register('wordsCount', {
                required: 'Words count is required',
                min: {
                  value: 1,
                  message: 'Words count must be greater than 0',
                },
              })}
              error={!!errors.wordsCount}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Box>
          {errors.pagesCount && (
            <Alert severity="error">{errors.pagesCount.message}</Alert>
          )}
          {errors.wordsCount && (
            <Alert severity="error">{errors.wordsCount.message}</Alert>
          )}
          <TextField
            label="Week Sales"
            variant="outlined"
            type="number"
            {...register('weekSales', {
              required: 'Week sales is required',
              min: {
                value: 1,
                message: 'Week sales must be greater than 0',
              },
            })}
            error={!!errors.weekSales}
            slotProps={{ inputLabel: { shrink: true } }}
          />
          {errors.weekSales && (
            <Alert severity="error">{errors.weekSales.message}</Alert>
          )}
          <Divider />
          <Typography>
            Original native language: {data.nativeLanguage}
          </Typography>

          <FormGroup>
            <SelectLabel>Native Language</SelectLabel>
            <Select
              label="Native Language"
              variant="outlined"
              value={data.nativeLanguage}
              {...register('nativeLanguage', {
                required: 'Native language is required',
                onChange: (e) =>
                  setData({
                    ...data,
                    nativeLanguage: e.target.value,
                    languages: [
                      ...data.languages.filter(
                        (lang) => lang !== data.nativeLanguage,
                      ),
                      e.target.value,
                    ],
                  }),
              })}
              error={!!errors.nativeLanguage}
            >
              <MenuItem defaultValue={data.nativeLanguage} disabled>
                Select a language
              </MenuItem>
              {languageOptions.map((option) => (
                <MenuItem key={option.code} value={option.code}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {errors.nativeLanguage && (
              <Alert severity="error" sx={{ marginTop: '1rem' }}>
                {errors.nativeLanguage.message}
              </Alert>
            )}
          </FormGroup>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Typography>Languages</Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0',
              }}
            >
              {languageOptions.map((option) => (
                <Box
                  key={option.code}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <Checkbox
                    value={option.code}
                    {...register('languages')}
                    checked={data.languages.includes(option.code)}
                    onChange={(e) => {
                      setData({
                        ...data,
                        languages: e.target.checked
                          ? [...data.languages, option.code]
                          : data.languages.filter(
                              (lang) => lang !== option.code,
                            ),
                      })
                    }}
                    disabled={option.code === data.nativeLanguage}
                  />
                  <Typography sx={{ fontSize: '0.75em' }}>
                    {option.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
          <Button
            type="button"
            variant="outlined"
            color="warning"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="outlined"
            color="secondary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </BookEditBox>
      </Card>
      <SnackMessage
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        severity="success"
      />
    </BookEditContainer>
  )
}
