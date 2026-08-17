"use client";

import Image from "next/image";
import { useState } from "react";

type VideoFeatureProps = {
  title?: string;
  copy?: string;
  embedUrl?: string;
  channelUrl?: string;
  poster?: string;
  eyebrow?: string;
};

export default function VideoFeature({
  title = "Experience the work behind the exhibition",
  copy = "Previous exhibitions, organizer achievements and project highlights.",
  embedUrl,
  channelUrl,
  poster = "/assets/expo-event.webp",
  eyebrow = "Organizer Showreel",
}: VideoFeatureProps) {
  const [play, setPlay] = useState(false);

  const media = play && embedUrl ? (
    <iframe
      src={embedUrl}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  ) : channelUrl && !embedUrl ? (
    <a
      className="videoPoster"
      href={channelUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Open Success Steps YouTube channel"
    >
      <Image fill src={poster} alt="Success Steps exhibition highlights" />
      <div className="videoOverlay" />
      <span className="playButton" aria-hidden="true">▶</span>
      <strong>Explore organizer videos</strong>
      <small>Success Steps on YouTube · specific project videos will be added here</small>
      <span className="videoExternal">YouTube ↗</span>
    </a>
  ) : (
    <button
      className="videoPoster"
      onClick={() => setPlay(true)}
      aria-label="Play organizer showreel"
      type="button"
    >
      <Image fill src={poster} alt="Exhibition highlights" />
      <div className="videoOverlay" />
      <span className="playButton" aria-hidden="true">▶</span>
      <strong>{embedUrl ? "Play showreel" : "Showreel space ready"}</strong>
      <small>{embedUrl ? "Video opens in place" : "A project video will be embedded here"}</small>
    </button>
  );

  return (
    <section className="videoFeature">
      <div className="videoCopy">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{copy}</p>
        {channelUrl && (
          <a className="textLink light" href={channelUrl} target="_blank" rel="noreferrer">
            Visit Success Steps on YouTube <span>↗</span>
          </a>
        )}
      </div>
      <div className="videoFrame">{media}</div>
    </section>
  );
}
