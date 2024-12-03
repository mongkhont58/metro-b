'use client';
import type { NextPage } from 'next';
import CarouselCustomNavigation from "@/components/CarouselCustomNavigation";
import { apiURL } from "@/constants";
import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Slide {
  img: string;
  link: string;
}

interface List {
  id: number;
  link: string;
  detail: string | TrustedHTML;
  list: {
    id: number; title: string, link: string, img: string
  }[];
  title: ReactNode;
  img: string | undefined;
  type: 'news' | 'ita' | 'law' | 'police' | 'qna' | 'other';
  data: { [key: string]: string | number | boolean };
}

const Home: NextPage = () => {
  const [data, setData] = useState<null | { slide: Slide[], list: List[] }>(null)

  useEffect(() => {
    fetchData()
      .then(res => setData(res.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const fetchData = async () => {
    const res = await fetch(apiURL + '/home/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      },
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return await res.json();
  }

  return (
    <div>
      {data?.slide &&
        <div className='h-60 lg:h-[45rem]'>
          <CarouselCustomNavigation list={data.slide} />
          <div>
            123
          </div>
        </div>
      }
      <div className='flex flex-col items-center justify-center gap-5 lg:gap-10 pb-5 lg:pb-10 mt-8'>
        {data?.list && data?.list.length > 0 && data?.list.map((item, i) => {
          if ((item.type as string) === 'banner') {
            if (item.img) {
              return (
                <div className="flex flex-col items-center justify-center" key={'banner_' + i}>
                  <div className='px-0 pt-4 lg:w-[70rem] '>
                    <Link href={item.link} target='_blank'>
                      <Image
                        src={item.img}
                        width={5000}
                        height={5000}
                        alt="banner-ita"
                        className='w-full'
                      />
                    </Link>
                  </div>
                </div>
              )
            }
          } else if (item.type === 'news') {
            if (item?.list?.length === 0) {
              return
            }

            return (
              <div className='flex flex-col items-center justify-center' key={'news_' + i}>
                <div className="w-[95%] lg:w-[70rem] ">
                  <div className="text-center text-2xl mb-4 text-primary">{item.title}</div>
                  <div className='grid lg:grid-cols-3 gap-4'>
                    {item.list.map((list, listIndex: number) => (
                      <Link href={`/news/detail/${list.id}`} key={'news_' + listIndex}>
                        <div className='bg-white border rounded-3xl' >
                          {list.img && <Image width={5000} height={5000} src={list.img} alt={'news_' + listIndex} className='w-full object-fill h-44 bg-black rounded-t-3xl' />}
                          <div className='p-2 line-clamp-2 leading-loose h-20'>
                            {list.title}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )
          } else if ((item.type as string) === 'info') {
            return (
              <div className="w-[95%] lg:w-[70rem] p-4 lg:p-10 bg-white border rounded-3xl" key={'info_' + i}>
                <div className="text-center text-2xl mb-4">{item.title}</div>
                <div dangerouslySetInnerHTML={{ __html: item.detail }} />
              </div>
            )
          } else if ((item.type as string) === 'content') {
            if (item?.list?.length === 0) {
              return
            }

            return (
              <div className='flex flex-col items-center justify-center' key={'content_' + i}>
                <div className="w-[95%] lg:w-[70rem] ">
                  <div className="text-center text-2xl mb-4 text-primary">{item.title}</div>
                  <div className='grid lg:grid-cols-3 gap-4'>
                    {item.list.map((list, listIndex: number) => (
                      <Link href={`/content/detail/${list.id}`} key={'content_' + listIndex}>
                        <div className='bg-white border rounded-3xl' >
                          {list.img && <Image width={5000} height={5000} src={list.img} alt={'content_' + listIndex} className='w-full object-fill h-44 bg-black rounded-t-3xl' />}
                          <div className='p-2 line-clamp-2 leading-loose h-20'>
                            {list.title}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )
          }
        })}
      </div>
    </div>
  );
}

export default Home;

