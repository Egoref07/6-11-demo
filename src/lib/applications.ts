import 'server-only'
import { database } from '@/lib/db'
import { availableCourses, availablePayments } from '@/lib/labels'
import { ISO_DATE_PATTERN } from '@/lib/validation'
import type { Course, Payment } from '@/generated/database/client'

export interface ApplicationInput {
  course: string
  startDate: string
  payment: string
}

export type ApplicationResult = { ok: true } | { ok: false; fieldErrors: Record<string, string> }

export function getApplications(userId: string) {
  return database.application.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })
}

export async function createApplication(
  userId: string,
  input: ApplicationInput,
): Promise<ApplicationResult> {
  const fieldErrors: Record<string, string> = {}

  const course = input.course as Course
  if (!availableCourses.includes(course)) {
    fieldErrors.course = 'Выберите один из предложенных курсов'
  }
  const dateMatch = ISO_DATE_PATTERN.exec(input.startDate)
  if (!dateMatch) {
    fieldErrors.startDate = 'Укажите дату начала обучения'
  }
  const payment = input.payment as Payment
  if (!availablePayments.includes(payment)) {
    fieldErrors.payment = 'Выберите способ оплаты'
  }

  if (Object.keys(fieldErrors).length > 0 || !dateMatch) {
    return { ok: false, fieldErrors }
  }

  const [, year, month, day] = dateMatch
  const startDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)))

  await database.application.create({
    data: { userId, course, startDate, payment },
  })

  return { ok: true }
}

export async function saveReview(userId: string, applicationId: string, review: string) {
  const text = review.trim()
  if (!text) {
    return false
  }

  const application = await database.application.findUnique({ where: { id: applicationId } })
  if (!application || application.userId !== userId || application.status !== 'completed') {
    return false
  }

  await database.application.update({ where: { id: applicationId }, data: { review: text } })
  return true
}
