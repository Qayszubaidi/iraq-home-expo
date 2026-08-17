"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "@/components/Reveal";

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

  const media =
    play && embedUrl ? (
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
        <Image fill src={poster} alt="Success Steps exhibition highlights" sizes="(max-width:768px) 100vw, 60vw" />
        <div className="videoOverlay" />
        <span className="playButton" aria-hidden="true">
          <span className="playIcon">▶</span>
        </span>
        <div className="videoPosterCaption">
          <strong>Explore organizer videos</strong>
          <small>Success Steps on YouTube</small>
        </div>
        <span className="videoExternal">YouTube ↗</span>
      </a>
    ) : (
      <button
        className="videoPoster"
        onClick={() => setPlay(true)}
        aria-label="Play organizer showreel"
        type="button"
      >
        <Image fill src={poster} alt="Exhibition highlights" sizes="(max-width:768px) 100vw, 60vw" />
        <div className="videoOverlay" />
        <span className="playButton" aria-hidden="true">
          <span className="playIcon">▶</span>
        </span>
        <div className="videoPosterCaption">
          <strong>{embedUrl ? "Play showreel" : "Showreel space ready"}</strong>
          <small>{embedUrl ? "Video opens in place" : "A project video will be embedded here"}</small>
        </div>
      </button>
    );

  return (
    <section className="videoFeature">
      <div className="videoFeatureInner">
        <Reveal className="videoCopy">
          <span className="eyebrow light">{eyebrow}</span>
          <h2 className="displayHeading videoHeading">{title}</h2>
          <p>{copy}</p>
          {channelUrl && (
            <a className="textLink light" href={channelUrl} target="_blank" rel="noreferrer">
              Visit Success Steps on YouTube <span className="arrow">→</span>
            </a>
          )}
        </Reveal>
        <Reveal className="videoFrameWrap">{media && <div className="videoFrame">{media}</div>}</Reveal>
      </div>
    </section>
  );
}
