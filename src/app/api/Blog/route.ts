import {NextResponse} from 'next/server'

import {createBrowserClient} from '@/supabase/client'

export async function GET() {
  const supabase = createBrowserClient()

  try {
    const [
      {data: postsData, error: postsError},
      {data: commentsData, error: commentsError},
    ] = await Promise.all([
      supabase.from('posts').select('*'),
      supabase.from('comments').select('*'),
    ])

    if (postsError || commentsError) {
      return NextResponse.json(
        {error: postsError?.message || commentsError?.message},
        {status: 500},
      )
    }
    return NextResponse.json({posts: postsData, comments: commentsData})
  } catch (error) {
    return NextResponse.json(
      {error: 'Error fetching blog detail and comments'},
      {status: 500},
    )
  }
}
