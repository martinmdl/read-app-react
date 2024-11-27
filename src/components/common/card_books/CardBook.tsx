import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import EditIcon from '@mui/icons-material/Edit'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import CalculateIcon from '@mui/icons-material/Calculate'
import {
  Alert,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slide,
  Snackbar,
  styled,
  Typography,
  useTheme,
} from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import { bookService } from '../../../services/bookService'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  flameAnimation,
  glowAnimation,
  pulseAnimation,
} from '../theme/customizations/animations'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import AbcOutlinedIcon from '@mui/icons-material/AbcOutlined'
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'

interface OutlinedCardProps {
  id: number | null
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
  onDelete: () => void
}

const ItemList = styled(ListItem)({
  display: 'flex',
  gap: '1rem',
})

export default function OutlinedCard({ ...props }: OutlinedCardProps) {
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success',
  )
  const [check, setCheck] = useState(true)
  const theme = useTheme()
  const navigate = useNavigate()

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  const handleClick = () => {
    navigate(`/books/${props.id}`)
  }

  const handleAnimation = () => {
    setCheck(false)
  }

  async function handleDelete(id: number | null) {
    try {
      await bookService.deleteBook(id!)
      setSnackbarMessage('Deleting book...')
      setSnackbarSeverity('success')
      setOpenSnackbar(true)
      setTimeout(() => {
        props.onDelete()
      }, 1000)
      handleAnimation()
    } catch {
      setSnackbarMessage('Cannot delete book with linked books.')
      setSnackbarSeverity('error')
      setOpenSnackbar(true)
    }
  }

  const CardContainer = styled(Box)({
    display: 'grid',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    padding: '1rem',
    gridTemplateColumns: '1fr min-content',
    gridTemplateRows: '1fr min-content',
    gridColumnGap: 0,
    gridRowGap: 0,
  })

  return (
    <>
      <Slide
        key={props.id}
        in={check}
        direction="up"
        timeout={{ enter: 1000, exit: 500 }}
      >
        <Card
          variant="outlined"
          sx={{
            height: '100%',
            width: '80vw',
          }}
        >
          <CardContainer>
            <Box
              component={'img'}
              src={'/potter.jpg'}
              alt={props.bookTitle}
              sx={{
                width: '200px',
                height: '300px',
                objectFit: 'cover',
                borderRadius: '10px',
                gridArea: '1 / 1 / 2 / 3',
                justifySelf: 'center',
              }}
            />
            <CardContent
              sx={{
                gridArea: '2 / 1 / 3 / 2',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                padding: '1rem',
                flexGrow: 1,
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 'bold',
                    wordBreak: 'break-word',
                    maxWidth: '200px',
                  }}
                >
                  {props.bookTitle}
                </Typography>
                <Box sx={{display:'flex',gap:'0.5rem' }}>
                  <BorderColorOutlinedIcon fontSize="small" />
                  <Typography variant="subtitle2">
                    {props.authorName}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <List>
                  <ItemList>
                    <ListItemIcon>
                      <MenuBookOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Pages"
                      secondary={props.pagesCount}
                    />
                  </ItemList>
                  <ItemList>
                    <ListItemIcon>
                      <AbcOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Words"
                      secondary={props.wordsCount}
                    />
                  </ItemList>
                  <ItemList>
                    <ListItemIcon>
                      <ReceiptOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Week sales"
                      secondary={props.weekSales.toString()}
                    />
                  </ItemList>
                  <ItemList>
                    <ListItemIcon>
                      <LanguageOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Languages"
                      secondary={Array.from(props.languages).join(', ')}
                    />
                  </ItemList>
                </List>
              </Box>
            </CardContent>
            <CardActions
              sx={{
                gridArea: '2 / 2 / 3 / 3',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: '10px',
                  position: 'relative',
                  top: '20px',
                }}
              >
                <Tooltip title="Lectura compleja">
                  <CalculateIcon
                  sx={{
                    display: props.complexLecture ? 'content' : 'none',
                    color: theme.palette.mode === 'dark' ? theme.palette.grey[100]  : theme.palette.grey[700] ,
                    '&:hover': {
                    animation: `${pulseAnimation} 1s infinite`,
                    },
                  }}
                  />
                </Tooltip>
                <Tooltip title="Best seller">
                  <WhatshotIcon
                    sx={{
                      display: props.bestSeller ? 'content' : 'none',
                      color: theme.palette.mode === 'dark' ? theme.palette.grey[100]  : theme.palette.grey[700] ,
                      '&:hover': {
                        animation: props.bestSeller
                          ? `${glowAnimation} 1.5s infinite alternate, ${flameAnimation} 1s ease-in-out infinite alternate`
                          : 'none',
                      },
                    }}
                  />
                </Tooltip>
              </Box>
              <Box sx={{ display: 'flex', gap: '10px', margin: '0' }}>
                <IconButton onClick={handleClick}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(props.id)}>
                  <DeleteIcon sx={{ color: theme.palette.error.main }} />
                </IconButton>
              </Box>
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
