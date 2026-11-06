'use client'

import {useActionState} from "react";
import {register, RegisterState} from "@/actions/sign-up";
import {SignUpForm} from "@/components/sign-up-form";
import {PhotoCarousel} from "@/components/photo-carousel";

const emptyFormState: RegisterState = {}

export default function RegisterPage() {
    const [state, submitForm, isSubmitting] = useActionState(register, emptyFormState)

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <SignUpForm
                        action={submitForm}
                        fieldErrors={state.fieldErrors}
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
