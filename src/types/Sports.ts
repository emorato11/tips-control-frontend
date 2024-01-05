export enum SPORTS_COLORS {
  basketball = '#6EC1E4',
  tennis = '#F4A261',
  football = '#6D4C41',
  volleyball = '#00684A',
  multi = '#FFADAD',
  default = '#eeee'
}

export enum Sports {
  TENNIS = 'tennis',
  BASKETBALL = 'basketball',
  FOOTBALL = 'football',
  VOLLEY = 'volleyball',
  ESPORTS = 'eSports',
  MULTI = 'multi'
}

export interface Sport {
  name: string
  value: Sports
}
