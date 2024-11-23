import {useRouter} from 'next/navigation'
import {useState, useReducer} from 'react'

import {createBlog} from '@/app/api/createBlog'
import {editBlog} from '@/app/api/editBlog'
import {
  blogInitialState,
  blogReducer,
} from '@/features/blog/reducer/blogReducer'
import {type BlogData} from '@/shared/types'
import {useUser} from '@/store/user'
import {createBrowserClient} from '@/supabase/client'

const FILE_MAX_SIZE = 1048576 // 1MB 제한
const supabase = createBrowserClient()

export const useBlogEdit = (blogData?: BlogData) => {
  const user = useUser(state => state.user)
  const router = useRouter()

  // Individual state for each form field
  const [title, setTitle] = useState(blogData?.title ?? '')
  const [imageUrl, setImageUrl] = useState(blogData?.titleImageUrl ?? '')
  const [content, setContent] = useState(blogData?.content ?? '')
  const [mainImageFile, setMainImageFile] = useState<File | null>(null)

  const [dialogConfig, dispatchDialog] = useReducer(
    blogReducer,
    blogInitialState,
  )

  // File validation
  const validateFile = (file: File): boolean => {
    if (file.size > FILE_MAX_SIZE) {
      dispatchDialog({
        isVisible: true,
        isError: true,
        message: '파일 용량은 1MB 이하만 허용됩니다.',
      })
      return false
    }
    return true
  }

  // Image upload
  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      if (!validateFile(file)) return null

      const {error} = await supabase.storage
        .from('images')
        .upload(file.name, file, {cacheControl: '0', upsert: true})

      if (error) throw new Error('이미지 업로드에 실패했습니다.')

      const {data: publicUrlData} = supabase.storage
        .from('images')
        .getPublicUrl(file.name)

      return publicUrlData?.publicUrl ?? null
    } catch (err) {
      dispatchDialog({
        isVisible: true,
        isError: true,
        message: '이미지 업로드에 실패했습니다.',
      })
      return null
    }
  }

  // Handle main image change
  const handleMainImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files) {
      const file = event.target.files[0]
      if (!validateFile(file)) return

      setMainImageFile(file)
      setImageUrl(URL.createObjectURL(file))
    }
  }

  // Handle image drop in editor
  const handleImageDropInEditor = async (
    event: React.DragEvent<HTMLDivElement>,
  ) => {
    event.preventDefault()
    if (event.dataTransfer.files) {
      const file = event.dataTransfer.files[0]
      if (!validateFile(file)) return

      const uploadedImageUrl = await uploadImage(file)
      if (uploadedImageUrl) {
        setContent(prev => `${prev}\n![이미지](${uploadedImageUrl})\n`)
      }
    }
  }

  // Create or edit blog post
  const handleEdit = async () => {
    try {
      let finalImageUrl = imageUrl

      // Upload main image if it was changed
      if (mainImageFile) {
        const uploadedImageUrl = await uploadImage(mainImageFile)
        if (uploadedImageUrl) finalImageUrl = uploadedImageUrl
      }

      const blogPayload = {
        title,
        content,
        imageUrl: finalImageUrl,
      }

      if (blogData) {
        await editBlog({id: blogData.id, ...blogPayload})
        dispatchDialog({
          isVisible: true,
          isError: false,
          message: '게시글이 성공적으로 수정되었습니다.',
        })
      } else {
        await createBlog({id: user?.id ?? '', ...blogPayload})
        dispatchDialog({
          isVisible: true,
          isError: false,
          message: '게시글이 성공적으로 등록되었습니다.',
        })
        router.push('/blog')
      }
    } catch (err) {
      dispatchDialog({
        isVisible: true,
        isError: true,
        message: '게시물을 등록/수정할 수 없습니다.',
      })
    }
  }

  return {
    formData: {title, imageUrl, content},
    setTitle,
    setContent,
    setDialogConfig: dispatchDialog,
    handleMainImageChange,
    handleImageDropInEditor,
    handleEdit,
    dialogConfig,
  }
}
