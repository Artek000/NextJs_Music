'use client'

import {Button, Field, Fieldset, Label, Legend} from "@headlessui/react";
import InputFieldUI from "@/UI/inputField/InputFieldUI";
import { useFormState, useFormStatus } from 'react-dom'
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {setJwt} from "@/lib/counterSlice";
import {signupAction} from "@/lib/actions/signupAction";

export default function SignupPage() {
    // const currentJwt = useAppSelector((state) => state.counter.value)
    // const dispatch = useAppDispatch()

    const [errorMessage, dispatch] = useFormState(signupAction, undefined)

    return (
        <section className="mt-10 p-10 rounded-2xl bg-emerald-800 text-white">
            <form action={dispatch}>
                <Fieldset className="space-y-8">
                    <Legend className="text-lg font-bold">Sign Up</Legend>

                    <Field>
                        <Label className="block">Login</Label>
                        <InputFieldUI nameField="login" secret={false} required={true}/>
                    </Field>

                    <Field>
                        <Label className="block">Password</Label>
                        <InputFieldUI nameField="password" secret={true} required={true}/>
                    </Field>
                </Fieldset>

                <div>{errorMessage && <p>{errorMessage}</p>}</div>

                <Button type="submit"
                        className="inline-flex items-center mt-10 gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-800 data-[focus]:outline-1 data-[focus]:outline-white">
                    Sign Up
                </Button>
            </form>
        </section>
    )
}