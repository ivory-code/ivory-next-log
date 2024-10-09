'use client'

import Link from 'next/link'
import {useCallback, useEffect, useState} from 'react'
import {remark} from 'remark'
import html from 'remark-html'

import Button from '@/components/Button'
import Input from '@/components/Input'
import Textarea from '@/components/Textarea'

const MarkdownEditor = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [htmlContent, setHtmlContent] = useState('')

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setContent(event.target.value)
  }

  const convertMarkdownToHtml = useCallback(async (markdownBody: string) => {
    const processedContent = await remark().use(html).process(markdownBody)
    setHtmlContent(processedContent.toString())
  }, [])

  useEffect(() => {
    void convertMarkdownToHtml(content)
  }, [content, convertMarkdownToHtml])

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex justify-end items-center h-18">
        <Link href="/Blog">
          <Button
            buttonName="게시글 등록"
            onClick={() => console.log('click create button')}
            className="border border-gray-300"
          />
        </Link>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">제목</h2>
        <Input
          value={title}
          placeholder="제목을 입력해주세요."
          onChange={handleTitleChange}
          className={
            'w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500'
          }
        />
      </div>
      <div className="flex-1 flex flex-col">
        <h2 className="text-xl font-bold mb-2">미리보기</h2>
        <div
          className="flex-1 overflow-y-auto p-4 border border-gray-300 rounded-md shadow-sm bg-white"
          dangerouslySetInnerHTML={{__html: htmlContent}}
        />
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">내용</h2>
        <Textarea
          value={content}
          placeholder="내용을 입력해주세요."
          onChange={handleContentChange}
          className="w-full h-48 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>
  )
}

export default MarkdownEditor
