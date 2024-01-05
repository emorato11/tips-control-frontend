export enum SPORTS_COLORS {
  basketball = '#6CB6DB',
  tennis = '#F4A261',
  football = '#AC37DE',
  volleyball = '#00684A',
  eSports = '#BF205A',
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
