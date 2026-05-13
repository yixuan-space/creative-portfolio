"use client";

import { useEffect, useMemo, useState } from "react";

const storageKey = "portfolio-theme";

const heroSlides = [
  {
    id: "01",
    title: "Face Study",
    subtitle: "面部特写",
    alt: "极简黑白面部特写人像",
    src: "/assets/portrait-closeup.svg",
  },
  {
    id: "02",
    title: "Silhouette Form",
    subtitle: "全身剪影",
    alt: "极简黑白全身剪影人像",
    src: "/assets/portrait-silhouette.svg",
  },
  {
    id: "03",
    title: "Side Portrait",
    subtitle: "半身侧脸",
    alt: "极简黑白半身侧脸人像",
    src: "/assets/portrait-profile.svg",
  },
];

const galleryPhotos = [
  {
    title: "Mist Road",
    category: "Landscape",
    shotDate: "2024.03.18",
    alt: "雾气中的山间公路",
    src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Quiet Gaze",
    category: "Portrait",
    shotDate: "2024.01.09",
    alt: "暗光中的人像",
    src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Open Field",
    category: "Nature",
    shotDate: "2023.11.26",
    alt: "风吹过草地与山丘",
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "First Light",
    category: "Travel",
    shotDate: "2024.02.14",
    alt: "湖边清晨的树林",
    src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Tidal Lines",
    category: "Seascape",
    shotDate: "2023.08.05",
    alt: "海浪拍打沙滩",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "After Rain",
    category: "Street",
    shotDate: "2024.04.21",
    alt: "城市街头的霓虹和行人",
    src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Window Study",
    category: "Editorial",
    shotDate: "2023.12.02",
    alt: "窗边逆光下的人物剪影",
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Trace",
    category: "Minimal",
    shotDate: "2024.05.08",
    alt: "沙漠中的脚印和光影",
    src: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Monolith",
    category: "Architecture",
    shotDate: "2023.10.30",
    alt: "黑白建筑线条",
    src: "https://images.unsplash.com/photo-1520637836862-4d197d17c55a?auto=format&fit=crop&w=900&q=80",
  },
];

export function PortfolioHome() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(storageKey);
    const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (preferredDark ? "dark" : "light");
    setTheme(initialTheme === "dark" ? "dark" : "light");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(storageKey, theme);
  }, [theme]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4800);

    return () => window.clearInterval(timer);
  }, []);

  const toggleLabel = useMemo(() => (theme === "dark" ? "Light" : "Dark"), [theme]);

  return (
    <>
      <header className="topbar">
        <div className="brand">
          <span className="brand-name">LIN</span>
          <span className="brand-role">Photographer</span>
        </div>
        <div className="topbar-actions">
          <p className="intro">光线、空间、人与片刻。</p>
          <button
            className="theme-toggle"
            type="button"
            aria-label="切换深色模式"
            aria-pressed={theme === "dark"}
            onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
          >
            <span className="theme-toggle-track">
              <span className="theme-toggle-thumb" />
            </span>
            <span className="theme-toggle-label">{toggleLabel}</span>
          </button>
        </div>
      </header>

      <main className="gallery-shell">
        <section className="hero-carousel" aria-label="精选人像轮播">
          <div className="carousel-viewport">
            {heroSlides.map((slide, index) => (
              <article
                key={slide.id}
                className={`carousel-slide${index === activeSlide ? " is-active" : ""}`}
              >
                <img src={slide.src} alt={slide.alt} />
                <div className="carousel-copy">
                  <p>{slide.id}</p>
                  <h1>{slide.title}</h1>
                  <span>{slide.subtitle}</span>
                </div>
              </article>
            ))}
          </div>
          <div className="carousel-controls" aria-label="轮播控制">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                className={`carousel-dot${index === activeSlide ? " is-active" : ""}`}
                type="button"
                aria-label={`查看第 ${index + 1} 张`}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>
        </section>

        <section className="masonry" aria-label="摄影作品集">
          {galleryPhotos.map((photo) => (
            <article className="photo-card" key={photo.title}>
              <img src={photo.src} alt={photo.alt} />
              <div className="photo-meta">
                <h2>{photo.title}</h2>
                <div className="photo-meta-row">
                  <p>{photo.category}</p>
                  <time dateTime={photo.shotDate.replaceAll(".", "-")}>
                    拍摄于 {photo.shotDate}
                  </time>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
