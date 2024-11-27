'use client'
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

interface ClientModalProps {
  info: Data
}

interface Data {
  data: PopupData
}

interface PopupData {
  popup: Popup
}

interface Popup {
  status: number
  img: string
  link: string
}

const ClientModal: FC<ClientModalProps> = ({ info }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const expiredAt = localStorage.getItem('modal-expiredAt')
    const now = Date.now()
    const hasExpired = expiredAt ? now > Number(expiredAt) : true
    if (hasExpired) {
      localStorage.removeItem('modal-expiredAt')
      setShow(true)
    } else {
      setShow(false)
    }
  }, [])

  const handleClose = () => {
    localStorage.setItem('modal-expiredAt', JSON.stringify(Date.now() + 1000 * 60 * 60 * 24))
    setShow(false)
  }

  if (!show || info?.data?.popup?.status !== 1) {
    return null
  }

  return (
    <button className="fixed z-[51] inset-0 bg-black bg-opacity-60 overflow-y-auto h-full w-full flex items-center justify-center" onClick={handleClose}>
      <div className="text-center flex flex-col gap-4 justify-around w-[80%] lg:w-[40%] lg:min-w-[35rem] relative">
        <Link href={info?.data?.popup?.link} className="px-4 py-2 text-white rounded">
          <Image width={5000} height={5000} src={info?.data?.popup?.img} alt='popup_img' className="w-full h-full object-contain" />
        </Link>
      </div>
    </button>
  )
}

export default ClientModal;
