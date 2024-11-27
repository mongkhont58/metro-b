import { apiURL } from "@/constants"
import ITAPage from "@/components/ITAPage"
import { Metadata } from "next";

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
        type: 'ita',
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
}>) {
  const slug = (await params).slug;
  const res = await fetch(apiURL + '/ita/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    },
    cache: 'no-store',
    body: JSON.stringify({ id: slug }),
  });

  const data = await res.json();

  return (
    <div>
      <ITAPage data={data?.data} />
    </div>
  );
}

