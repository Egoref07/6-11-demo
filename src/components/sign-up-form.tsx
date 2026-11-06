"use client"

import { mergeClassNames } from "@/styles/class-names"

import { ActionButton } from "@/components/action-button"
import {
  FormField,
  FormFieldDescription,
  FormFieldGroup,
  FormFieldLabel,
} from "@/components/form-field"
import { TextInput } from "@/components/text-input"

export function SignUpForm({
  fieldErrors,
  isSubmitting,
  className,
  ...props
}: {
  fieldErrors?: Record<string, string>
  isSubmitting?: boolean
} & React.ComponentProps<"form">) {
  return (
    <form className={mergeClassNames("flex flex-col gap-6", className)} {...props}>
      <FormFieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Создать аккаунт</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Заполните форму, чтобы зарегистрироваться
          </p>
        </div>

        <FormField>
          <FormFieldLabel htmlFor="login">Логин</FormFieldLabel>
          <TextInput
            id="login"
            name="login"
            type="text"
            placeholder="user123"
            required
            className="bg-background"
          />
          <FormFieldDescription
            className={fieldErrors?.login ? "text-destructive" : undefined}
          >
            {fieldErrors?.login ??
              "Латинские буквы и цифры, не менее 6 символов."}
          </FormFieldDescription>
        </FormField>

        <FormField>
          <FormFieldLabel htmlFor="fullName">ФИО</FormFieldLabel>
          <TextInput
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Иванов Иван Иванович"
            required
            className="bg-background"
          />
          <FormFieldDescription
            className={fieldErrors?.fullName ? "text-destructive" : undefined}
          >
            {fieldErrors?.fullName ?? "Кириллица и пробелы."}
          </FormFieldDescription>
        </FormField>

        <FormField>
          <FormFieldLabel htmlFor="email">Email</FormFieldLabel>
          <TextInput
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            className="bg-background"
          />
          <FormFieldDescription
            className={fieldErrors?.email ? "text-destructive" : undefined}
          >
            {fieldErrors?.email ?? "Ваш адрес электронной почты."}
          </FormFieldDescription>
        </FormField>

        <FormField>
          <FormFieldLabel htmlFor="phone">Телефон</FormFieldLabel>
          <TextInput
            id="phone"
            name="phone"
            type="tel"
            placeholder="8(999)123-45-67"
            required
            className="bg-background"
          />
          <FormFieldDescription
            className={fieldErrors?.phone ? "text-destructive" : undefined}
          >
            {fieldErrors?.phone ?? "Формат: 8(XXX)XXX-XX-XX."}
          </FormFieldDescription>
        </FormField>

        <FormField>
          <FormFieldLabel htmlFor="password">Пароль</FormFieldLabel>
          <TextInput
            id="password"
            name="password"
            type="password"
            required
            className="bg-background"
          />
          <FormFieldDescription
            className={fieldErrors?.password ? "text-destructive" : undefined}
          >
            {fieldErrors?.password ?? "Не менее 8 символов."}
          </FormFieldDescription>
        </FormField>

        <FormField>
          <ActionButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Создаём..." : "Создать пользователя"}
          </ActionButton>
        </FormField>

        <FormFieldDescription className="px-6 text-center">
          Уже есть аккаунт? <a href="/login">Войти</a>
        </FormFieldDescription>
      </FormFieldGroup>
    </form>
  )
}
