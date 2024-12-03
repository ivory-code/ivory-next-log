import {forwardRef, useCallback, useImperativeHandle, useState} from 'react'

import BlogEdit from '@/features/blog/components/BlogEdit'
import Modal from '@/shared/components/Modal'
import {type BlogData} from '@/shared/types'

interface BlogEditModalProps {
  blogData: BlogData | undefined
  refetchBlogs: () => void
}

export interface BlogEditModalRef {
  openModal: () => void
}

const BlogEditModal = forwardRef<BlogEditModalRef, BlogEditModalProps>(
  ({blogData, refetchBlogs}, ref) => {
    const [isModalVisible, setIsModalVisible] = useState(false)

    const handleCloseModal = useCallback(() => {
      setIsModalVisible(false)
      refetchBlogs()
    }, [refetchBlogs])

    useImperativeHandle(ref, () => ({
      openModal() {
        setIsModalVisible(true)
      },
    }))

    return (
      <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
        <BlogEdit blogData={blogData} />
      </Modal>
    )
  },
)

BlogEditModal.displayName = 'BlogEditModal'

export default BlogEditModal
