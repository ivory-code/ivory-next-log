import Button from '@/components/Button'
import Profile from '@/components/Profile'
import {useUser} from '@/store/user'
import {createBrowserClient} from '@/supabase/client'

interface Props {
  className?: string
}

const LoginForm = ({className}: Props) => {
  const user = useUser(state => state.user)
  const setUser = useUser(state => state.setUser)

  const supabase = createBrowserClient()

  const isLogin = user !== null

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (user) {
      supabase.auth.signOut()
      setUser(null)
      return
    }

    supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: location.origin,
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <Profile
        position="right"
        isLogin={isLogin}
        nickname={user?.nickname ?? ''}
      />
      <Button buttonName={user ? 'Logout' : 'Login'} type="submit" />
    </form>
  )
}

export default LoginForm
