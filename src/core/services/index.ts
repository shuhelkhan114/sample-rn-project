import * as recoveryCoachService from '~/core/services/recoveryCoach/auth'
import * as userServices from '~/core/services/user/auth'
import * as chatServices from './chat'
import * as configServices from './config'
import * as financialManagerServices from './financialManager'

const API = {
  user: userServices,
  config: configServices,
  recoveryCoach: recoveryCoachService,
  financialManager: financialManagerServices,
  chat: chatServices,
}

export default API
