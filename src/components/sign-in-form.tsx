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

const isDevelopmentEnvironment = process.env.NODE_ENV === "development"

export function SignInForm({
  formError,
  isSubmitting,
  className,
  ...props
}: {
  formError?: string
  isSubmitting?: boolean
} & React.ComponentProps<"form">) {
  return (
    <form className={mergeClassNames("flex flex-col gap-6", className)} {...props}>
      <FormFieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Вход в аккаунт</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Введите логин и пароль, чтобы продолжить
          </p>
        </div>

        <FormField>
          <FormFieldLabel htmlFor="login">Логин</FormFieldLabel>
          <TextInput
            id="login"
            name="login"
            type="text"
            placeholder="user123"
            defaultValue={isDevelopmentEnvironment ? "Admin" : undefined}
            required
            className="bg-background"
          />
        </FormField>

        <FormField>
          <FormFieldLabel htmlFor="password">Пароль</FormFieldLabel>
          <TextInput
            id="password"
            name="password"
            type="password"
            defaultValue={isDevelopmentEnvironment ? "KorokNET" : undefined}
            required
            className="bg-background"
          />
        </FormField>

        {formError && (
          <FormFieldDescription className="text-center text-destructive">
            {formError}
          </FormFieldDescription>
        )}

        <FormField>
          <ActionButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Входим..." : "Войти"}
          </ActionButton>
        </FormField>

        <FormFieldDescription className="px-6 text-center">
          Еще не зарегистрированы? <a href="/register">Регистрация</a>
        </FormFieldDescription>
      </FormFieldGroup>
    </form>
  )
}
