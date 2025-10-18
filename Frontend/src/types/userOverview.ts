import { roles } from '@/enums/roles'

export interface userOverview {
    id: string,
    fullName: string,
    role: roles,
    userNumber: string
}