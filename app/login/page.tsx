import { LoginForm } from '@/components/auth/login-form'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

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
