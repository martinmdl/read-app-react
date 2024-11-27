import { Theme, alpha, Components } from '@mui/material/styles'
import { gray, orange } from '../themePrimitives'

export const feedbackCustomizations: Components<Theme> = {
  
  MuiAlert: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 10,
        backgroundColor: orange[100],
        color: theme.palette.text.primary,
        border: `1px solid ${alpha(orange[300], 0.5)}`,
        '& .MuiAlert-icon': {
          color: orange[500],
        },
        ...theme.applyStyles('dark', {
          backgroundColor: `${alpha(orange[900], 0.8)}`,
          border: `1px solid ${alpha(orange[800], 1)}`,
        }),
      }),
    },
    variants: [
      {
        props: { severity: 'error' },
        style: ({ theme }) => ({
          backgroundColor: theme.palette.error.light,
          color: theme.palette.error.contrastText,
          border: `1px solid ${theme.palette.error.main}`,
          '& .MuiAlert-icon': {
            color: theme.palette.error.main,
          },
          ...theme.applyStyles('dark', {
            border: `1px solid ${theme.palette.error.dark}`,
          }),
        }),
      },
    ],
  },
  MuiDialog: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiDialog-paper': {
          borderRadius: '10px',
          border: '1px solid',
          borderColor: theme.palette.divider,
        },
      }),
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: ({ theme }) => ({
        height: 8,
        borderRadius: 8,
        background:
        'linear-gradient(90deg, rgba(0,224,255,1) 0%, rgba(32,79,232,1) 49%, rgba(91,29,223,1) 100%);',
        backgroundColor: gray[200],
        ...theme.applyStyles('dark', {
          backgroundColor: gray[800],
        }),
      }),
    },
  },
}
