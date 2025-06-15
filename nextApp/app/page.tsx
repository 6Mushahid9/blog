import { simpleBlogCard } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const revalidate = 60; // Revalidate every 60 seconds


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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {data.map((post: simpleBlogCard, i) => (
          <Card key={i} className="transform transition duration-300 ease-in-out hover:scale-101 hover:shadow-2xl">
            <img
              src={urlFor(post.titleImage).url()}
              alt={post.title}
              className="w-full object-cover rounded-t-md"
            />
            <CardContent className="p-4 space-y-3">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-muted-foreground text-sm">{post.smallDescription}</p>
              <Button asChild className="mt-2">
                <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
