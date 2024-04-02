import { SignUpForm } from '@/components/auth/signup-form'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function SignUpPage({
  searchParams
}: {
  searchParams: { message: string }
}) {
  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  // If user is already logged in, redirect to home page
  if (user) {
    // return redirect("/");
  }

  return (
    <main className="flex flex-col p-2 lg:p-0">
      <SignUpForm />
      {searchParams?.message && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {searchParams.message}
        </p>
      )}
    </main>
  )
}
