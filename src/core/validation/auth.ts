import * as Yup from 'yup'

export const emailSchema = Yup.string()
  .email('Invalid email')
  .required('Email is required')
  .max(100, 'Email is too long')
  .min(4, 'Email is too short')

export const passwordSchema = Yup.string()
  .min(6, 'Password must be at least 6 characters')
  .max(100, 'Password is too long')
  .required('Password is required')
