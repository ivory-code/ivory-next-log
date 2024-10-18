'use client'

import axios from 'axios'
import {useCallback, useEffect, useState} from 'react'

import {createProfile} from '@/app/api/createProfile'
import {editProfile} from '@/app/api/editProfile'
import Button from '@/components/Button'
import Image from '@/components/Image'
import Input from '@/components/Input'
import Layout from '@/components/Layout'
import Textarea from '@/components/Textarea'
import Typography from '@/components/Typography'
import {useUser} from '@/store/user'
import {createBrowserClient} from '@/supabase/client'
import {type Database} from '@/supabase/database.types'

const SKILLS = [
  {name: 'javascript', bg: 'bg-accent-6'},
  {name: 'react', bg: 'bg-accent-7'},
  {name: 'nextjs', bg: 'bg-n-2'},
  {name: 'graphql', bg: 'bg-accent-8'},
]

const TOOLS = [
  {name: 'github', bg: 'bg-n-2'},
  {name: 'googleAnalytics', bg: 'bg-accent-9'},
  {name: 'firebase', bg: 'bg-accent-10'},
  {name: 'figma', bg: 'bg-accent-11'},
]

const EditProfilePage = () => {
  const user = useUser(state => state.user)
  const supabase = createBrowserClient()

  const [profileData, setProfileData] =
    useState<Database['public']['Tables']['profile']['Row']>()

  const [mainTitle, setMainTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>('')

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(event.target.value)
    }

  // 이미지 파일이 변경될 때 실행되는 함수
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setImageFile(file)

      // 이미지 미리보기 URL 생성
      const previewUrl = URL.createObjectURL(file)
      setImageUrl(previewUrl)
    }
  }

  const fetchProfileData = useCallback(async () => {
    try {
      const res = await axios(`/api/EditProfile`)
      const data = await res.data.profileData[0]
      setProfileData(data)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching profile data:', error)
    }
  }, [])

  const handleSaveProfile = useCallback(async () => {
    let uploadedImageUrl = imageUrl

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
        const {data} = supabase.storage
          .from('images')
          .getPublicUrl(imageFile.name)
        uploadedImageUrl = data.publicUrl || ''
        setImageUrl(uploadedImageUrl)
      }
    }

    const profilePayload = {
      role: user?.role ?? '',
      contents: content,
      mainTitle: mainTitle,
      subTitle: subTitle,
      skills: SKILLS,
      tools: TOOLS,
      imageUrl: uploadedImageUrl,
    }

    const data = profileData
      ? await editProfile(profilePayload)
      : await createProfile(profilePayload)

    if (data) {
      setProfileData(data)
    }
  }, [
    content,
    imageFile,
    imageUrl,
    mainTitle,
    profileData,
    subTitle,
    supabase.storage,
    user?.role,
  ])

  useEffect(() => {
    void fetchProfileData()
  }, [fetchProfileData])

  useEffect(() => {
    if (profileData) {
      setMainTitle(profileData.mainTitle ?? '')
      setSubTitle(profileData.subTitle ?? '')
      setContent(profileData.contents ?? '')
      setImageUrl(profileData.imageUrl ?? '')
    }
  }, [profileData])

  return (
    <>
      <Layout isMainView>
        <div className="flex flex-col h-screen p-4">
          <div className="flex justify-end items-center h-18">
            <Button
              type="submit"
              onClick={handleSaveProfile}
              className="border border-gray-300">
              <Typography text="홈 추가/수정" className="base2" />
            </Button>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">제목</h2>
            <Input
              value={mainTitle}
              onChange={handleChange(setMainTitle)}
              className={
                'w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500'
              }
            />
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">부제목</h2>
            <Input
              value={subTitle}
              onChange={handleChange(setSubTitle)}
              className={
                'w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500'
              }
            />
          </div>
          <div className="flex flex-row">
            <div className="mt-4 w-4/5 mr-2">
              <h2 className="text-xl font-bold mb-2">내용</h2>
              <Textarea
                value={content}
                onChange={handleChange(setContent)}
                className="w-full h-48 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="w-1/5">
              <div className="flex flex-col justify-between">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-bold">이미지</h2>
                  <label
                    htmlFor="file-upload"
                    className="border border-gray-300 p-2 rounded-md shadow-sm cursor-pointer hover:bg-gray-100">
                    <Typography text="추가" className="base2" />
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
                {imageUrl && (
                  <div className="mt-2 flex justify-center items-center">
                    <Image
                      src={imageUrl}
                      alt="Uploaded"
                      className="max-w-full h-auto rounded-md"
                      width={140}
                      height={115}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default EditProfilePage
