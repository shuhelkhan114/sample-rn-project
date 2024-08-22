// TODO: Move these to env files, potentially into a remote config

enum Env {
  Development = 'development',
  Production = 'production',
}

const envConfig = {
  [Env.Development]: {
    apiUrl: 'https://dev.api.yu-me.us/v1',
    stream: {
      apiKey: 'kjcbupgum6ps',
      appId: '1268546',
      pushProviderName: 'firebase_dev',
    },
    firebase: {
      webClientId: '330685240296-lnbc2a8vpblkiotergfo10u0c6cgc2pr.apps.googleusercontent.com',
      dynamicLinkBaseUrl: 'https://app.yu-me.us',
    },
    revenueCat: {
      ios: 'appl_nyEqLBTsVbUNZpYaQsbLQHuITAy',
    },
  },
  [Env.Production]: {
    apiUrl: 'https://prod.api.yu-me.us/v1',
    stream: {
      apiKey: 'kkudtn6u5fwr',
      appId: '1277466',
      pushProviderName: 'yume_prod',
    },
    firebase: {
      webClientId: '862688757583-t03116fo5ji49ifbfu5kn6st9c1mbo3b.apps.googleusercontent.com',
      dynamicLinkBaseUrl: 'https://yu-me.us',
    },
    revenueCat: {
      ios: 'appl_nyEqLBTsVbUNZpYaQsbLQHuITAy',
    },
  },
}

const ENV = envConfig.production
export default ENV
