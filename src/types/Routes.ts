export enum RoutesName {
  ROOT = 'root',
  LOGIN = 'login',
  HOME = 'home',
  CREATE_TIP = 'create-tip',
  TIP_DETAILS = 'tip-details',
  TIPSTERS = 'tipsters',
  TIPSTER_DETAILS = 'tipster-details',
  YIELD = 'yield',
  YIELD_DETAILS = 'yield-details'
}

export enum RoutesPath {
  ROOT = '/',
  LOGIN = '/login',
  HOME = 'home',
  CREATE_TIP = 'create-tip',
  TIP_DETAILS = 'tips/:id',
  TIPSTERS = 'tipsters',
  TIPSTER_DETAILS = 'tipsters/:id',
  YIELD = 'yield',
  YIELD_DETAILS = 'yield/:id'
}
