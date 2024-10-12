import {createBrowserClient} from '@/supabase/client'

export async function getBlogs() {
  const supabase = createBrowserClient()

  try {
    const {data, error} = await supabase.from('posts').select('*')

    if (error) {
      return alert(error)
    }
    return data
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}
