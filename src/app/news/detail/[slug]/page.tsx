import { apiURL } from "@/constants";
import { Metadata } from "next";
import Image from "next/image";

export const generateMetadata = async ({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>): Promise<Metadata> => {
  const slug = (await params).slug;
  const res = await fetch(apiURL + `/info/seo`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      },
      cache: 'no-store',
      body: JSON.stringify({
        type: 'news-detail',
        id: slug
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

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>): Promise<JSX.Element> {
  const slug = (await params).slug

  const response = await fetch(apiURL + '/news/detail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    },
    cache: 'no-store',
    body: JSON.stringify({ id: slug })
  })

  const { data } = await response.json()

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center py-5">
        <div className="w-[95%] lg:w-[70rem] p-4 lg:p-10 bg-white border rounded-3xl">
          <div className="text-center text-2xl mb-4">ไม่พบข้อมูล</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-5">
      <div className="text-center text-2xl mb-4 text-primary">{data?.category_name}</div>
      <div className="w-[95%] lg:w-[70rem] p-4 lg:p-10 bg-white border rounded-3xl">
        <div className="text-2xl mb-4">{data?.title}</div>
        <div className="text-xl mb-2">คำอธิบาย : {data?.description}</div>
        <div dangerouslySetInnerHTML={{ __html: data?.detail ?? '' }} />
        {data?.img &&
          <div className="w-full grid lg:grid-cols-3 gap-4 mt-4">
            <Image width={5000} height={5000} src={data?.img} alt={"laksong_"} />
          </div>
        }
      </div>
    </div>
  )
}

