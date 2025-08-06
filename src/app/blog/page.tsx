import fs from "fs";
import path from "path";
import { type ReactElement } from "react";
import { Container } from "@/components/ui/container";
import Image from "next/image";
import { LinkedInSubscribe } from "@/components/ui/linkedin-subscribe";
import Link from "next/link";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  description: string;
  image: string;
  repost?: boolean;
}

function getPostMetadata(filename: string): BlogPost | null {
  try {
    const filePath = path.join(process.cwd(), "src/content/blog", filename);
    const fileContent = fs.readFileSync(filePath, "utf8");

    // Basic frontmatter parsing
    const [, frontmatter] = fileContent.split("---");
    const metadata = Object.fromEntries(
      frontmatter
        .trim()
        .split("\n")
        .map((line) => {
          const [key, ...valueParts] = line.split(":");
          const value = valueParts
            .join(":")
            .trim()
            .replace(/^"(.+)"$/, "$1");
          return [key.trim(), value];
        }),
    );

    return {
      slug: filename.replace(/\.md$/, ""),
      title: metadata.title,
      date: metadata.date,
      author: metadata.author,
      category: metadata.category,
      description: metadata.description,
      image: metadata.image,
      repost: metadata.repost === "true",
    };
  } catch {
    return null;
  }
}

function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(path.join(process.cwd(), "src/content/blog"));
  return files
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => getPostMetadata(filename))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export const metadata = {
  title: "The AI Transformation Toolkit",
  description:
    "Essential strategies and insights for smooth AI adoption in your organization",
};

export default function BlogPage(): ReactElement {
  const posts = getAllPosts();

  return (
    <Container className="py-24 sm:py-32">
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-aitt-blue sm:text-5xl">
            The AI Transformation Toolkit
          </h1>
          <p className="mt-2 text-lg leading-8 text-white">
            Essential Strategies for Smooth AI Adoption
          </p>
          <div className="mt-4 flex flex-col items-center space-y-2">
            <p className="text-base text-white">By Cian Whalley, MBA</p>
            <p className="text-sm text-white/80">
              AI/ML Strategy Executive | Fractional CTO | Digital Transformation
              Leader | Technology M&A Advisor
            </p>
            <p className="text-sm text-white/80">
              Founder of Athyna Insight Inc. | Bridging Enterprise
              AI Innovation with Business Outcomes
            </p>
            <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-white/70">
              <span>Published monthly</span>
              <span>•</span>
              <span>179 subscribers</span>
              <span>•</span>
              <LinkedInSubscribe />
            </div>
          </div>
        </div>

        <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="relative isolate flex flex-col gap-8 lg:flex-row"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="relative aspect-[16/9] sm:aspect-[16/9] lg:w-96 lg:shrink-0 group"
              >
                <div className="relative w-full h-full transition-transform group-hover:scale-[1.02]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="absolute inset-0 rounded-2xl bg-gray-50 object-cover transition-all group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
                </div>
              </Link>
              <div>
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.date} className="text-white/70">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="relative z-10 rounded-full bg-white/10 px-3 py-1.5 font-medium text-white hover:bg-white/20"
                  >
                    {post.category}
                  </Link>
                  {post.repost && (
                    <span className="relative z-10 rounded-full bg-blue-500/30 px-3 py-1.5 font-medium text-white">
                      Repost
                    </span>
                  )}
                </div>
                <div className="group relative max-w-xl">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-aitt-blue transition-colors group-hover:text-white">
                    <Link href={`/blog/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-5 text-sm leading-6 text-white/80">
                    {post.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Container>
  );
}
