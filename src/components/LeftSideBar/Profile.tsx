import Image from '@/components/Image'

const Profile = () => (
  <div className="mb-6">
    <div className="flex items-center justify-center">
      <div className="relative w-10 h-10">
        <Image
          className="rounded-full object-cover"
          src="/images/smileHeart.png"
          fill
          alt="profile"
        />
        <div className="absolute -right-0.75 -bottom-0.75 w-4.5 h-4.5 bg-primary-2 rounded-full border-4 border-n-6" />
      </div>
      <div className="text-n-3 font-extrabold text-base">khs-log</div>
    </div>
  </div>
)

export default Profile
