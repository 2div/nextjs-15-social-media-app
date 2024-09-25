"use client"

import { signUpSchema, signUpValues } from '@/lib/validation'
import {zodResolver} from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

function SignUpForm() {
    const form = useForm<signUpValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            username: "",
            password: ""
        }
    })

    async function onSubmit(values: signUpValues) {
        //
    }

  return (
    <div>SignUpForm</div>
  )
}

export default SignUpForm