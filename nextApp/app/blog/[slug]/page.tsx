import { client } from '@/lib/sanity';
import React from 'react'

async function getData(slug: string) {
  const query = `*[_type == 'blog' && slug.current == '${slug}']{
  "curretSlug": slug.current,
    title,
    content,
    "titleImage": titleImage.asset->url
}[0]`

  const data = await client.fetch(query);

  return data.result;
}

export default async function BlogArticle({params}:{params:{slug:string}}){
    const data = await getData(params.slug);
    console.log(data);
  return (
    <h1>Hello</h1>
  )
}
