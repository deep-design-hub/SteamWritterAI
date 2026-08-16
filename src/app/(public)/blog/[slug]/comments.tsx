"use client";

import * as React from "react";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Comment {
  id: string;
  name: string;
  text: string;
  date: string;
  avatar: string;
}

const DEMO_COMMENTS: Comment[] = [
  {
    id: "1",
    name: "Amina Bello",
    text: "This is exactly what I needed before starting my project. The chapter breakdown is so clear. Thank you!",
    date: "2 days ago",
    avatar: "AB",
  },
  {
    id: "2",
    name: "Chukwuemeka O.",
    text: "Very helpful. I shared this with my supervisor and she was impressed with the structure. Bookmarked!",
    date: "5 days ago",
    avatar: "CO",
  },
  {
    id: "3",
    name: "Fatima Hassan",
    text: "Can you write one specifically for social science research methodology? That would be incredibly useful.",
    date: "1 week ago",
    avatar: "FH",
  },
];

export function BlogComments() {
  const [comments, setComments] = React.useState(DEMO_COMMENTS);
  const [name, setName] = React.useState("");
  const [text, setText] = React.useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      name: name.trim(),
      text: text.trim(),
      date: "Just now",
      avatar: name.trim().split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2),
    };
    setComments([newComment, ...comments]);
    setName("");
    setText("");
  }

  return (
    <div className="mt-12 border-t pt-8">
      <h3 className="mb-6 flex items-center gap-2 text-lg font-bold">
        <MessageCircle className="size-5" />
        Comments ({comments.length})
      </h3>

      {/* Comment form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20"
          />
          <input
            type="email"
            placeholder="Email (not published)"
            className="rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <textarea
          placeholder="Write your comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          rows={3}
          className="w-full resize-none rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20"
        />
        <Button type="submit" size="sm">
          <Send className="mr-1.5 size-3.5" /> Post Comment
        </Button>
      </form>

      {/* Comments list */}
      <div className="space-y-4">
        {comments.map((c) => (
          <div key={c.id} className="flex gap-3 rounded-xl border bg-muted/20 p-4">
            <div className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold">
              {c.avatar}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{c.name}</span>
                <span className="text-muted-foreground text-[11px]">{c.date}</span>
              </div>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{c.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
