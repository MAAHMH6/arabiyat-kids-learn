export function VideoPlayer({ src, poster, title }: { src?: string; poster?: string; title?: string }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-primary shadow-card">
      {src ? (
        <video controls poster={poster} className="aspect-video w-full bg-black" preload="metadata">
          <source src={src} type="video/mp4" />
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
