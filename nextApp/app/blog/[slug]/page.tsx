export const dynamic = "force-dynamic";
import { Fullblog } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";
import { PortableText, PortableTextComponents } from "next-sanity";
import Image from "next/image"; // Import Next.js Image component for optimized images
import React from "react";

export const revalidate = 60; // Revalidate every 60 seconds

// Define your custom Portable Text components
const components: PortableTextComponents = {
  // Handle 'block' types (paragraphs, headings, blockquotes, etc.)
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold my-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold my-5">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-medium my-4">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-normal my-3">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-base leading-relaxed my-4">{children}</p>
    ),

    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 bg-blue-50 dark:bg-gray-800 dark:border-blue-400 text-gray-700 dark:text-gray-300 pl-5 pr-4 py-3 my-6 italic rounded-md overflow-hidden break-words">
        <div className="text-base leading-relaxed">{children}</div>
      </blockquote>
    ),
  },

  // Handle 'marks' (bold, italic, links, etc.)
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900 dark:text-gray-100">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="italic text-gray-700 dark:text-gray-300">{children}</em>
    ),
    underline: ({ children }) => (
      <u className="underline decoration-blue-500 underline-offset-2">
        {children}
      </u>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 dark:bg-gray-800 text-green-600 px-1 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    strike: ({ children }) => (
      <s className="line-through text-gray-500">{children}</s>
    ),
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-blue-600 dark:text-blue-400 underline underline-offset-4 hover:text-blue-800 transition-colors"
        >
          {children}
        </a>
      );
    },
  },

  // Handle 'list' types (bullet and numbered lists)
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc ml-6 my-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal ml-6 my-4">{children}</ol>
    ),
  },

  // Handle 'listItem' styles
  listItem: {
    bullet: ({ children }) => <li className="mb-2">{children}</li>,
    number: ({ children }) => <li className="mb-2">{children}</li>,
  },

  // Handle 'types' (custom block types like images, code, etc.)
  types: {
    // Assuming 'image' is a custom block type in your Sanity schema for inline images
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="my-8">
          <Image
            src={urlFor(value).width(800).url()} // Adjust width as needed for inline images
            alt={value.alt || " "}
            width={800}
            height={450} // Example height, adjust aspect ratio or use layout="responsive" if needed
            className="rounded-lg shadow-md mx-auto" // Center image
          />
          {value.caption && (
            <p className="text-sm text-gray-500 mt-2 text-center">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
    // If you have a custom 'code' block type
    code: ({ value }) => (
      <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-6">
        <code className="text-sm">{value.code}</code>
      </pre>
    ),
  },
};

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-4xl font-extrabold text-center mb-6">
        <span className="block text-gray-600 dark:text-gray-300">
          {data.title}
        </span>
      </h1>

      {data.titleImage && (
        <div className="text-center my-8">
          <img
            src={urlFor(data.titleImage).url()}
            alt="blog title image"
            // width="50%"
            className="rounded-lg shadow-xl object-cover mx-auto md:max-w-1/2 max-h-1/4"
          />
        </div>
      )}
      <div className="max-w-3xl mx-auto">
        <PortableText
          value={data.Content}
          components={components}
        ></PortableText>
      </div>
    </div>
  );
}
