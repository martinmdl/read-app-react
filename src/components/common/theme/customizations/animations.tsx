import { keyframes } from '@mui/material'

export const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`
export const glowAnimation = keyframes`
  from {
    filter: drop-shadow(0 0 5px orange);
  }
  to {
    filter: drop-shadow(0 0 15px yellow);
  }
`

export const flameAnimation = keyframes`
  from {
    color: orange;
  }
  to {
    color: red;
  }
`

export const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const shakeAnimation = keyframes`
  0%, 100% { transform: rotate(0); }
  20% { transform: rotate(-10deg); }
  40% { transform: rotate(10deg); }
  60% { transform: rotate(-10deg); }
  80% { transform: rotate(10deg); }
`

export const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`
