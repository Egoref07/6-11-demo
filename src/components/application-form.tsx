'use client'

import { useActionState } from 'react'
import { ActionButton } from '@/components/action-button'
import { TextInput } from '@/components/text-input'
import { FormField, FormFieldDescription, FormFieldGroup, FormFieldLabel } from '@/components/form-field'
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger, DropdownValue } from '@/components/dropdown'
import { courseTitles, paymentTitles } from '@/lib/labels'
import { sendApplication, type ApplicationState } from '@/actions/application'

const emptyFormState: ApplicationState = {}

export function ApplicationForm() {
  const [state, submitForm, isSubmitting] = useActionState(sendApplication, emptyFormState)

  return (
    <form action={submitForm} className="w-full max-w-sm">
      <FormFieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Заявка на обучение</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Выберите курс и укажите желаемую дату начала
          </p>
        </div>

        <FormField>
          <FormFieldLabel htmlFor="course">Курс</FormFieldLabel>
          <Dropdown name="course">
            <DropdownTrigger id="course" className="w-full">
              <DropdownValue placeholder="Выберите...">
                {(value: string) => courseTitles[value as keyof typeof courseTitles]}
              </DropdownValue>
            </DropdownTrigger>
            <DropdownContent>
              {Object.entries(courseTitles).map(([value, label]) => (
                <DropdownItem key={value} value={value}>{label}</DropdownItem>
              ))}
            </DropdownContent>
          </Dropdown>
          {state.fieldErrors?.course && (
            <FormFieldDescription className="text-destructive">{state.fieldErrors.course}</FormFieldDescription>
          )}
        </FormField>

        <FormField>
          <FormFieldLabel htmlFor="startDate">Дата начала обучения</FormFieldLabel>
          <TextInput id="startDate" name="startDate" type="date" className="bg-background" />
          {state.fieldErrors?.startDate && (
            <FormFieldDescription className="text-destructive">{state.fieldErrors.startDate}</FormFieldDescription>
          )}
        </FormField>

        <FormField>
          <FormFieldLabel htmlFor="payment">Способ оплаты</FormFieldLabel>
          <Dropdown name="payment">
            <DropdownTrigger id="payment" className="w-full">
              <DropdownValue placeholder="Выберите...">
                {(value: string) => paymentTitles[value as keyof typeof paymentTitles]}
              </DropdownValue>
            </DropdownTrigger>
            <DropdownContent>
              {Object.entries(paymentTitles).map(([value, label]) => (
                <DropdownItem key={value} value={value}>{label}</DropdownItem>
              ))}
            </DropdownContent>
          </Dropdown>
          {state.fieldErrors?.payment && (
            <FormFieldDescription className="text-destructive">{state.fieldErrors.payment}</FormFieldDescription>
          )}
        </FormField>

        <FormField>
          <ActionButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Отправляем...' : 'Отправить'}
          </ActionButton>
        </FormField>
      </FormFieldGroup>
    </form>
  )
}
