"use server"

import {saveSession} from "@/lib/session";
import {checkUser} from "@/lib/users";
import {redirect} from "next/navigation";

export interface LoginState {
    formError?: string
}


export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
    const result = await checkUser(
        String(formData.get('login') ?? ''),
        String(formData.get('password') ?? ''),
    )

    if (!result.ok) {
        return { formError: result.error }
    }

    await saveSession({userId: result.user.id, role: result.user.role})

    redirect('/applications')
}
