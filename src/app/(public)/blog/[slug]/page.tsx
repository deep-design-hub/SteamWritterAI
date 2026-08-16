import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Tag,
} from "lucide-react";

import { Icon } from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BLOG_POSTS } from "@/lib/page-defaults";
import { BlogComments } from "./comments";

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

  const related = BLOG_POSTS.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 2);
  const fallbackRelated = related.length > 0 ? related : BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="pb-20">
      <section className="pt-12 sm:pt-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Button asChild variant="ghost" size="sm" className="mb-6">
            <Link href="/blog">
              <ArrowLeft className="size-4" /> Back to blog
            </Link>
          </Button>

          <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
            {/* Main article */}
            <article>
              {/* Hero image */}
              <div
                className={`relative mb-8 flex h-56 items-center justify-center rounded-2xl bg-gradient-to-br sm:h-72 ${post.gradient}`}
              >
                <Icon name={post.icon} className="size-16 text-white opacity-90 sm:size-20" />
                {/* Share overlay */}
                <div className="absolute right-4 top-4 flex gap-2">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-black/30 text-white backdrop-blur-sm">
                    <Share2 className="size-4" />
                  </span>
                </div>
              </div>

              {/* Meta row */}
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <Badge variant="secondary">
                  <Tag className="mr-1 size-3" />
                  {post.category}
                </Badge>
                <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
                  <Calendar className="size-3" />
                  {post.date}
                </span>
                <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
                  <Clock className="size-3" />
                  {post.readTime}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                {post.title}
              </h1>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3 border-b pb-6">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">SW</div>
                <div>
                  <p className="text-sm font-semibold">SteamWriterAi Team</p>
                  <p className="text-muted-foreground text-xs">Research writing experts</p>
                </div>
              </div>

              {/* Article body */}
              <div className="mt-8 space-y-8">
                {post.body.map((section, i) => (
                  <div key={i}>
                    {section.heading && (
                      <h2 className="mb-3 text-xl font-extrabold" id={`section-${i}`}>
                        {section.heading}
                      </h2>
                    )}
                    <p className="text-muted-foreground leading-relaxed">
                      {section.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-10 flex flex-wrap gap-2 border-t pt-6">
                <Badge variant="outline">Research Writing</Badge>
                <Badge variant="outline">Academic</Badge>
                <Badge variant="outline">{post.category}</Badge>
                <Badge variant="outline">SteamWriterAi</Badge>
              </div>

              {/* Share */}
              <div className="mt-8 flex items-center gap-3 rounded-xl border bg-muted/30 px-6 py-4">
                <Share2 className="text-muted-foreground size-4" />
                <span className="text-sm font-medium">Share this article</span>
                <div className="ml-auto flex gap-2">
                  <Button variant="outline" size="icon" className="size-8" asChild>
                    <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent("https://steamwriterai.com/blog/" + post.slug)}`} target="_blank" rel="noopener noreferrer">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" className="size-8" asChild>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://steamwriterai.com/blog/" + post.slug)}`} target="_blank" rel="noopener noreferrer">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" className="size-8" asChild>
                    <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent("https://steamwriterai.com/blog/" + post.slug)}&title=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                    </a>
                  </Button>
                </div>
              </div>

              {/* Comments */}
              <BlogComments />

              {/* CTA */}
              <div className="mt-16 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-600/10 px-8 py-10 text-center">
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
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* Table of contents */}
                <Card>
                  <CardContent className="p-5">
                    <h3 className="mb-3 text-sm font-bold">In this article</h3>
                    <nav className="space-y-1">
                      {post.body.map((section, i) =>
                        section.heading ? (
                          <a
                            key={i}
                            href={`#section-${i}`}
                            className="text-muted-foreground hover:text-primary block py-1 text-xs transition-colors"
                          >
                            {section.heading}
                          </a>
                        ) : null
                      )}
                    </nav>
                  </CardContent>
                </Card>

                {/* Related posts */}
                {fallbackRelated.length > 0 && (
                  <Card>
                    <CardContent className="p-5">
                      <h3 className="mb-3 text-sm font-bold">Related articles</h3>
                      <div className="space-y-3">
                        {fallbackRelated.map((rp) => (
                          <Link
                            key={rp.slug}
                            href={`/blog/${rp.slug}`}
                            className="group block"
                          >
                            <div className={`flex h-20 items-center justify-center rounded-lg bg-gradient-to-br ${rp.gradient}`}>
                              <Icon name={rp.icon} className="size-6 text-white opacity-90" />
                            </div>
                            <p className="mt-2 text-[13px] font-semibold leading-snug group-hover:text-primary transition-colors">
                              {rp.title}
                            </p>
                            <span className="text-muted-foreground text-[11px]">{rp.readTime}</span>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Newsletter */}
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-5">
                    <h3 className="text-sm font-bold">Stay updated</h3>
                    <p className="text-muted-foreground mt-1 text-xs">
                      Get research tips and writing guides weekly.
                    </p>
                    <div className="mt-3 space-y-2">
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full rounded-lg border bg-background px-3 py-2 text-xs outline-none"
                      />
                      <Button size="sm" className="w-full text-xs">
                        Subscribe
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
