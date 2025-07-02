import { simpleBlogCard } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const revalidate = 60;

async function getData() {
  const query = `*[_type == 'blog'] | order(_createdAt desc){
    title,
    smallDescription,
    "currentSlug": slug.current,
    "titleImage": titleImage.asset._ref
  }`;

  const data: simpleBlogCard[] = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data = await getData();

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Latest Blogs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((post: simpleBlogCard, i) => (
          <Card
            key={i}
            className="hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={urlFor(post.titleImage).url()}
              alt={post.title}
              className="w-full h-48 object-cover rounded-t-md"
            />
            <CardContent className="p-4 flex flex-col justify-between h-full space-y-3">
              <div className="flex flex-col flex-grow space-y-3">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {post.smallDescription}
                </p>
              </div>
              <Button asChild className="mt-auto w-1/3">
                <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
