'use server'

import { revalidatePath } from 'next/cache'
import { getSession } from '@/lib/session'
import { saveReview } from '@/lib/applications'

export async function sendReview(applicationId: string, formData: FormData) {
  const session = await getSession()
  if (!session) {
    return
  }

  const saved = await saveReview(session.userId, applicationId, String(formData.get('review') ?? ''))
  if (saved) {
    revalidatePath('/applications')
  }
}
