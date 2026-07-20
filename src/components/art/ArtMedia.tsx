import { Film, Instagram, Play } from "lucide-react";
import type { ArtMedia, ArtProject } from "@/data/artPortfolio";

function mediaSource(media: ArtMedia) {
  return media.kind === "image" ? media.src : media.poster;
}

export function ProjectMediaPreview({ project }: { project: ArtProject }) {
  const media = project.media[0];
  const isMoving = media.kind === "video" || (media.kind === "instagram" && media.postType === "reel");

  return (
    <div className="art-media-preview">
      <img
        src={mediaSource(media)}
        alt=""
        width={media.width}
        height={media.height}
        loading="lazy"
        decoding="async"
      />
      {isMoving && (
        <span className="art-media-kind" aria-hidden="true">
          {media.kind === "video" ? <Film /> : <Instagram />}
          {media.kind === "video" ? "Video" : "Reel"}
        </span>
      )}
    </div>
  );
}

interface ProjectMediaDetailProps {
  media: ArtMedia;
  activeVideoId: string | null;
  mediaId: string;
  onActivateVideo: (id: string) => void;
}

export function ProjectMediaDetail({ media, activeVideoId, mediaId, onActivateVideo }: ProjectMediaDetailProps) {
  if (media.kind === "video" && activeVideoId === mediaId) {
    return (
      <video
        aria-label={media.alt}
        controls
        autoPlay
        playsInline
        preload="metadata"
        poster={media.poster}
        className="art-viewer-video"
      >
        {media.sources.map((source) => <source key={source.src} src={source.src} type={source.type} />)}
        {media.captions && (
          <track
            kind="captions"
            src={media.captions.src}
            srcLang={media.captions.language}
            label={media.captions.label}
            default
          />
        )}
        Your browser does not support embedded video.
      </video>
    );
  }

  if (media.kind === "video") {
    return (
      <button
        type="button"
        className="art-video-poster"
        onClick={() => onActivateVideo(mediaId)}
        aria-label={`Play video: ${media.alt}`}
      >
        <img src={media.poster} alt={media.alt} width={media.width} height={media.height} />
        <span><Play fill="currentColor" /> Play</span>
      </button>
    );
  }

  return (
    <img
      src={mediaSource(media)}
      alt={media.alt}
      width={media.width}
      height={media.height}
      decoding="async"
      className="art-viewer-image"
    />
  );
}
