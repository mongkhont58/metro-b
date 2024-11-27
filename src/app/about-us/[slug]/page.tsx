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
        type: 'about-us',
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
  const slug = (await params).slug;
  const res = await fetch(apiURL + `/about-us/get`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      },
      cache: 'no-store',
      body: JSON.stringify({ id: slug })
    }
  )

  const data = await res.json();

  return (
    <div className="flex flex-col items-center justify-center py-5">
      <div className="w-[95%] lg:w-[70rem] bg-white p-10 border rounded-3xl">
        <div className="text-center text-2xl mb-4">{data?.data?.title}</div>
        <div dangerouslySetInnerHTML={{ __html: data?.data?.detail }} />
        {data?.data?.img?.length > 0 &&
          <div className="w-full grid lg:grid-cols-3 gap-4 mt-4">
            {data?.data?.img?.map((image: string, index: number) => (
              <Image className="w-full" width={5000} height={5000} src={image} alt={"laksong_" + index} key={"laksong_" + index} />
            ))
            }
          </div>
        }
      </div>
    </div>
  );
}

