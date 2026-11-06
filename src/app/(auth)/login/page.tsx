'use client'

import {useActionState} from "react";
import {login, LoginState} from "@/actions/sign-in";
import {SignInForm} from "@/components/sign-in-form";
import {PhotoCarousel} from "@/components/photo-carousel";

const emptyFormState: LoginState = {}

export default function LoginPage() {
    const [state, submitForm, isSubmitting] = useActionState(login, emptyFormState)

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <SignInForm
                        action={submitForm}
                        formError={state.formError}
                        isSubmitting={isSubmitting}
                    />
                </div>
            </div>
            <div className="relative order-first h-56 sm:h-72 lg:order-last lg:h-auto">
                <PhotoCarousel/>
            </div>
        </div>
    )
}
