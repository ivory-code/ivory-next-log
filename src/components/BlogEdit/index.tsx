'use client'

import {useRouter} from 'next/navigation'
import {useEffect, useState, useCallback} from 'react'
import {remark} from 'remark'
import html from 'remark-html'

import {createBlog} from '@/app/api/createBlog'
import {editBlog} from '@/app/api/editBlog'
import Button from '@/components/Button'
import Image from '@/components/Image'
import ImageUpload from '@/components/ImageUpload'
import InputField from '@/components/InputField'
import MarkdownView from '@/components/MarkdownView'
import Textarea from '@/components/Textarea'
import Typography from '@/components/Typography'
import {useUser} from '@/store/user'
import {createBrowserClient} from '@/supabase/client'
import {type BlogData} from '@/templates/BlogPage'

import type {ChangeEvent} from 'react'

const supabase = createBrowserClient()

const BlogEdit = ({
  blogData,
  onClose,
  refreshBlogs,
}: {
  blogData?: BlogData
  onClose?: () => void
  refreshBlogs?: () => void
}) => {
  const router = useRouter()
  const user = useUser(state => state.user)

  const [formData, setFormData] = useState({
    title: blogData?.title ?? '',
    imageUrl: blogData?.titleImageUrl ?? '',
    content: blogData?.content ?? '',
  })
  const [htmlContent, setHtmlContent] = useState('')
  const [mainImageFile, setMainImageFile] = useState<File | null>(null)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  const handleMainImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0]
      setMainImageFile(file)
      setFormData(prev => ({...prev, imageUrl: URL.createObjectURL(file)}))
    }
  }

  const uploadImage = async (file: File) => {
    const {error} = await supabase.storage
      .from('images')
      .upload(file.name, file, {
        cacheControl: '0',
        upsert: true,
      })

    if (error) {
      // eslint-disable-next-line no-console
      console.error('Error uploading image:', error)
      return null
    }

    const {data: publicUrlData} = supabase.storage
      .from('images')
      .getPublicUrl(file.name)
    return publicUrlData.publicUrl || ''
  }

  const handleContentImageUpload = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files) {
      const file = event.target.files[0]
      const imageUrl = await uploadImage(file)
      if (imageUrl) {
        setFormData(prev => ({
          ...prev,
          content: prev.content + `\n![이미지 설명](${imageUrl})\n`,
        }))
        setUploadedImages(prev => [...prev, imageUrl])
      }
    }
  }

  const convertMarkdownToHtml = useCallback(async (markdownBody: string) => {
    const processedContent = await remark().use(html).process(markdownBody)
    setHtmlContent(processedContent.toString())
  }, [])

  const handleEdit = async () => {
    if (!formData.title || !formData.content) {
      return alert('제목과 내용을 입력해주세요.')
    }

    let updatedImageUrl = formData.imageUrl

    if (mainImageFile) {
      const imageUrl = await uploadImage(mainImageFile)
      if (imageUrl) updatedImageUrl = imageUrl
    }

    const blogPayload = {
      title: formData.title,
      content: formData.content,
      imageUrl: updatedImageUrl,
    }

    if (blogData) {
      await editBlog({id: blogData.id, ...blogPayload})
      refreshBlogs?.()
      onClose?.()
    } else {
      await createBlog({id: user?.id ?? '', ...blogPayload})
      router.push('/Blog')
    }
  }

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

      <InputField
        label="제목"
        name="title"
        value={formData.title}
        placeholder="제목을 입력해주세요."
        onChange={e => setFormData({...formData, title: e.target.value})}
      />

      <ImageUpload
        label="메인 이미지 수정"
        onImageChange={handleMainImageChange}
        imageUrl={formData.imageUrl}
      />

      <ImageUpload
        label="본문 이미지 추가"
        onImageChange={handleContentImageUpload}
      />

      {uploadedImages.length > 0 && (
        <div className="mb-4">
          <ul className="flex flex-row">
            {uploadedImages.map((imageUrl, index) => (
              <li key={index} className="mb-2">
                <Image
                  src={imageUrl}
                  alt={`Uploaded Image ${index + 1}`}
                  className="max-w-full h-auto rounded-md mr-4"
                  width={140}
                  height={115}
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold mb-2">내용</h2>
        <Textarea
          name="content"
          value={formData.content}
          placeholder="내용을 입력해주세요."
          onChange={e => setFormData({...formData, content: e.target.value})}
          className="w-full h-48 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex-1 flex flex-col overflow-auto mt-4">
        <h2 className="text-xl font-bold mb-2">미리보기</h2>
        <MarkdownView
          content={htmlContent}
          className="flex-1 p-4 border border-gray-300 rounded-md shadow-sm bg-white"
        />
      </div>
    </div>
  )
}

export default BlogEdit
