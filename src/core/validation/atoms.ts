import { number, string } from 'yup'

export const getCommonStringValidationSchema = (fieldName: string, maxLength = 100) =>
  string().min(1).max(maxLength).trim().required(`${fieldName} is required!`)
export const getAmountValidationSchema = (fieldName: string, min = 0, max = 100000) =>
  number()
    .min(min, `Min value for ${fieldName} is ${min}.`)
    .max(max, `Max value for ${fieldName} is ${max}.`)
    .required(`${fieldName} is required!`)
