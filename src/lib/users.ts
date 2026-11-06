import 'server-only'
import { database } from '@/lib/db'
import { hashPassword, checkPassword } from '@/lib/passwords'
import { ACCOUNT_LOGIN_PATTERN, PERSON_NAME_PATTERN, CONTACT_PHONE_PATTERN, CONTACT_EMAIL_PATTERN } from '@/lib/validation'
import type { Role } from '@/generated/database/enums'

export interface UserInfo {
  id: string
  role: Role
}

export interface RegisterInput {
  login: string
  password: string
  fullName: string
  phone: string
  email: string
}

export type RegisterResult =
  | { ok: true; user: UserInfo }
  | { ok: false; fieldErrors: Record<string, string> }

export type LoginResult = { ok: true; user: UserInfo } | { ok: false; error: string }

export async function createUser(input: RegisterInput): Promise<RegisterResult> {
  const { login, password, fullName, phone, email } = input

  const fieldErrors: Record<string, string> = {}
  if (!ACCOUNT_LOGIN_PATTERN.test(login)) {
    fieldErrors.login = 'Логин должен содержать только латинские буквы и цифры, не менее 6 символов'
  }
  if (password.length < 8) {
    fieldErrors.password = 'Пароль должен содержать не менее 8 символов'
  }
  if (!PERSON_NAME_PATTERN.test(fullName)) {
    fieldErrors.fullName = 'ФИО должно содержать только кириллицу и пробелы'
  }
  if (!CONTACT_PHONE_PATTERN.test(phone)) {
    fieldErrors.phone = 'Телефон должен быть в формате 8(XXX)XXX-XX-XX'
  }
  if (!CONTACT_EMAIL_PATTERN.test(email)) {
    fieldErrors.email = 'Некорректный адрес электронной почты'
  }
  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors }
  }

  const existing = await database.user.findUnique({ where: { login } })
  if (existing) {
    return { ok: false, fieldErrors: { login: 'Логин занят' } }
  }

  const passwordHash = await hashPassword(password)
  const user = await database.user.create({
    data: { login, passwordHash, fullName, phone, email },
  })

  return { ok: true, user: { id: user.id, role: user.role } }
}

export async function checkUser(login: string, password: string): Promise<LoginResult> {
  if (!login || !password) {
    return { ok: false, error: 'Заполните все поля' }
  }

  const user = await database.user.findUnique({ where: { login } })
  if (!user) {
    return { ok: false, error: 'Пользователь не найден' }
  }

  const isValid = await checkPassword(password, user.passwordHash)
  if (!isValid) {
    return { ok: false, error: 'Неверный логин или пароль' }
  }

  return { ok: true, user: { id: user.id, role: user.role } }
}
