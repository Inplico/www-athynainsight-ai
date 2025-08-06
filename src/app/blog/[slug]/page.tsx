import fs from "fs";
import path from "path";
import { type ReactElement } from "react";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { LinkedInSubscribe } from "@/components/ui/linkedin-subscribe";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import Link from "next/link";

interface BlogPost {
  title: string;
  date: string;
  author: string;
  category: string;
  description: string;
  content: string;
  image: string;
  repost?: boolean;
}

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(process.cwd(), "src/content/blog", `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, "utf8");

    // Basic frontmatter parsing
    const [, frontmatter, markdownContent] = fileContent.split("---");
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

    // Process markdown content
    const processedContent = await remark()
      .use(html)
      .use(remarkGfm)
      .process(markdownContent);
    const contentHtml = processedContent.toString();

    return {
      title: metadata.title,
      date: metadata.date,
      author: metadata.author,
      category: metadata.category,
      description: metadata.description,
      image: metadata.image,
      content: contentHtml,
      repost: metadata.repost === "true",
    };
  } catch {
    return null;
  }
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

function splitContentInHalf(content: string): [string, string] {
  // Split by closing tags but keep the tags in the result
  const paragraphs = content.split(/(?=<\/p>|<\/h[1-6]>)/);
  const midPoint = Math.ceil(paragraphs.length / 2);

  const firstHalf = paragraphs.slice(0, midPoint).join("");
  const secondHalf = paragraphs.slice(midPoint).join("");

  return [firstHalf, secondHalf];
}

export default async function BlogPost({
  params,
}: PageProps): Promise<ReactElement> {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const [firstHalf, secondHalf] = splitContentInHalf(post.content);

  return (
    <>
      <div className="relative bg-gray-900 py-12 sm:py-16">
        <div className="absolute inset-0 bg-gray-900/80" />
        <Container className="relative">
          <div className="mx-auto w-[80%] aspect-[16/9] overflow-hidden rounded-3xl">
            <Image
              src={post.image}
              alt={post.title}
              width={1280}
              height={720}
              className="w-full object-cover"
              priority
            />
          </div>

          <div className="mt-6">
            <div className="flex items-center gap-x-4 text-sm">
              <time dateTime={post.date} className="text-white">
                {new Date(post.date).toLocaleString("en-US", {
                  timeZone: "UTC",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className="text-white">•</span>
              <span className="rounded-full bg-white/20 px-3 py-1.5 font-medium text-white">
                {post.category}
              </span>
              {post.repost && (
                <>
                  <span className="text-white">•</span>
                  <span className="rounded-full bg-blue-500/30 px-3 py-1.5 font-medium text-white">
                    Repost
                  </span>
                </>
              )}
            </div>
            <h1 className="mt-3 text-5xl font-bold tracking-tight text-aitt-blue sm:text-6xl">
              {post.title}
            </h1>
            <p className="mt-3 text-xl text-white max-w-3xl">
              {post.description}
            </p>
            <p className="mt-4 text-lg text-white/80">
              By {post.author}
              <span className="mx-4">•</span>
              <LinkedInSubscribe />
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-12 sm:py-16">
        <article className="prose prose-lg prose-invert mx-auto">
          <div
            className="prose-headings:text-aitt-blue prose-p:text-white/90 prose-strong:text-white prose-a:text-aitt-blue hover:prose-a:text-white prose-ul:text-white prose-li:text-white prose-li:marker:text-aitt-blue"
            dangerouslySetInnerHTML={{ __html: firstHalf }}
          />

          {/* Mid-article subscription */}
          <div className="my-16 rounded-xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-blue-500/20 p-8 backdrop-blur-md not-prose relative overflow-hidden group">
            {/* Animated gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 opacity-20 group-hover:opacity-30 transition-opacity" />

            {/* Glow effect */}
            <div className="absolute -inset-px bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 opacity-20 blur-sm group-hover:opacity-30 transition-opacity" />

            <div className="relative text-center">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-3">
                Enjoying this article? Get more insights like this.
              </h3>
              <p className="text-gray-300 mb-8 text-lg">
                Join our community of technology leaders on LinkedIn for regular
                updates on AI adoption, digital transformation, and tech
                leadership.
              </p>
              <div className="flex justify-center">
                <LinkedInSubscribe className="scale-125 hover:scale-130 transition-transform" />
              </div>
            </div>
          </div>

          <div
            className="prose-headings:text-aitt-blue prose-p:text-white/90 prose-strong:text-white prose-a:text-aitt-blue hover:prose-a:text-white prose-ul:text-white prose-li:text-white prose-li:marker:text-aitt-blue"
            dangerouslySetInnerHTML={{ __html: secondHalf }}
          />
        </article>

        <div className="mt-16 flex items-center justify-center gap-x-4">
          <span className="text-lg text-white/80">Enjoyed this article?</span>
          <LinkedInSubscribe className="text-base" />
        </div>

        <div className="mt-16 rounded-xl bg-gray-900/50 p-8 backdrop-blur max-w-2xl mx-auto">
          <Link href="/blog" className="block group">
            <div className="flex items-center gap-8">
              <div className="relative w-32 h-32 shrink-0 transition-transform group-hover:scale-[1.02]">
                <Image
                  src="/images/blog/AITT Logo-transparent.png"
                  alt="AI Transformation Toolkit Newsletter"
                  fill
                  className="object-contain transition-all group-hover:brightness-110"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-100 transition-colors group-hover:text-blue-400">
                  Read More Articles
                </h3>
                <p className="mt-2 text-gray-400">
                  Explore more insights on AI adoption, digital transformation,
                  and tech leadership in the AI Transformation Toolkit
                  Newsletter.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </Container>
    </>
  );
}
