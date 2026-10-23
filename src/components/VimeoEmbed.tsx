"use client";

import { useState } from "react";
import styles from "./VimeoEmbed.module.css";

type VimeoEmbedProps = {
  vimeoId: number;
  title: string;
  className?: string;
};

const VimeoEmbed = ({ vimeoId, title, className }: VimeoEmbedProps) => {
  const [playing, setPlaying] = useState(false);

  if (!playing) {
    return (
      <button
        type="button"
        className={`${styles.facade} ${className ?? ""}`}
        onClick={() => setPlaying(true)}
        aria-label={`Play ${title}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://vumbnail.com/${vimeoId}.jpg`}
          alt=""
          className={styles.poster}
        />
        <span className={styles.playIcon} aria-hidden>
          ▶
        </span>
      </button>
    );
  }

  return (
    <iframe
      src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1`}
      allow="autoplay; fullscreen"
      allowFullScreen
      className={`${styles.player} ${className ?? ""}`}
    />
  );
};

export default VimeoEmbed;
