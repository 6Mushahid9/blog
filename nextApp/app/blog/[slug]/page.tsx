export const dynamic = 'force-dynamic';
import { Fullblog } from '@/lib/interface';
import { client, urlFor } from '@/lib/sanity';
import { PortableText } from 'next-sanity';
import React, { use } from 'react';

async function getData(slug: string) {
  const query = `*[_type == 'blog' && slug.current == $slug]{
    "currentSlug": slug.current,
    title,
    Content,
    "titleImage": titleImage.asset->url
  }[0]`;

  const data = await client.fetch(query, { slug });

  return data;
}

interface Props {
  params: {
    slug: string;
  };
}

export default async function BlogArticle({ params }: Props) {
  const { slug } = await params;
  const data: Fullblog = await getData(slug);
  console.log(data);

  return (
    <div>
      <h1>
        <span>Mushahid Khisal Blog</span> <span>{data.title}</span>
      </h1>
      <img src={urlFor(data.titleImage).url()} alt='blog image' height={100} width={100}/>
      <div>
        <PortableText value={data.Content}></PortableText>
      </div>
    </div>
  );
}