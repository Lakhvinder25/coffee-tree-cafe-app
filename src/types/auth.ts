export type ScreenView = 'login' | 'signup' | 'showcase' | 'member';

export interface UserSession {
  fullName: string;
  email: string;
  phone?: string;
  coffeeBeans: number;
  memberTier: string;
  preferredBrew: string;
  joinedDate: string;
}

export type BrewPreference = 'Oat Milk' | 'Whole Milk' | 'Almond' | 'Cold Brew' | 'Pour Over';

export interface SecurityFeature {
  id: string;
  title: string;
  description: string;
  standard: string;
  icon: string;
}
