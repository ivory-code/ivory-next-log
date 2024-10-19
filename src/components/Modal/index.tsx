'use client'

import {twMerge} from 'tailwind-merge'

import IconButton from '@/components/IconButton'

type ModalProps = {
  className?: string
  classWrap?: string
  isVisible: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal = ({
  className,
  classWrap,
  isVisible,
  children,
  onClose,
}: ModalProps) => {
  if (isVisible) {
    return (
      <div
        className={twMerge(
          `fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 ${className}`,
        )}>
        <div
          className={twMerge(
            `relative z-10 max-w-[48rem] w-full m-auto bg-white max-h-[90vh] rounded-3xl ${classWrap} overflow-auto`,
          )}>
          <div className="flex flex-row-reverse">
            <IconButton
              buttonClassName="bg-transparent hover:bg-transparent"
              iconName="close"
              onClick={onClose}
            />
          </div>
          {children}
        </div>
      </div>
    )
  }
  return null
}

export default Modal
