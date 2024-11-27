import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { LinearProgress, Slide, useTheme } from '@mui/material/'
import { useState } from 'react'
import { authorService } from '../../../services/authorService'
import { Alert, IconButton, Snackbar, styled, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface OutlinedCardProps {
  id: number
  fullName: string
  nativeLanguage: string
  onDelete: () => void
}

export default function OutlinedCard({
  id,
  fullName,
  nativeLanguage,
  onDelete,
}: OutlinedCardProps) {
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success',
  )
  const [check, setCheck] = useState(true)
  const theme = useTheme()
  const navigate = useNavigate()

  const CardContainer = styled(Box)({
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    gap: '1rem',
    padding: '1rem',
  })

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  const handleClick = () => {
    navigate(`/author/${id}`)
  }

  const handleAnimation = () => {
    setCheck(false)
  }

  async function handleDelete(id: number) {
    try {
      await authorService.deleteAuthor(id)
      setSnackbarMessage('Deleting author...')
      setSnackbarSeverity('success')
      setOpenSnackbar(true)
      setTimeout(() => {
        onDelete()
      }, 1000)
      handleAnimation()
    } catch (error) {
      setSnackbarMessage('Cannot delete author with linked books.')
      setSnackbarSeverity('error')
      setOpenSnackbar(true)
      console.error('Error deleting author', error)
    }
  }

  return (
    <>
      <Slide
        key={id}
        in={check}
        direction="up"
        timeout={{ enter: 1000, exit: 500 }}
      >
        <Card variant="outlined" sx={{ height: '100%', width: '80vw' }}>
          <CardContainer>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                flexGrow: 1,
                overflow: 'hidden',
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 'bold',
                }}
              >
                {fullName}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color:
                    theme.palette.mode === 'dark'
                      ? theme.palette.grey[100]
                      : theme.palette.grey[500],
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                }}
              >
                {nativeLanguage}
              </Typography>
            </CardContent>
            <CardActions sx={{ alignSelf: 'flex-start', border: 'none' }}>
              <IconButton onClick={handleClick}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(id)}>
                <DeleteIcon sx={{ color: theme.palette.error.main }} />
              </IconButton>
            </CardActions>
          </CardContainer>
        </Card>
      </Slide>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
          {snackbarSeverity !== 'error' && <LinearProgress />}
        </Alert>
      </Snackbar>
    </>
  )
}
