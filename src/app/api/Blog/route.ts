import {NextResponse} from 'next/server'

import {createBrowserClient} from '@/supabase/client'

export async function GET() {
  const supabase = createBrowserClient()

  try {
    // posts와 comments 데이터를 병렬로 가져오는 부분
    const {data: commentsData, error: commentsError} = await supabase
      .from('comments')
      .select('*') // 코멘트는 제한 없이 모두 가져옴 (필요시 제한 추가 가능)

    // 오류 처리
    if (commentsError) {
      return NextResponse.json({error: commentsError?.message}, {status: 500})
    }

    // posts와 comments 데이터를 함께 반환
    return NextResponse.json({comments: commentsData})
  } catch (error) {
    return NextResponse.json(
      {error: 'Error fetching blog detail and comments'},
      {status: 500},
    )
  }
}
