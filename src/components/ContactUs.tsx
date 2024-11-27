'use client'
import { apiURL } from '@/constants'
import { NextPage } from 'next'
import { useState } from 'react'

const ContactUs: NextPage = () => {
  const [state, setState] = useState({
    fullname: '',
    email: '',
    detail: '',
    subject: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const submitData = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (!state.fullname || !state.email || !state.detail || !state.subject) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน')
      return
    }

    const res = await fetch(apiURL + '/contact-us/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      },
      cache: 'no-store',
      body: JSON.stringify(state)
    })

    const data = await res.json()

    if (data.status === 'success') {
      window.location.reload()
    }
  }

  return (
    <div>
      <div className="mt-4">
        <textarea className="w-full border rounded-lg" placeholder="Enter Message" rows={4} name="detail" onChange={(e) => setState(prevState => ({ ...prevState, detail: e.target.value }))} />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <input className="w-full border rounded-lg" placeholder="Enter Your Name" name="fullname" onChange={handleChange} />
        </div>
        <div>
          <input className="w-full border rounded-lg" placeholder="Email" name="email" onChange={handleChange} />
        </div>
      </div>
      <div className="mt-4">
        <input className="w-full border rounded-lg" placeholder="Enter Subject" name="subject" onChange={handleChange} />
      </div>
      <button
        className="w-full mt-4 bg-red-300 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-lg"
        onClick={submitData}
      >
        ส่งข้อมูล
      </button>
    </div>
  )
}

export default ContactUs