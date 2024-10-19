'use client'

import axios from 'axios'
import {useCallback, useEffect, useState} from 'react'

import {createProfile} from '@/app/api/createProfile'
import {editProfile} from '@/app/api/editProfile'
import Button from '@/components/Button'
import Image from '@/components/Image'
import InputField from '@/components/InputField'
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

  const [formState, setFormState] = useState({
    mainTitle: '',
    subTitle: '',
    content: '',
    imageUrl: '',
  })

  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {name, value} = e.target
    setFormState(prevState => ({...prevState, [name]: value}))
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0]
      setImageFile(file)

      // 이미지 미리보기 URL 생성
      const previewUrl = URL.createObjectURL(file)
      setFormState(prevState => ({...prevState, imageUrl: previewUrl}))
    }
  }

  const fetchProfileData = useCallback(async () => {
    try {
      const {data} = await axios.get('/api/EditProfile')
      if (data.profileData[0]) {
        const {mainTitle, subTitle, contents, imageUrl} = data.profileData[0]
        setFormState({
          mainTitle: mainTitle || '',
          subTitle: subTitle || '',
          content: contents || '',
          imageUrl: imageUrl || '',
        })
        setProfileData(data.profileData[0])
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching profile data:', error)
    }
  }, [])

  const uploadImage = useCallback(async () => {
    if (!imageFile) return formState.imageUrl

    const {error} = await supabase.storage
      .from('images')
      .upload(imageFile.name, imageFile, {cacheControl: '0', upsert: true})

    if (error) {
      // eslint-disable-next-line no-console
      console.error('Error uploading image:', error)
      return formState.imageUrl
    }

    const {data: publicUrlData} = supabase.storage
      .from('images')
      .getPublicUrl(imageFile.name)

    return publicUrlData?.publicUrl || formState.imageUrl
  }, [imageFile, formState.imageUrl, supabase])

  const handleSaveProfile = useCallback(async () => {
    const uploadedImageUrl = await uploadImage()

    const profilePayload = {
      role: user?.role ?? '',
      contents: formState.content,
      mainTitle: formState.mainTitle,
      subTitle: formState.subTitle,
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
    formState.content,
    formState.mainTitle,
    formState.subTitle,
    profileData,
    uploadImage,
    user?.role,
  ])

  useEffect(() => {
    fetchProfileData()
  }, [fetchProfileData])

  return (
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

        <InputField
          label="제목"
          name="mainTitle"
          value={formState.mainTitle}
          onChange={handleChange}
        />

        <InputField
          label="부제목"
          name="subTitle"
          value={formState.subTitle}
          onChange={handleChange}
        />

        <div className="flex flex-row">
          <div className="mt-4 w-4/5 mr-2">
            <h2 className="text-xl font-bold mb-2">내용</h2>
            <Textarea
              name="content"
              value={formState.content}
              onChange={handleChange}
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
              {formState.imageUrl && (
                <div className="mt-2 flex justify-center items-center">
                  <Image
                    src={formState.imageUrl}
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
  )
}

export default EditProfilePage
