import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Icon } from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BLOG_POSTS } from "@/lib/page-defaults";

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: `${post.title} — SteamWriterAi`, description: post.excerpt },
    twitter: { card: "summary_large_image", title: `${post.title} — SteamWriterAi`, description: post.excerpt },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="pb-20">
      <section className="pt-16 sm:pt-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Button asChild variant="ghost" size="sm" className="mb-6">
            <Link href="/blog">
              <ArrowLeft className="size-4" /> Back to blog
            </Link>
          </Button>

          <div
            className={`relative mb-10 flex h-64 items-center justify-center rounded-2xl bg-gradient-to-br ${post.gradient}`}
          >
            <Icon name={post.icon} className="size-20 text-white opacity-90" />
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="secondary">{post.category}</Badge>
            <span className="text-muted-foreground text-xs">{post.date}</span>
            <span className="text-muted-foreground text-xs">{post.readTime}</span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            {post.title}
          </h1>

          <div className="mt-10 space-y-10">
            {post.body.map((section, i) => (
              <div key={i}>
                {section.heading && (
                  <h2 className="mb-3 text-xl font-extrabold">
                    {section.heading}
                  </h2>
                )}
                <p className="text-muted-foreground leading-relaxed">
                  {section.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl bg-muted/40 px-8 py-10 text-center">
            <h3 className="text-xl font-extrabold">Ready to try SteamWriterAi?</h3>
            <p className="text-muted-foreground mt-2 text-sm">
              Start writing your next chapter with AI assistance.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/register">Create free account</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/pricing">See plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
