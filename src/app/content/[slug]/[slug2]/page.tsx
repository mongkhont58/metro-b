import { apiURL } from "@/constants";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";

export const generateMetadata = async ({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>): Promise<Metadata> => {
  const { slug } = await params;
  const res = await fetch(apiURL + `/info/seo`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      },
      cache: 'no-store',
      body: JSON.stringify({
        type: 'content',
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

interface List {
  id: number;
  title: string;
  img: string;
  link: string;
  detail: string;
}

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ slug: string, slug2: string }>;
}>): Promise<JSX.Element> {
  const { slug, slug2 } = await params;

  const [titleResponse, listResponse] = await Promise.all([
    fetch(apiURL + '/content/sub-category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      },
      cache: 'no-store',
      body: JSON.stringify({ id: slug2 })
    }),
    fetch(apiURL + '/content/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      },
      cache: 'no-store',
      body: JSON.stringify({
        category_id: slug,
        sub_category_id: slug2,
        limit: 12,
        offset: 0,
      })
    })
  ])

  const title = await titleResponse.json();
  const { list } = await listResponse.json();

  return (
    <div>
      <div className='flex flex-col items-center justify-center my-8'>
        <div className="w-[95%] lg:w-[70rem]">
          <div className="text-center text-2xl mb-4 text-primary">{title?.data?.title}</div>
          <div className='grid lg:grid-cols-3 gap-4'>
            {list?.length > 0 && list?.map((list: List, listIndex: number) => (
              <div className='bg-white border rounded-3xl' key={'news_' + listIndex}>
                {list.img && <Image width={5000} height={5000} src={list.img} alt={'news_' + listIndex} className='w-full object-fill h-44 bg-black rounded-t-3xl' />}
                <Link href={`/content/detail/${list.id}`}>
                  <div className='p-4'>
                    {list.title}
                  </div>
                </Link>
              </div>
            ))}
          </div>
          {list?.length === 0 && <div className='bg-white border rounded-3xl p-4 text-2xl h-44 flex items-center justify-center'>ไม่พบข้อมูล</div>}
        </div>
      </div>
    </div>
  );
}
