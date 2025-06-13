import { simpleBlogCard } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import Image from "next/image";

async function getData() {
  const query = `*[_type == 'blog'] | order(_createdAt desc){
  title,
    smallDescription,
    "currentSlug": slug.current,
    "titleImage": titleImage.asset._ref
}`

const data: simpleBlogCard[] = await client.fetch(query)
return data
}


export default async function Home() {

  const data = await getData();
  console.log(data)
  return (
    <div>
      {data.map((post: simpleBlogCard, i) => (
        <Card key={i}>
          <img src={urlFor(post.titleImage).url()} alt={post.title} width={200} height={200}/>
          <CardContent>
            <h1>{post.title}</h1>
            <p>{post.smallDescription}</p>
            <Button asChild>
              <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
