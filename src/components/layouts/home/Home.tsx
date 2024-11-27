import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useOnInit } from '../../../hooks/fetchHook'
import { homeService } from '../../../services/homeService'
import { CardStats } from '../../common/card_stats/CardStats'
import { cardValueDTO } from '../../../services/homeService'
import Divider from '@mui/material/Divider'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import GroupIcon from '@mui/icons-material/Group'
import StorefrontIcon from '@mui/icons-material/Storefront'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'
import { SnackMessage } from '../../common/snackMessages/SnackMessage'
import Skeleton from '@mui/material/Skeleton'
import { Alert } from '@mui/material'

export const HomePage = () => {
  const [cards, setCards] = useState<{
    users: number
    centers: number
    books: number
    recommendations: number
    inactiveUsers: number
    inactiveCenters: number
  }>({
    users: 0,
    centers: 0,
    books: 0,
    recommendations: 0,
    inactiveUsers: -1,
    inactiveCenters: -1
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbar, setSnackbar] = useState<{
    severity: 'error' | 'info' | 'warning' | 'success',
    message: string
  }>({
    severity:'info',
    message:''
  })

  const closeSnackbar = () => {
    setOpenSnackbar(false)
  }

  const updateCardsList = (originalAmounts: cardValueDTO) => {
    
    setCards({
      users: originalAmounts.usersAmount,
      centers: originalAmounts.readingCentersAmount,
      books: originalAmounts.booksAmount,
      recommendations: originalAmounts.recommendationsAmount,
      inactiveUsers: originalAmounts.inactiveUsersAmount,
      inactiveCenters: originalAmounts.inactiveCentersAmount
    })
  }

  useOnInit(() => {
    renderHomeCardsData()
  })
  
  
  const renderHomeCardsData = async () => {
    setIsLoading(true)
    setIsError(false)
    try {
      const originalAmounts = await homeService.getHomeCardsData()
      updateCardsList(originalAmounts)
    } catch (error) {
      console.error('Error fetching Home page', error)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteUsersButton = () => {
    homeService
      .deleteInactiveUsers()
      .then(() => {
        renderHomeCardsData()
        setSnackbar({severity:'success',  message: `Inactive users deleted: ${cards.inactiveUsers}` })
      })
      .catch(() => {
        setSnackbar({severity:'error',  message:'Unable to delete users'})
      })
      .finally(() => {
        setOpenSnackbar(true)        
      })
    }
    
    const deleteCentersButton = () => {
      homeService
      .deleteInactiveCenters()
      .then(() => {
        renderHomeCardsData()
        setSnackbar({severity:'success', message: `Inactive centers deleted: ${cards.inactiveCenters}` })
      })
      .catch(() => {
        setSnackbar({severity:'error',  message:'Unable to delete centers'})
      })
      .finally(() => {
        setOpenSnackbar(true)
      })
  }

  return (
    <Container maxWidth="xs">
      <Typography variant="h2" sx={{padding:'1rem 0 1rem 0'}}>
        Indicators
      </Typography>

      <Container sx={{display:'flex',flexDirection:'column',gap:'1rem',padding:'0'}}>
        {isLoading ? (
          <>
            <Skeleton variant="rounded" width={'100%'} height={'80px'} />
            <Skeleton variant="rounded" width={'100%'} height={'80px'} />
            <Skeleton variant="rounded" width={'100%'} height={'80px'} />
            <Skeleton variant="rounded" width={'100%'} height={'80px'} />
          </>
        ) : isError ? (
          <Alert severity="error">
            Error fetching indicators. Please try again later.
          </Alert>
        ) : (
          <>
            <CardStats title="Total Users" Icon={GroupIcon} amount={cards.users} />
            <CardStats title="Reading Centers" Icon={StorefrontIcon} amount={cards.centers} />
            <CardStats title="System's Books" Icon={AutoStoriesIcon} amount={cards.books} />
            <CardStats title="Recommendation" Icon={WorkspacePremiumIcon} amount={cards.recommendations} />
          </>
        )}
      </Container>

      <Divider
        sx={{ marginY: 2, borderBottomWidth: 2, borderColor: 'black' }}
      />

      <Typography variant="h4">
        Actions
      </Typography>

      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4rem',
          padding: '2rem 0 2rem 0',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <Button
          data-testid="delete-inactives-users"
          disabled={cards.inactiveUsers == 0}
          onClick={deleteUsersButton}
          variant="contained"
          startIcon={<DeleteIcon />}
          sx={{
            width: '70%',
            justifyContent: 'flex-start',
            '&.Mui-disabled': {
              cursor: 'not-allowed',
              pointerEvents: 'all',
            },
          }}
          color="secondary"
          >
          Delete inactive users
        </Button>
    
        <Button
          data-testid="delete-inactives-centers"
          disabled = {cards.inactiveCenters == 0}
          onClick={deleteCentersButton}
          variant="contained"
          startIcon={<DeleteIcon />}
          sx={{
            width: '70%',
            justifyContent: 'flex-start',
            '&.Mui-disabled': {
              cursor: 'not-allowed',
              pointerEvents: 'all',
            },
          }}
          color="secondary"
          >
          Delete inactive centers
        </Button>
      </Container>

      <SnackMessage
        open={openSnackbar}
        onClose={closeSnackbar}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Container>
  )
}