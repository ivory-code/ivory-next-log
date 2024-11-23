import MDEditor from '@uiw/react-md-editor'
import {useState} from 'react'

import ImageUploader from '@/features/blog/components/ImageUploader'
import InputField from '@/features/blog/components/InputField'
import {useBlogEdit} from '@/features/blog/hooks/useBlogEdit'
import Button from '@/shared/components/Button'
import Dialog from '@/shared/components/Dialog'
import Typography from '@/shared/components/Typography'
import {type BlogData} from '@/shared/types'

interface Props {
  blogData?: BlogData
  refetchBlogs?: () => void
}

const BlogEdit = ({blogData, refetchBlogs}: Props) => {
  const {
    formData,
    setTitle,
    setContent,
    handleMainImageChange,
    handleImageDropInEditor,
    handleEdit,
    dialogConfig,
    setDialogConfig,
  } = useBlogEdit(blogData)

  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const handleSave = () => {
    setDialogConfig({
      isVisible: true,
      isError: false,
      message: blogData
        ? '게시글을 수정하시겠습니까?'
        : '게시글을 등록하시겠습니까?',
    })
  }

  const handleConfirm = async () => {
    try {
      await handleEdit()
      setDialogConfig({isVisible: false, isError: false, message: ''})

      const successMessage = blogData
        ? '게시글이 성공적으로 수정되었습니다.'
        : '게시글이 성공적으로 등록되었습니다.'
      setStatusMessage(successMessage)

      if (blogData) {
        refetchBlogs?.() // 블로그 리스트 리페치
      }
    } catch {
      setDialogConfig({isVisible: false})
      setStatusMessage('게시글 저장에 실패했습니다.')
    }
  }

  return (
    <div className="flex flex-col h-full p-4 overflow-auto">
      {/* 상단 버튼 */}
      <div className="flex justify-end items-center h-18">
        <Button onClick={handleSave} className="border border-gray-300">
          <Typography
            text={blogData ? '게시글 수정' : '게시글 등록'}
            className="base2"
          />
        </Button>
      </div>

      {/* 상태 메시지 */}
      {statusMessage && (
        <div
          className={`p-4 mb-4 ${
            statusMessage.includes('실패')
              ? 'text-red-800 bg-red-200'
              : 'text-green-800 bg-green-200'
          }`}>
          <Typography text={statusMessage} className="base2" />
        </div>
      )}

      {/* 제목 입력 필드 */}
      <InputField
        label="제목"
        name="title"
        value={formData.title}
        placeholder="제목을 입력해주세요."
        onChange={e => setTitle(e.target.value)}
      />

      {/* 이미지 업로더 */}
      <ImageUploader
        label="메인 이미지 수정"
        onImageChange={handleMainImageChange}
        imageUrl={formData.imageUrl}
      />

      {/* 에디터 영역 */}
      <div
        className="flex flex-col mb-4"
        onDrop={handleImageDropInEditor}
        onDragOver={e => e.preventDefault()}>
        <h2 className="text-xl font-bold mb-2">내용</h2>
        <MDEditor
          value={formData.content}
          onChange={value => setContent(value || '')}
          style={{minHeight: '500px'}}
          preview="live"
          visibleDragbar
        />
      </div>

      {/* 다이얼로그 */}
      <Dialog
        isVisible={dialogConfig.isVisible}
        isError={dialogConfig.isError}
        message={dialogConfig.message}
        onConfirm={handleConfirm}
        onCancel={() => setDialogConfig({isVisible: false})}
      />
    </div>
  )
}

export default BlogEdit
