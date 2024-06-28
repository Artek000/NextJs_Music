'use client'

import {Button, Field, Fieldset, Label, Legend} from "@headlessui/react";
import InputFieldUI from "@/UI/inputField/InputFieldUI";
import { useFormState } from 'react-dom'
import {useAppDispatch} from "@/lib/hooks";
import {loginAction} from "@/lib/actions/loginAction";
import {setLogin, setToken} from "@/lib/userSlice";
import {redirect} from "next/navigation";

export default function LoginPage() {
    const storeDispatch = useAppDispatch()

    async function clientLoginAction(prevState: any, formData: FormData) {

        try {
            const data = await loginAction(formData)
            if(data.error) {
                return data.error
            }
            storeDispatch(setLogin(data.login))
            storeDispatch(setToken(data.token))
        } catch (error) {
            console.log('Fatal error', error)
        }
        redirect('/')
    }

    const [errorMessage, dispatch] = useFormState(clientLoginAction, null)

    return (
        <section className="mt-10 p-10 rounded-2xl bg-emerald-800 text-white">
            <form action={dispatch}>
                <Fieldset className="space-y-8">
                    <Legend className="text-lg font-bold">Log in</Legend>

                    <Field>
                        <Label className="block">Login</Label>
                        <InputFieldUI nameField="login" secret={false} required={true}/>
                    </Field>

                    <Field>
                        <Label className="block">Password</Label>
                        <InputFieldUI nameField="password" secret={true} required={true}/>
                    </Field>
                </Fieldset>

                <Field>
                    <Label>{errorMessage && <p className="text-red-400 font-bold">{errorMessage}</p>}</Label>
                </Field>

                <Button type="submit"
                        className="inline-flex items-center disabled:bg-gray-600 mt-10 gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-800 data-[focus]:outline-1 data-[focus]:outline-white">
                    Log in
                </Button>
            </form>
        </section>
    )
}