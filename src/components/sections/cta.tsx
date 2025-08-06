import { type ReactElement } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/constants";
import Link from "next/link";
import type { Route } from "next";
import Image from "next/image";
import fs from "fs";
import path from "path";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  description: string;
  image: string;
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

export function CTA(): ReactElement {
  const latestPost = getAllPosts()[0];
  const blogPath = `/blog/${latestPost.slug}` as Route;
  const consultationPath = siteConfig.links.consultation as Route;

  return (
    <div className="relative py-24 overflow-hidden">
      {/* Background with sacred geometry pattern */}
      <div className="absolute inset-0 bg-gray-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ea580c,#fbbf24)] opacity-10" />
        <svg
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="sacred-geometry"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <path
                d="M25,0 L50,25 L25,50 L0,25 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-gray-700"
              />
              <circle
                cx="25"
                cy="25"
                r="12"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-gray-700"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sacred-geometry)" />
        </svg>
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500">
            Join the Compliance Revolution
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Be among the first to experience AI-powered building code compliance that saves hours 
            of research while ensuring 100% accuracy through expert validation.
          </p>

          {/* Blog index promotion */}
          <div className="mt-8 rounded-xl bg-gray-900/50 p-6 backdrop-blur">
            <Link href="/blog" className="block group">
              <div className="relative w-48 h-48 mx-auto mb-4 transition-transform group-hover:scale-[1.02]">
                <Image
                  src="/images/blog/AITT Logo-transparent.png"
                  alt="AI Transformation Toolkit Newsletter"
                  fill
                  className="object-contain transition-all group-hover:brightness-110"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-100 transition-colors group-hover:text-orange-400">
                Building Code AI Blog
              </h3>
              <p className="mt-2 text-gray-400">
                Learn how AI is revolutionizing regulatory compliance, from policy insights 
                to technical deep-dives on building code interpretation.
              </p>
            </Link>
          </div>

          {/* Latest blog preview */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-gray-100 mb-4">
              Read Our Latest Article
            </h3>
            <div className="rounded-xl bg-gray-900/50 p-6 backdrop-blur">
              <Link href={blogPath} className="block group">
                <div className="relative w-full h-48 mb-4 transition-transform group-hover:scale-[1.02]">
                  <Image
                    src={latestPost.image}
                    alt={latestPost.title}
                    fill
                    className="rounded-lg object-cover transition-all group-hover:brightness-110"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-100 transition-colors group-hover:text-orange-400">
                  {latestPost.title}
                </h3>
              </Link>
              <p className="mt-2 text-gray-400">{latestPost.description}</p>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg">
              <Link href={consultationPath}>Request Early Access</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={blogPath}>Read Latest Article</Link>
            </Button>
          </div>
        </div>

        {/* Trust quote */}
        <div className="mt-16 text-center italic text-gray-400 text-sm">
          &ldquo;We're not just building AI... we're building trust through expert validation, 
          policy authority, and proven domain expertise.&rdquo;
        </div>
      </Container>
    </div>
  );
}
