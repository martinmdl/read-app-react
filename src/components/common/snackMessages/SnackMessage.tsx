import { Snackbar, Alert } from '@mui/material'

interface SuccessSnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity: "error" | "warning" | "info" | "success";
}

export const SnackMessage = ({ open, onClose, message, severity }: SuccessSnackbarProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{ marginBottom: '4rem' }}
    >
      <Alert severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  )
}
