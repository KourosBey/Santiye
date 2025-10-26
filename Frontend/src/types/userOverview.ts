import { roles } from '@/enums/roles'

export interface UserOverview {
    id: string,
    fullName: string,
    role: roles,
    userNumber: string
}