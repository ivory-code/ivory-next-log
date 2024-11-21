import MainPage from '@/pages/MainPage'
import {SUPABASE_ANON_KEY, SUPABASE_URL} from '@/shared/constants'

export default async function Home() {
  try {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error(
        'Supabase URL or ANON KEY is missing in environment variables.',
      )
    }

    const response = await fetch(`${SUPABASE_URL}/rest/v1/profile`, {
      method: 'GET',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch profile data')
    }

    const data = await response.json()

    if (!data || !data.length) {
      throw new Error('Profile data is empty or invalid')
    }

    return <MainPage profileData={data[0]} />
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching profile data:', error)
    return (
      <div className="text-center text-red-500">
        Error loading profile data. Please try again later.
      </div>
    )
  }
}
