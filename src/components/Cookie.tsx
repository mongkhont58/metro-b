'use client'
import { NextPage } from 'next'
import React, { useEffect } from 'react';

const Cookie: NextPage = () => {
  const [hideCookie, setHideCookie] = React.useState<boolean>(true)

  useEffect(() => {
    const cookieStorage = localStorage.getItem('laksong-cookie-accepted');
    if (cookieStorage) {
      setHideCookie(JSON.parse(cookieStorage))
    } else {
      setHideCookie(false)
    }
  }, [])

  const handleAccept = () => {
    setHideCookie(true);
    localStorage.setItem('laksong-cookie-accepted', JSON.stringify(true));
  }

  const handleDecline = () => {
    setHideCookie(true)
  }

  if (hideCookie) {
    return null;
  }

  return (
    <div className='bg-black bg-opacity-50 w-[100vw] h-24 flex items-center justify-center gap-4 pr-24 pl-4'>
      <div className='text-white text-xl'>
        เว็บไซต์เราใช้คุกกี้เพื่อเพิ่มประสิทธิภาพในการให้บริการ และส่งมอบประสบการณ์ที่ดีสุดในการใช้งานเว็บไซต์แก่คุณ หากคุณดำเนินการต่อ หรือปิดข้อความนี้ลง เราถือว่าคุณยอมรับการใช้งานคุกกี้
      </div>
      <button className='bg-white text-black px-4 py-2 rounded' onClick={handleAccept}>ตกลง</button>
      <button className='bg-white text-black px-4 py-2 rounded' onClick={handleDecline}>ปฏิเสธ</button>
    </div>
  )
}

export default Cookie