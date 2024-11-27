import { alpha, styled } from '@mui/material/styles'
import HomeIcon from '@mui/icons-material/Home'
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark'
import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import LogoutIcon from '@mui/icons-material/Logout'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import ColorModeIconDropdown from '../theme/ColorModeIconDropdown'
import { Tooltip } from '@mui/material'

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? `rgba(${theme.palette.background.default} / 0.4)`
      : alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: '8px 12px',
}))

export default function Footer() {
  const ButtonMap = [
    {
      href: '/home',
      Element: HomeIcon,
      text: 'Inicio',
    },
    {
      href: '/books',
      Element: CollectionsBookmarkIcon,
      text: 'Libros',
    },
    {
      href: '/authors',
      Element: TextSnippetIcon,
      text: 'Autores',
    },
  ]

  const ViewButtons = ButtonMap.map((button, index) => (
    <Tooltip key={index} title={button.text}>
      <Button
        onMouseDown={(e) => {
          e.currentTarget.focus()
        }}
        href={button.href}
        variant="text"
      >
        <button.Element />
      </Button>
    </Tooltip>
  ))

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        top: 'auto',
        bottom: 0,
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          padding: '0',
        }}
      >
        <StyledToolbar variant="regular" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}
          >
            <Box sx={{ display: { xs: 'flex', md: 'flex' }, gap: '0.5rem' }}>
              {ViewButtons}
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'flex', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            <Button href="/" variant="text" color="info" size="small">
              <LogoutIcon />
            </Button>
            <ColorModeIconDropdown />
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  )
}
