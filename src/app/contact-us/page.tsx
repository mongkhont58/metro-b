import ContactUs from "@/components/ContactUs";
import { apiURL } from "@/constants";
import { EnvelopeIcon, HomeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  const res = await fetch(apiURL + `/info/seo`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      },
      cache: 'no-store',
      body: JSON.stringify({
        type: 'contact-us',
        id: ''
      })
    })

  const { data } = await res.json();
  const { google, facebook } = data ?? {};

  return {
    title: google?.title ?? " ",
    description: google?.description ?? " ",
    openGraph: {
      title: facebook?.title ?? " ",
      description: facebook?.description ?? " ",
      type: facebook?.type ?? 'website',
      url: facebook?.url ?? '',
      images: facebook?.images ?? [],
    },
  }
}

export default async function Page() {

  const res = await fetch(apiURL + '/contact-us/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    },
    cache: 'no-store',
  })

  const { data } = await res.json()

  return (
    <div className="flex flex-col items-center justify-center py-5">
      <div className="w-[95%] lg:w-[70rem] bg-white p-10 border rounded-3xl">
        <div className="text-center text-2xl mb-4">ติดต่อเรา</div>
        <div dangerouslySetInnerHTML={{ __html: data?.maps ?? '' }} className="w-full h-[30rem] flex justify-center" />
        <hr />
        <div className="mt-10">
          <div className="text-center text-2xl mb-4">{data?.police_station}</div>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <HomeIcon width={20} /> ที่อยู่: {data?.address}
          </div>
          <div className="flex items-center gap-2">
            <PhoneIcon width={20} /> เบอร์โทร: <a href={`tel:${data?.tel}`}>{data?.tel}</a>
          </div>
          <div className="flex items-center gap-2">
            <PhoneIcon width={20} /> เบอร์แฟกซ์: {data?.fax}
          </div>
          <div className="flex items-center gap-2">
            <EnvelopeIcon width={20} /> อีเมล์:<a href={`mailto:${data?.email}`} className="flex items-center gap-2">{data?.email}</a>
          </div>
        </div>
        <ContactUs />
      </div>
    </div>
  )
}
