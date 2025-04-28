export interface Group {
  id: string
  name: string
  tipsterId: string
  tipsterName: String
}

export type CreateGroup = Omit<Group, 'id'>
