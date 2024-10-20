import {NextResponse} from 'next/server'

import {createBrowserClient} from '@/supabase/client'

export async function GET() {
  const supabase = createBrowserClient()

  try {
    const {data: blogsData, error} = await supabase
      .from('posts')
      .select('*')
      .order('created_at', {ascending: false})

    if (error) {
      return NextResponse.json({error}, {status: 500})
    }

    return NextResponse.json({blogsData})
  } catch (error) {
    return NextResponse.json(
      {error: 'Error fetching blog detail and comments'},
      {status: 500},
    )
  }
}
