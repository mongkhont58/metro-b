import CarouselCustomNavigation from "@/components/CarouselCustomNavigation";
import { apiURL } from "@/constants";
import Link from "next/link";
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
        type: 'news',
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

interface Item {
  id: string,
  title: string,
  img: string,
}

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>): Promise<JSX.Element> {
  const slug = (await params).slug

  const [title, slide, list] = await Promise.all([
    fetch(apiURL + '/news/category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      },
      cache: 'no-store',
      body: JSON.stringify({ id: slug })
    }).then(res => res.json()),

    fetch(apiURL + '/news/slide', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      },
      cache: 'no-store',
    }).then(res => res.json()),

    fetch(apiURL + '/news/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      },
      cache: 'no-store',
      body: JSON.stringify({
        category_id: slug,
        limit: 12,
        offset: 0
      })
    }).then(res => res.json())
  ])

  return (
    <div>
      <div className='h-60 lg:h-[45rem]'>
        <CarouselCustomNavigation list={slide.list ?? []} />
      </div>
      <div className='flex flex-col items-center justify-center mt-8'>
        <div className="w-[95%] lg:w-[70rem] pb-5 lg:pb-10">
          <div className="text-center text-2xl mb-4 text-primary">{title?.data?.title}</div>
          <div className='grid lg:grid-cols-3 gap-4'>
            {list?.list?.length > 0 && list?.list?.map((item: Item, index: number) => (
              <div className='bg-white border rounded-3xl' key={'news_' + index}>
                <Link href={`/news/detail/${item.id}`}>
                  <Image width={5000} height={5000} src={item.img} alt={'news_' + index} className='w-full object-fill h-44 bg-black rounded-t-3xl' />
                  <div className='p-2 line-clamp-2 leading-loose h-20'>
                    {item.title}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
