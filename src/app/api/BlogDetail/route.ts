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
    const {data, error} = await supabase
      .from('posts')
      .select('*')
      .eq('id', blogId)
      .single()

    if (error) {
      return NextResponse.json({error: error.message}, {status: 500})
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      {error: 'Error fetching blog detail'},
      {status: 500},
    )
  }
}
