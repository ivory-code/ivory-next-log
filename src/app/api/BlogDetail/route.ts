import {type NextRequest, NextResponse} from 'next/server'

import {createBrowserClient} from '@/supabase/client'

export async function GET(req: NextRequest) {
  const supabase = createBrowserClient()
  const {searchParams} = new URL(req.url)
  const blogId = searchParams.get('id')

  if (!blogId) {
    return NextResponse.json({error: 'Blog ID is required'}, {status: 400})
  }

  try {
    const [
      {data: postData, error: postError},
      {data: commentsData, error: commentsError},
    ] = await Promise.all([
      supabase.from('posts').select('*').eq('id', blogId).single(),
      supabase.from('comments').select('*').eq('post_id', blogId), // comments 테이블에서 post_id가 blogId인 것들을 가져옴
    ])

    if (postError || commentsError) {
      return NextResponse.json(
        {error: postError?.message || commentsError?.message},
        {status: 500},
      )
    }

    return NextResponse.json({post: postData, comments: commentsData})
  } catch (error) {
    return NextResponse.json(
      {error: 'Error fetching blog detail and comments'},
      {status: 500},
    )
  }
}
