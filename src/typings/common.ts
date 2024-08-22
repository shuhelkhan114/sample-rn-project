export interface SVGIconProps {
  fill?: string
  stroke?: string
  height?: number
  width?: number
}

export interface UserHeight {
  feet: number
  inch: number
}
export interface TwoPicker {
  first: string | number
  second: string | number
}

// export interface UserAuth {
//   email: string
//   password: string
// }

export enum SocialLoginTypes {
  Google = 'google',
  Apple = 'apple',
  Meta = 'meta',
  Email = 'email',
}

export enum ContinueWithMode {
  Login = 'login',
  SignUp = 'signup',
}

export enum GenderLabel {
  Man = 'Man',
  Women = 'Woman',
  Other = 'Other',
}

export enum GenderValue {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum SubscriptionPackage {
  RecoveryCoach = 'YuMe Recovery Coach',
  Community = 'YuMe Community',
  LifetimeCommunity = 'Yume Lifetime',
  YearlyCommunity = 'Yume Yearly Community',
  Basic = 'Yume Basic',
}
