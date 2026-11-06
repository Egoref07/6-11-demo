'use server'

import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { createApplication } from '@/lib/applications'

export interface ApplicationState {
  fieldErrors?: Record<string, string>
}

export async function sendApplication(
  _prevState: ApplicationState,
  formData: FormData,
): Promise<ApplicationState> {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }

  const result = await createApplication(session.userId, {
    course: String(formData.get('course') ?? ''),
    startDate: String(formData.get('startDate') ?? ''),
    payment: String(formData.get('payment') ?? ''),
  })

  if (!result.ok) {
    return { fieldErrors: result.fieldErrors }
  }

  redirect('/applications')
}
