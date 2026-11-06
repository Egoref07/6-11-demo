import Link from 'next/link'
import { ActionButton } from '@/components/action-button'
import { Panel, PanelContent, PanelHeader, PanelTitle } from '@/components/panel'
import { TextArea } from '@/components/text-area'
import { getSession } from '@/lib/session'
import { getApplications } from '@/lib/applications'
import { courseTitles, paymentTitles, statusTitles, formatDate } from '@/lib/labels'
import { sendReview } from '@/actions/review'
import { logout } from '@/actions/sign-out'

export default async function ApplicationsPage() {
  const session = await getSession()
  if (!session) {
    return null
  }

  const applications = await getApplications(session.userId)

  return (
    <div className="flex min-h-svh w-full flex-col items-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-lg flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Мои заявки</h1>
        <div className="flex flex-wrap items-center gap-2">
          <ActionButton render={<Link href="/applications/new" />} nativeButton={false}>Оформить заявку</ActionButton>
          <form action={logout}>
            <ActionButton type="submit" variant="outline">Выйти</ActionButton>
          </form>
        </div>
      </div>

      {applications.length === 0 ? (
        <p className="text-sm text-muted-foreground">У вас пока нет заявок</p>
      ) : (
        <ul className="flex w-full max-w-lg flex-col gap-4">
          {applications.map((application) => (
            <li key={application.id}>
              <Panel>
                <PanelHeader>
                  <PanelTitle>{courseTitles[application.course]}</PanelTitle>
                </PanelHeader>
                <PanelContent className="flex flex-col gap-1 text-left">
                  <p className="text-sm text-muted-foreground">
                    Дата начала: {formatDate(application.startDate)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Оплата: {paymentTitles[application.payment]}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Статус: {statusTitles[application.status]}
                  </p>
                  {application.review && (
                    <p className="mt-2 text-sm italic">Ваш отзыв: {application.review}</p>
                  )}
                  {application.status === 'completed' && !application.review && (
                    <form action={sendReview.bind(null, application.id)} className="mt-2 flex flex-col gap-2">
                      <TextArea
                        name="review"
                        placeholder="Оставьте отзыв о качестве обучения"
                        rows={3}
                        required
                      />
                      <ActionButton type="submit" className="self-start">
                        Отправить отзыв
                      </ActionButton>
                    </form>
                  )}
                </PanelContent>
              </Panel>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
