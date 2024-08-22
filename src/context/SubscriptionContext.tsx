import * as Sentry from '@sentry/react-native'
import { PropsWithChildren, createContext, useContext, useState } from 'react'
import { Platform } from 'react-native'
import Purchases, { CustomerInfo, PurchasesOffering } from 'react-native-purchases'
import ENV from '~/core/config/env'
import toast from '~/core/lib/toast'

export enum Subscriptions {
  Lifetime = 'yume_lifetimeiap', // $99
  RecoveryCoach = 'yume_monthly', // 249.99/month
  YearlyCommunity = 'yume_yearly_community', // 199/month
  Community = 'yume_monthly_community', // 9.99/month
  Basic = 'yume_basic', // 19.99/month
}

const SubscriptionContext = createContext<{
  initializing: boolean
  customerInfo: CustomerInfo | null
  currentOfferings: Record<string, PurchasesOffering> | null
  isCommunitySubscriber: boolean
  isLifetimeCommunitySubscriber: boolean
  isYearlyCommunitySubscriber: boolean
  isRecoveryCoachSubscriber: boolean
  isBasicSubscriber: boolean
  init: () => void
}>({
  initializing: false,
  customerInfo: null,
  currentOfferings: null,
  isBasicSubscriber: false,
  isCommunitySubscriber: false,
  isLifetimeCommunitySubscriber: false,
  isYearlyCommunitySubscriber: false,
  isRecoveryCoachSubscriber: false,
  init: () => {},
})

const SubscriptionContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [initializing, setInitializing] = useState(true)
  const [currentOfferings, setCurrentOfferings] = useState<Record<
    string,
    PurchasesOffering
  > | null>(null)
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null)

  const isLifetimeCommunitySubscriber =
    customerInfo?.activeSubscriptions.includes(Subscriptions.Lifetime) || false
  const isYearlyCommunitySubscriber =
    customerInfo?.activeSubscriptions.includes(Subscriptions.YearlyCommunity) || false
  const isCommunitySubscriber =
    customerInfo?.activeSubscriptions.includes(Subscriptions.Community) || false
  const isRecoveryCoachSubscriber =
    customerInfo?.activeSubscriptions.includes(Subscriptions.RecoveryCoach) || false
  const isBasicSubscriber = customerInfo?.activeSubscriptions.includes(Subscriptions.Basic) || false

  async function init() {
    try {
      setInitializing(true)

      if (Platform.OS === 'android') {
        // TODO: handle for Android
      } else if (Platform.OS === 'ios') {
        Purchases.configure({ apiKey: ENV.revenueCat.ios, usesStoreKit2IfAvailable: false })
      }

      const offerings = await Purchases.getOfferings()
      const customerInfo = await Purchases.getCustomerInfo()

      setCurrentOfferings(offerings.all)
      setCustomerInfo(customerInfo)
    } catch (error) {
      console.log(error)
      Sentry.captureException(error)
      toast.error('Error', 'Error initializing RevenueCat')
    } finally {
      setInitializing(false)
    }
  }

  return (
    <SubscriptionContext.Provider
      value={{
        initializing,
        customerInfo,
        currentOfferings,
        isLifetimeCommunitySubscriber,
        isYearlyCommunitySubscriber,
        isCommunitySubscriber,
        isRecoveryCoachSubscriber,
        isBasicSubscriber,
        init,
      }}>
      {children}
    </SubscriptionContext.Provider>
  )
}

export const useSubscription = () => {
  const context = useContext(SubscriptionContext)
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionContextProvider')
  }
  return context
}

export default SubscriptionContextProvider
