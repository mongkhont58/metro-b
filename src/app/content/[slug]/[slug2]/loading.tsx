import Image from "next/image";
import profilePic from "../../../../../public/images/logo.png";

export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 relative">
      <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-gray-900" />
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-7">
        <Image
          loading="eager"
          src={profilePic}
          alt="loading-logo"
          width={60}
          height={60}
        />
      </div>
      <p className="mt-4">Loading...</p>
    </div>
  )
}
