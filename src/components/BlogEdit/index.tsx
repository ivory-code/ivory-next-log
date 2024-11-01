'use client'

import MDEditor from '@uiw/react-md-editor'
import {useRouter} from 'next/navigation'
import {useEffect, useState} from 'react'

import {createBlog} from '@/app/api/createBlog'
import {editBlog} from '@/app/api/editBlog'
import Button from '@/components/Button'
import ImageUpload from '@/components/ImageUpload'
import InputField from '@/components/InputField'
import Typography from '@/components/Typography'
import {useUser} from '@/store/user'
import {createBrowserClient} from '@/supabase/client'
import {type BlogData} from '@/templates/BlogPage'

import type {ChangeEvent} from 'react'

const supabase = createBrowserClient()

const BlogEdit = ({
  blogData,
  refreshBlogs,
}: {
  blogData?: BlogData
  refreshBlogs?: () => void
}) => {
  const router = useRouter()
  const user = useUser(state => state.user)

  const [formData, setFormData] = useState({
    title: blogData?.title ?? '',
    imageUrl: blogData?.titleImageUrl ?? '',
    content: blogData?.content ?? '',
  })
  const [mainImageFile, setMainImageFile] = useState<File | null>(null)

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
    } else {
      await createBlog({id: user?.id ?? '', ...blogPayload})
      router.push('/Blog')
    }
  }

  const handleDrop = async (event: React.DragEvent) => {
    event.preventDefault()
    const files = event.dataTransfer.files

    if (files.length > 0) {
      const file = files[0]

      // 파일명에 한글이 포함되어 있는지 확인
      if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(file.name)) {
        alert('파일명에 한글이 포함되어 있습니다. 영문 파일명을 사용해 주세요.')
        return
      }

      const imageUrl = await uploadImage(file)
      if (imageUrl) {
        const markdownImageSyntax = `![이미지 설명](${imageUrl})`
        setFormData(prev => ({
          ...prev,
          content: prev.content + `\n${markdownImageSyntax}\n`,
        }))
      }
    }
  }

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

      <div className="flex flex-col mb-4">
        <h2 className="text-xl font-bold mb-2">내용</h2>
        <div
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()} // Allow dropping
        >
          <MDEditor
            value={formData.content}
            onChange={value => setFormData({...formData, content: value || ''})}
            style={{
              minHeight: '500px',
            }}
            height={500}
            preview="live"
            visibleDragbar
          />
        </div>
      </div>
    </div>
  )
}

export default BlogEdit
