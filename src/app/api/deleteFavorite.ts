import {createBrowserClient} from '@/supabase/client'

export async function deleteFavorite({
  userId,
  blogId,
}: {
  userId: string
  blogId: string
}) {
  const supabase = createBrowserClient()

  try {
    const {error} = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('post_id', blogId)

    if (error) {
      return alert('권한이 없습니다.')
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}
