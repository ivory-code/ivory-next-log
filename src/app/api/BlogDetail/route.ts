import {NextResponse} from 'next/server'

export const MOCK_DATA = [
  {
    id: 1,
    title: '1st Title',
    content:
      '1st Content 1st Content 1st Content 1st Content 1st Content 1st Content',
    image: '/images/ogu.webp',
  },
  {
    id: 2,
    title: '2nd 제목 2nd 제목 2nd 제목 2nd 제목 2nd 제목',
    content:
      '2번째 콘텐츠 2번째 콘텐츠 2번째 콘텐츠 2번째 콘텐츠 2번째 콘텐츠 2번째 콘텐츠 2번째 콘텐츠 2번째 콘텐츠',
    image: '/images/doguri.png',
  },
  {
    id: 3,
    title: '3rd Title',
    content:
      '3rd contents 3rd contents 3rd contents 3rd contents 3rd contents 3rd contents 3rd contents 3rd contents 3rd contents',
    image: '/images/ogu.webp',
  },
  {
    id: 4,
    title: '4th 제목 4th 제목 4th 제목 4th 제목',
    content: '4th 4th 4th 4th 4th',
    image: '/images/doguri.png',
  },
]

// GET 요청 처리 함수
export async function GET() {
  return NextResponse.json(MOCK_DATA, {status: 200})
}
