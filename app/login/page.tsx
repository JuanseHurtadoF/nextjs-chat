import { LoginForm } from '@/components/auth/login-form'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function LoginPage({
  searchParams
}: {
  searchParams: { message: string }
}) {
  // Check for existing session
  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  // If user is already logged in, redirect to home page
  if (user) {
    return redirect('/')
  }

  return (
    <main className="flex flex-col p-4">
      <LoginForm />
      {searchParams?.message && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {searchParams.message}
        </p>
      )}
    </main>
  )
}
