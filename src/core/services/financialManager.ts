import { FinancialManager } from '~/typings/user'
import apiInstance from '../lib/axios'

export const fetchProfile = async () => {
  return await apiInstance.get<FinancialManager>('/financialmanagers/profile')
}
