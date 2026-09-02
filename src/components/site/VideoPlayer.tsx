function embedUrl(src: string): string | null {
  try {
    const url = new URL(src);
    if (url.hostname.includes("youtube.com")) {
      const id = url.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
      if (url.pathname.startsWith("/embed/")) return src;
    }
    if (url.hostname === "youtu.be") return `https://www.youtube.com/embed${url.pathname}`;
    if (url.hostname.includes("vimeo.com")) return `https://player.vimeo.com/video${url.pathname}`;
    return null;
  } catch {
    return null;
  }
}

export function VideoPlayer({ src, poster, title }: { src?: string; poster?: string; title?: string }) {
  const embed = src ? embedUrl(src) : null;

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-primary shadow-card">
      {embed ? (
        <iframe
          src={embed}
          title={title ?? "Lesson video"}
          className="aspect-video w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : src ? (
        <video controls poster={poster} className="aspect-video w-full bg-black" preload="metadata">
          <source src={src} />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="flex aspect-video w-full items-center justify-center bg-primary text-center text-sm text-primary-foreground/80">
          <div className="px-6">
            <p className="font-display text-lg">{title ?? "Lesson video"}</p>
            <p className="mt-2">This lesson video will appear here once uploaded.</p>
          </div>
        </div>
      )}
    </div>
  );
}
