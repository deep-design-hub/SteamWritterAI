"use client";

import React from "react";
import type { Block } from "./types";

function StarRating() {
  return (
    <span style={{ color: "#f8dd73", fontSize: 14, letterSpacing: 2 }}>
      ★★★★★
    </span>
  );
}

function decodeHtml(html: string): string {
  if (typeof window === "undefined") return html;
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function s(val: unknown, fallback = ""): string {
  return String(val ?? fallback);
}

function n(val: unknown, fallback = 0): number {
  return Number(val ?? fallback);
}

function renderHeadingTag(size: string | unknown, style: React.CSSProperties, text: string) {
  const tag = s(size, "2");
  if (tag === "1") return <h1 style={style}>{text}</h1>;
  if (tag === "3") return <h3 style={style}>{text}</h3>;
  return <h2 style={style}>{text}</h2>;
}

export function renderBlock(b: Block): React.ReactNode {
  const p = b.props;

  switch (b.type) {
    case "hero":
      return (
        <section
          style={{
            background: s(p.bg, "#f3efff"),
            color: s(p.fg, "#182033"),
            textAlign: (s(p.align, "left") as React.CSSProperties["textAlign"]),
            padding: `${p.pad || 66}px 28px`,
            borderRadius: `${p.radius || 8}px`,
          }}
        >
          {!!p.eyebrow && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 2,
                opacity: 0.5,
                display: "block",
                marginBottom: 10,
              }}
            >
              {s(p.eyebrow)}
            </span>
          )}
          <h2
            style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.15, margin: "0 0 10px" }}
            dangerouslySetInnerHTML={{ __html: s(p.title) }}
          />
          <p style={{ fontSize: 13, lineHeight: 1.5, opacity: 0.75, marginBottom: 18, maxWidth: 420 }}>
            {s(p.text)}
          </p>
          {!!p.btn && (
            <span
              style={{
                display: "inline-block",
                padding: "10px 22px",
                fontSize: 13,
                fontWeight: 600,
                borderRadius: 6,
                background: p.btnStyle === "outline" ? "transparent" : s(p.btnBg, "#182033"),
                color: p.btnStyle === "outline" ? s(p.btnBg, "#182033") : "#fff",
                border: p.btnStyle === "outline" ? `2px solid ${p.btnBg || "#182033"}` : "none",
              }}
            >
              {s(p.btn)}
            </span>
          )}
        </section>
      );

    case "heading":
      return (
        <div style={{ textAlign: (s(p.align, "left") as React.CSSProperties["textAlign"]) }}>
          {renderHeadingTag(
            p.size,
            {
              fontSize: n(p.font, 26),
              fontWeight: 700,
              color: s(p.color, "#182033"),
              margin: 0,
            },
            s(p.text, "Add a heading")
          )}
        </div>
      );

    case "text":
      return (
        <div style={{ textAlign: (s(p.align, "left") as React.CSSProperties["textAlign"]) }}>
          <p
            style={{
              fontSize: n(p.font, 11),
              lineHeight: 1.6,
              color: s(p.color, "#5f687b"),
              margin: 0,
            }}
          >
            {s(p.text, "Add a paragraph.")}
          </p>
        </div>
      );

    case "image":
      return (
        <div>
          {p.url ? (
            <div
              style={{
                backgroundImage: `url(${p.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: 180,
                borderRadius: 8,
              }}
            />
          ) : (
            <div
              style={{
                height: 180,
                borderRadius: 8,
                background: "linear-gradient(135deg,#e2e8f0,#cbd5e1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#94a3b8",
                fontSize: 13,
              }}
            >
              📷 No image selected
            </div>
          )}
          {!!p.caption && (
            <p style={{ fontSize: 11, color: "#64748b", marginTop: 6 }}>
              {s(p.caption)}
            </p>
          )}
        </div>
      );

    case "button": {
      const isSolid = !p.style || p.style === "solid";
      const sz = p.size === "sm"
        ? { padding: "6px 14px", fontSize: 12 }
        : p.size === "lg"
        ? { padding: "14px 30px", fontSize: 15 }
        : { padding: "10px 22px", fontSize: 13 };
      return (
        <div style={{ textAlign: (s(p.align, "left") as React.CSSProperties["textAlign"]) }}>
          <span
            style={{
              display: "inline-block",
              fontWeight: 600,
              borderRadius: 6,
              background: isSolid ? s(p.bg, "#6d5dfc") : "transparent",
              color: isSolid ? "#fff" : s(p.bg, "#6d5dfc"),
              border: isSolid ? "none" : `2px solid ${p.bg || "#6d5dfc"}`,
              ...sz,
            }}
          >
            {s(p.text, "Button")}
          </span>
        </div>
      );
    }

    case "divider":
      return (
        <div style={{ padding: `${p.space || 24}px 0` }}>
          <hr
            style={{
              border: "none",
              borderTop: `1px solid ${s(p.color, "#e6e9f1")}`,
              width: `${p.width || 100}%`,
              margin: "0 auto",
            }}
          />
        </div>
      );

    case "spacer":
      return (
        <div
          style={{
            height: n(p.height, 40),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "#cbd5e1", fontSize: 10 }}>↕ {s(p.height, "40")}px</span>
        </div>
      );

    case "products": {
      const cols = n(p.cols, 3);
      const count = n(p.count, 6);
      const names = [
        "Minimal lamp", "Ceramic vase", "Linen notebook",
        "Desk organizer", "Cotton throw", "Brass candle",
        "Oak tray", "Stone coaster", "Linen pouch",
        "Glass carafe", "Wool blanket", "Matte pitcher",
      ];
      const gradients = [
        "linear-gradient(135deg,#f3d9b8,#e0b078)",
        "linear-gradient(135deg,#c9d8e8,#8fb2cf)",
        "linear-gradient(135deg,#d9e8e0,#9fc0ae)",
        "linear-gradient(135deg,#f5d9e2,#e79fbb)",
        "linear-gradient(135deg,#f8dd73,#eebf4a)",
        "linear-gradient(135deg,#b6acff,#6d5dfc)",
      ];
      return (
        <section style={{ background: s(p.background, "#fff"), padding: "28px 0" }}>
          {!!p.title && (
            <h3
              style={{
                fontSize: 20,
                fontWeight: 700,
                textAlign: (s(p.align, "left") as React.CSSProperties["textAlign"]),
                margin: "0 0 16px",
                color: "#182033",
              }}
            >
              {s(p.title)}
            </h3>
          )}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gap: 12,
            }}
          >
            {Array.from({ length: count }, (_, i) => (
              <article
                key={i}
                style={{
                  background: "#fff",
                  borderRadius: 8,
                  overflow: "hidden",
                  border: "1px solid #e5e7eb",
                }}
              >
                <div
                  style={{
                    height: 120,
                    background: gradients[i % gradients.length],
                  }}
                />
                <div style={{ padding: 10 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#182033" }}>
                    {names[i % names.length]}
                  </div>
                  {!!p.showPrice && (
                    <div style={{ fontSize: 11, color: "#5f687b", marginTop: 4 }}>
                      ${(19 + i * 7).toFixed(2)}
                    </div>
                  )}
                  {!!p.showStock && (
                    <div style={{ fontSize: 9, color: "#22c55e", marginTop: 2 }}>In stock</div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      );
    }

    case "reviews":
      return (
        <section
          style={{
            background: s(p.background, "#182033"),
            color: s(p.fg, "#fff"),
            padding: "40px 28px",
            borderRadius: 10,
          }}
        >
          {!!p.eyebrow && (
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, opacity: 0.5 }}>
              {s(p.eyebrow)}
            </span>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginTop: 8 }}>
            <div>
              <h3 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 6px" }}>{s(p.title)}</h3>
              <StarRating />
              <span style={{ fontSize: 12, opacity: 0.6, marginLeft: 8 }}>{s(p.count)}</span>
            </div>
          </div>
          <blockquote
            style={{
              fontSize: 16,
              lineHeight: 1.5,
              fontStyle: "italic",
              margin: "18px 0",
              maxWidth: 420,
              opacity: 0.9,
            }}
          >
            &ldquo;{s(p.quote)}&rdquo;
          </blockquote>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {s(p.initials)}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{s(p.name)}</div>
              <div style={{ fontSize: 11, opacity: 0.6 }}>{s(p.role)}</div>
            </div>
          </div>
        </section>
      );

    case "collection": {
      const items = (Array.isArray(p.items) ? p.items : ["Lighting", "Apparel", "Stationery"]) as string[];
      const colors = (Array.isArray(p.colors) ? p.colors : []) as string[];
      return (
        <section style={{ background: s(p.background, "#fff"), padding: "28px 0" }}>
          {!!p.title && (
            <h3 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 16px", color: "#182033" }}>
              {s(p.title)}
            </h3>
          )}
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: 12 }}>
            {items.map((item, i) => (
              <div
                key={i}
                style={{
                  height: 120,
                  borderRadius: 10,
                  background: colors[i] || "linear-gradient(135deg,#e2e8f0,#cbd5e1)",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: 12,
                  fontWeight: 600,
                  fontSize: 14,
                  color: "#182033",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      );
    }

    case "countdown":
      return (
        <section
          style={{
            background: s(p.background, "#6d5dfc"),
            color: s(p.fg, "#fff"),
            padding: "32px 28px",
            borderRadius: 10,
            textAlign: "center",
          }}
        >
          {!!p.eyebrow && (
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, opacity: 0.6 }}>
              {s(p.eyebrow)}
            </span>
          )}
          <h3 style={{ fontSize: 22, fontWeight: 700, margin: "6px 0 14px" }}>{s(p.title)}</h3>
          <div style={{ display: "flex", justifyContent: "center", gap: 14 }}>
            {["02", "14", "36", "09"].map((v, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    background: "rgba(255,255,255,0.15)",
                    borderRadius: 8,
                    width: 56,
                    height: 56,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {v}
                </div>
                <div style={{ fontSize: 9, opacity: 0.6, marginTop: 4 }}>
                  {["Days", "Hrs", "Min", "Sec"][i]}
                </div>
              </div>
            ))}
          </div>
        </section>
      );

    case "testimonials": {
      const items = (Array.isArray(p.items) ? p.items : []) as Array<Record<string, string>>;
      return (
        <section style={{ background: s(p.background, "#fff"), padding: "28px 0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {items.map((t, i) => (
              <figure
                key={i}
                style={{
                  background: "#f7f8fc",
                  borderRadius: 10,
                  padding: 20,
                  margin: 0,
                }}
              >
                <blockquote
                  style={{
                    fontSize: 13,
                    lineHeight: 1.55,
                    color: "#334155",
                    margin: "0 0 14px",
                    fontStyle: "italic",
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: t.color || "#c58f7a",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#182033" }}>{t.name}</div>
                    <div style={{ fontSize: 10, color: "#94a3b8" }}>{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      );
    }

    case "stats": {
      const items = (Array.isArray(p.items) ? p.items : []) as Array<Record<string, string>>;
      return (
        <section style={{ background: s(p.background, "#f7f8fc"), padding: "28px 0" }}>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: 16, textAlign: "center" }}>
            {items.map((st, i) => (
              <div key={i}>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#182033" }}>{st.value}</div>
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>{st.label}</div>
              </div>
            ))}
          </div>
        </section>
      );
    }

    case "banner":
      return (
        <a
          style={{
            display: "block",
            background: s(p.bg, "#beefc6"),
            color: s(p.fg, "#19322a"),
            padding: "16px 28px",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          {s(p.text, "Free shipping on orders over $50")}
        </a>
      );

    case "video":
      return (
        <div>
          {p.url ? (
            <div
              style={{
                backgroundImage: `url(${p.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: 220,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.55)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: 20,
                }}
              >
                ▶
              </div>
            </div>
          ) : (
            <div
              style={{
                height: 220,
                borderRadius: 10,
                background: "linear-gradient(135deg,#1e293b,#334155)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#94a3b8",
                fontSize: 13,
              }}
            >
              🎬 No video selected
            </div>
          )}
          {!!p.caption && (
            <p style={{ fontSize: 11, color: "#64748b", marginTop: 6 }}>{s(p.caption)}</p>
          )}
        </div>
      );

    case "faq": {
      const items = (Array.isArray(p.items) ? p.items : []) as Array<Record<string, string>>;
      return (
        <section style={{ background: s(p.background, "#fff"), padding: "28px 0" }}>
          {!!p.title && (
            <h3 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 16px", color: "#182033" }}>
              {s(p.title)}
            </h3>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {items.map((item, i) => (
              <details
                key={i}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  padding: "10px 14px",
                }}
              >
                <summary style={{ fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                  {item.q}
                </summary>
                <p style={{ fontSize: 12, color: "#64748b", marginTop: 6, lineHeight: 1.5 }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      );
    }

    case "newsletter":
      return (
        <section
          style={{
            background: s(p.background, "#6d5dfc"),
            color: "#fff",
            padding: "36px 28px",
            borderRadius: 10,
            textAlign: "center",
          }}
        >
          {!!p.title && (
            <h3 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 6px" }}>{s(p.title)}</h3>
          )}
          {!!p.text && (
            <p style={{ fontSize: 13, opacity: 0.8, margin: "0 0 18px" }}>{s(p.text)}</p>
          )}
          <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
            <input
              placeholder="Email address"
              style={{
                padding: "10px 14px",
                borderRadius: 6,
                border: "none",
                fontSize: 13,
                width: 220,
              }}
            />
            <span
              style={{
                padding: "10px 20px",
                borderRadius: 6,
                background: "#fff",
                color: s(p.background, "#6d5dfc"),
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {s(p.btn, "Subscribe")}
            </span>
          </div>
        </section>
      );

    case "gallery": {
      const cols = n(p.cols, 3);
      const colors = (Array.isArray(p.colors) ? p.colors : []) as string[];
      const fallbackColors = [
        "linear-gradient(135deg,#f3d9b8,#e0b078)",
        "linear-gradient(135deg,#c9d8e8,#8fb2cf)",
        "linear-gradient(135deg,#d9e8e0,#9fc0ae)",
      ];
      const items = (Array.isArray(p.items) ? p.items : []) as string[];
      const cells = items.length > 0 ? items.length : 6;
      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: 8,
          }}
        >
          {Array.from({ length: cells }, (_, i) => (
            <div
              key={i}
              style={{
                height: 120,
                borderRadius: 8,
                background: items[i]
                  ? `url(${items[i]}) center/cover`
                  : colors[i % colors.length] || fallbackColors[i % fallbackColors.length],
              }}
            />
          ))}
        </div>
      );
    }

    case "social": {
      const items = (Array.isArray(p.items) ? p.items : []) as string[];
      return (
        <section style={{ background: s(p.background, "#fff"), padding: "28px 0" }}>
          {!!p.title && (
            <h3 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 16px", color: "#182033" }}>
              {s(p.title)}
            </h3>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {items.map((h, i) => (
              <div
                key={i}
                style={{
                  height: 100,
                  borderRadius: 8,
                  background: "linear-gradient(135deg,#f1f5f9,#e2e8f0)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#64748b",
                }}
              >
                {h}
              </div>
            ))}
          </div>
        </section>
      );
    }

    case "marquee": {
      const items = (Array.isArray(p.items) ? p.items : ["NEW", "SALE", "HOT"]) as string[];
      const repeated = [...items, ...items, ...items, ...items];
      return (
        <div
          style={{
            background: s(p.bg, "#f8dd73"),
            color: s(p.fg, "#182033"),
            overflow: "hidden",
            padding: "12px 0",
          }}
        >
          <div style={{ display: "flex", gap: 40, whiteSpace: "nowrap", fontSize: 14, fontWeight: 700, letterSpacing: 2 }}>
            {repeated.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        </div>
      );
    }

    case "contact":
      return (
        <section style={{ background: s(p.background, "#fff"), padding: "28px 0" }}>
          {!!p.title && (
            <h3 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 6px", color: "#182033" }}>
              {s(p.title)}
            </h3>
          )}
          {!!p.text && (
            <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 16px" }}>{s(p.text)}</p>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 360 }}>
            <input placeholder="Name" style={{ padding: "10px 12px", borderRadius: 6, border: "1px solid #e5e7eb", fontSize: 13 }} />
            <input placeholder="Email" style={{ padding: "10px 12px", borderRadius: 6, border: "1px solid #e5e7eb", fontSize: 13 }} />
            <textarea placeholder="Message" rows={3} style={{ padding: "10px 12px", borderRadius: 6, border: "1px solid #e5e7eb", fontSize: 13, resize: "none" }} />
            <span
              style={{
                display: "inline-block",
                padding: "10px 22px",
                borderRadius: 6,
                background: "#182033",
                color: "#fff",
                fontSize: 13,
                fontWeight: 600,
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              {s(p.btn, "Send message")}
            </span>
          </div>
        </section>
      );

    case "footer": {
      const links = (Array.isArray(p.links) ? p.links : []) as string[];
      const socials = (Array.isArray(p.socials) ? p.socials : []) as string[];
      return (
        <footer
          style={{
            background: s(p.bg, "#182033"),
            color: "#fff",
            padding: "36px 28px",
            borderRadius: "10px 10px 0 0",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 40, marginBottom: 28 }}>
            <div style={{ maxWidth: 280 }}>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{s(p.title)}</div>
              <div style={{ fontSize: 12, opacity: 0.6, lineHeight: 1.5 }}>{s(p.desc)}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, opacity: 0.4, marginBottom: 8 }}>
                LINKS
              </div>
              {links.map((l, i) => (
                <div key={i} style={{ fontSize: 12, opacity: 0.7, marginBottom: 6, cursor: "pointer" }}>
                  {l}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, opacity: 0.4, marginBottom: 8 }}>
                SOCIAL
              </div>
              {socials.map((sc, i) => (
                <div key={i} style={{ fontSize: 12, opacity: 0.7, marginBottom: 6, cursor: "pointer" }}>
                  {sc}
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 16, fontSize: 11, opacity: 0.4 }}>
            © 2026 {s(p.title)}. All rights reserved.
          </div>
        </footer>
      );
    }

    case "custom":
      return (
        <div
          style={{
            padding: 16,
            borderRadius: 8,
            border: "1px dashed #cbd5e1",
            background: "#f8fafc",
            fontSize: 12,
            color: "#64748b",
            whiteSpace: "pre-wrap",
          }}
          dangerouslySetInnerHTML={{ __html: decodeHtml(s(p.html)) }}
        />
      );

    default:
      return <div style={{ color: "#94a3b8", fontSize: 12 }}>Unknown block</div>;
  }
}
