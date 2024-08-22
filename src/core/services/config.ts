import apiInstance from '~/core/lib/axios'
import { Config } from '~/typings/config'

export const fetchConfig = async () => {
  return await apiInstance.get<Config>('/appconfig')
}
