'use client'
import { NextPage } from 'next'
import { ReactNode } from 'react'

interface Props {
  info: {
    data: {
      footer: {
        email: ReactNode,
        tel: ReactNode,
        address: ReactNode,
        police_station: ReactNode,
        list: { title: string, list: { title: string, link: string }[] }[]
      }
    }
  }
}

const NavigateBarBottom: NextPage<Props> = ({ info }) => {
  const footer = info?.data?.footer ?? null
  return (
    <div className='p-5 lg:p-5 bg-[#f8fafe] grid gap-4'>
      <div className='flex flex-col lg:flex-row gap-8 justify-between'>
        {footer?.list?.map((item, index) => (
          <div className='flex-1' key={index + item.title}>
            <div className='text-xl mb-4'>{item.title}</div>
            <ul className="flex flex-col gap-2">
              {item.list.map((list, listIndex) => (
                <li key={index + listIndex}><a href={list.link} target="_blank" rel="noreferrer">{list.title}</a></li>
              ))}
            </ul>
          </div>
        ))}
        <div className='flex-1'>
          <div className='text-xl mb-4'>{footer?.police_station}</div>
          <div className="flex flex-col gap-2">
            <div>
              ที่อยู่: {footer?.address}
            </div>
            <div>
              เบอร์โทร: {footer?.tel}
            </div>
            <div>อีเมล์: <a href={`mailto:${footer?.email}`}>{footer?.email}</a></div>
          </div>
        </div>
      </div>
      <hr className='block' />
      <div className="text-center">Copyright &copy;2024 All rights reserved | Powered by <a href="https://www.idmaximum.com/" target="_blank" rel="noreferrer" className='text-[#ff656a]'>IDMAXIMUM</a></div>
    </div>
  )
}

export default NavigateBarBottom