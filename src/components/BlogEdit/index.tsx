'use client'

import {useRouter} from 'next/navigation'
import {useCallback, useEffect, useState} from 'react'
import {remark} from 'remark'
import html from 'remark-html'

import {createBlog} from '@/app/api/createBlog'
import {editBlog} from '@/app/api/editBlog'
import Button from '@/components/Button'
import Image from '@/components/Image'
import Input from '@/components/Input'
import MarkdownView from '@/components/MarkdownView'
import Textarea from '@/components/Textarea'
import Typography from '@/components/Typography'
import {useUser} from '@/store/user'
import {createBrowserClient} from '@/supabase/client'
import {type Database} from '@/supabase/database.types'

type Props = {
  blogData?: Database['public']['Tables']['posts']['Row']
  onClose?: () => void
  refreshBlogs?: () => void
}

const BlogEdit = ({blogData, onClose, refreshBlogs}: Props) => {
  const router = useRouter()
  const user = useUser(state => state.user)
  const supabase = createBrowserClient()

  const [formData, setFormData] = useState({
    title: blogData?.title ?? '',
    imageUrl: blogData?.titleImageUrl ?? '',
    content: blogData?.content ?? '',
  })
  const [htmlContent, setHtmlContent] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {name, value} = event.target
    setFormData(prev => ({...prev, [name]: value}))
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0]
      setImageFile(file)

      // 이미지 미리보기 URL 생성
      const previewUrl = URL.createObjectURL(file)
      setFormData(prev => ({...prev, imageUrl: previewUrl}))
    }
  }

  const convertMarkdownToHtml = useCallback(async (markdownBody: string) => {
    const processedContent = await remark().use(html).process(markdownBody)
    setHtmlContent(processedContent.toString())
  }, [])

  const handleEdit = useCallback(async () => {
    if (formData.title.length === 0) {
      return alert('제목을 입력해주세요.')
    }

    if (formData.content.length === 0) {
      return alert('내용을 입력해주세요.')
    }

    let updatedImageUrl = formData.imageUrl

    // 이미지 파일이 있는 경우 업로드하고 URL을 얻어옵니다.
    if (imageFile) {
      const {data, error} = await supabase.storage
        .from('images')
        .upload(imageFile.name, imageFile, {
          cacheControl: '0',
          upsert: true,
        })

      if (error) {
        // eslint-disable-next-line no-console
        console.error('Error uploading image:', error)
        return
      }

      if (data) {
        const {data: publicUrlData} = supabase.storage
          .from('images')
          .getPublicUrl(imageFile.name)

        updatedImageUrl = publicUrlData.publicUrl || ''
      }
    }

    // 이미지 URL이 업데이트된 후에 블로그를 생성/수정합니다.
    const blogPayload = {
      title: formData.title,
      content: formData.content,
      imageUrl: updatedImageUrl,
    }

    if (blogData) {
      await editBlog({id: blogData.id, ...blogPayload})
      refreshBlogs?.()
      onClose?.()

      return
    }
    await createBlog({id: user?.id ?? '', ...blogPayload})
    router.push(`/Blog`)
  }, [
    formData.title,
    formData.content,
    formData.imageUrl,
    imageFile,
    user?.id,
    blogData,
    onClose,
    refreshBlogs,
    supabase.storage,
    router,
  ])

  useEffect(() => {
    convertMarkdownToHtml(formData.content)
  }, [formData.content, convertMarkdownToHtml])

  useEffect(() => {
    if (blogData) {
      setFormData({
        title: blogData.title,
        imageUrl: blogData.titleImageUrl,
        content: blogData.content,
      })
    }
  }, [blogData])

  return (
    <div className="flex flex-col h-full p-4 overflow-auto">
      <div className="flex justify-end items-center h-18">
        <Button onClick={handleEdit} className="border border-gray-300">
          <Typography
            text={blogData ? '게시글 수정' : '게시글 등록'}
            className="base2"
          />
        </Button>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">제목</h2>
        <Input
          name="title"
          value={formData.title}
          placeholder="제목을 입력해주세요."
          onChange={handleChange}
          className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">메인 이미지</h2>
        <div className="flex items-center">
          <label
            htmlFor="file-upload"
            className="border border-gray-300 p-2 rounded-md shadow-sm cursor-pointer hover:bg-gray-100 mr-4">
            <Typography text="이미지 수정" className="base2" />
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          {formData.imageUrl && (
            <div className="flex justify-center items-center">
              <Image
                src={formData.imageUrl}
                alt="Uploaded"
                className="max-w-full h-auto rounded-md"
                width={140}
                height={115}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-auto">
        <h2 className="text-xl font-bold mb-2">미리보기</h2>
        <MarkdownView
          content={htmlContent}
          className="flex-1 p-4 border border-gray-300 rounded-md shadow-sm bg-white"
        />
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">내용</h2>
        <Textarea
          name="content"
          value={formData.content}
          placeholder="내용을 입력해주세요."
          onChange={handleChange}
          className="w-full h-48 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>
  )
}

export default BlogEdit
