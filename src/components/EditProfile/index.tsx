'use client'

import axios from 'axios'
import {useCallback, useEffect, useState} from 'react'

import {createProfile} from '@/app/api/createProfile'
import {editProfile} from '@/app/api/editProfile'
import Button from '@/components/Button'
import {SKILLS, TOOLS} from '@/components/EditProfile/constants'
import Image from '@/components/Image'
import Input from '@/components/Input'
import Textarea from '@/components/Textarea'
import Typography from '@/components/Typography'
import {useUser} from '@/store/user'
import {createBrowserClient} from '@/supabase/client'
import {type ProfileData} from '@/templates/EditProfilePage'

const supabase = createBrowserClient()

const EditProfile = () => {
  const user = useUser(state => state.user)

  const [profileData, setProfileData] = useState<ProfileData | undefined>(
    undefined,
  )
  const [mainTitle, setMainTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>('')

  const handleChange = useCallback(
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
      (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setter(event.target.value),
    [],
  )

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0]
      setImageFile(file)
      setImageUrl(URL.createObjectURL(file))
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

  const fetchProfileData = useCallback(async () => {
    try {
      const {data} = await axios.get('/api/EditProfile')
      const profile = data.profileData[0]
      setProfileData(profile)
      setMainTitle(profile.mainTitle ?? '')
      setSubTitle(profile.subTitle ?? '')
      setContent(profile.contents ?? '')
      setImageUrl(profile.imageUrl ?? '')
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching profile data:', error)
    }
  }, [])

  const handleSaveProfile = useCallback(async () => {
    const uploadedImageUrl = imageFile ? await uploadImage(imageFile) : imageUrl

    if (!uploadedImageUrl) return

    const profilePayload = {
      role: user?.role ?? '',
      contents: content,
      mainTitle,
      subTitle,
      skills: SKILLS,
      tools: TOOLS,
      imageUrl: uploadedImageUrl,
    }

    const updatedProfile = profileData
      ? await editProfile(profilePayload)
      : await createProfile(profilePayload)

    if (updatedProfile) {
      setProfileData(updatedProfile)
    }
  }, [
    content,
    imageFile,
    imageUrl,
    mainTitle,
    profileData,
    subTitle,
    user?.role,
  ])

  useEffect(() => {
    fetchProfileData()
  }, [fetchProfileData])

  return (
    <div className="flex flex-col p-4">
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
          className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">부제목</h2>
        <Input
          value={subTitle}
          onChange={handleChange(setSubTitle)}
          className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex flex-row">
        <div className="mt-4 w-2/3 mr-2">
          <h2 className="text-xl font-bold mb-2">내용</h2>
          <Textarea
            value={content}
            onChange={handleChange(setContent)}
            className="w-full h-48 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="w-1/3">
          <div className="flex flex-col justify-between">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">메인 이미지</h2>
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
  )
}

export default EditProfile
