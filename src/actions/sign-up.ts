'use server'

import {redirect} from "next/navigation";
import {saveSession} from "@/lib/session";
import {createUser} from "@/lib/users";

export interface RegisterState {
    fieldErrors?: Record<string, string>
}

export async function register(
    _prevState: RegisterState,
    formData: FormData,
): Promise<RegisterState> {
    const result = await createUser({
        login: String(formData.get('login') ?? ''),
        password: String(formData.get('password') ?? ''),
        fullName: String(formData.get('fullName') ?? ''),
        phone: String(formData.get('phone') ?? ''),
        email: String(formData.get('email') ?? ''),
    })

    if (!result.ok) {
        return { fieldErrors: result.fieldErrors }
    }

    await saveSession({userId: result.user.id, role: result.user.role})

    redirect('/applications')
}
