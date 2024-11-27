import { useNavigate, useParams } from 'react-router-dom'
import { useOnInit } from '../../../../hooks/fetchHook'
import { useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Divider,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { authorService } from '../../../../services/authorService'
import styled from '@emotion/styled'
import { SubmitHandler, useForm } from 'react-hook-form'
import { editAuthorDTO } from '../../../common/types/authorDto'
import { SnackMessage } from '../../../common/snackMessages/SnackMessage'
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

const AuthorEditContainer = styled(Container)({
  paddingTop: '1rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  flexDirection: 'column',
})

const AuthorEditBox = styled(Box)({
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

export const AuthorEdit = () => {
  const { id } = useParams<{ id: string | undefined }>()
  const [data, setData] = useState<editAuthorDTO>({
    id: id ? Number(id) : null,
    name: '',
    lastName: '',
    nativeLanguage: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<editAuthorDTO>({
    defaultValues: data,
  })

  const navigate = useNavigate()

  const fetchingAuthor = async () => {
    if (id !== 'null') {
      try {
        const author = await authorService.getAuthor(Number(id))
        setData(author)
        reset(author)
      } catch (error) {
        console.error(error)
      }
    }
  }

  useOnInit(() => {
    fetchingAuthor()
  })

  const handleCancel = () => {
    navigate(-1)
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  const onSubmit: SubmitHandler<editAuthorDTO> = async (formData) => {
    handleDisabledButton()
    try {
      if (Number.isNaN(formData.id)) {
        await authorService.createAuthor(formData)
        setSnackbarMessage('Created author successfully')
      } else {
        await authorService.updateAuthor(Number(id), formData)
        setSnackbarMessage('Updated author successfully')
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

  const handleDisabledButton = () => {
    setIsSubmitting((prev) => !prev)
  }

  return (
    <AuthorEditContainer>
      <Card
        variant="outlined"
        sx={{ width: '80vw' }}
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
        <AuthorEditBox>
          <TextField
            label="Name"
            variant="outlined"
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters',
              },
              validate: {
                noSpecialCharacters: (value) =>
                  /^[a-zA-Z\s]*$/.test(value) ||
                  'Name must contain only alphabetic characters',
              },
            })}
            error={!!errors.name}
            slotProps={{ inputLabel: { shrink: true } }}
          />
          {errors.name && <Alert severity="error">{errors.name.message}</Alert>}
          <TextField
            label="Last Name"
            variant="outlined"
            {...register('lastName', {
              required: 'Last name is required',
              minLength: {
                value: 2,
                message: 'Last name must be at least 2 characters',
              },
              validate: {
                noSpecialCharacters: (value) =>
                  /^[a-zA-Z\s]*$/.test(value) ||
                  'Name must contain only alphabetic characters',
              },
            })}
            error={!!errors.lastName}
            slotProps={{ inputLabel: { shrink: true } }}
          />
          {errors.lastName && (
            <Alert severity="error">{errors.lastName.message}</Alert>
          )}
          <FormGroup>
            <SelectLabel htmlFor="nativeLanguage">Native Language</SelectLabel>
            <Select
              label="Native Language"
              variant="outlined"
              value={data.nativeLanguage}
              {...register('nativeLanguage', {
                required: 'Native language is required',
                onChange: (e) =>
                  setData({ ...data, nativeLanguage: e.target.value }),
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
          </FormGroup>
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
        </AuthorEditBox>
      </Card>
      <SnackMessage
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        severity="success"
      />
    </AuthorEditContainer>
  )
}
