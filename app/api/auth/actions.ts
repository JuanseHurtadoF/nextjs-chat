import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export const login = async (formData: FormData) => {
  'use server'

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    console.log(error)
    if (error.status === 400) {
      return redirect('/login?message=Invalid email or password')
    } else {
      return redirect('/login?message=Could not authenticate user')
    }
  }
}

export const signUp = async (formData: FormData) => {
  'use server'

  const origin = headers().get('origin')
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`
    }
  })

  if (error) {
    console.log(error)
    return redirect('/signup?message=Could not authenticate user')
  }
  return redirect('/')
}
