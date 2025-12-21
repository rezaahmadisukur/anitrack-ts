import type React from "react";

export interface IAnime {
  title?: string;
  status: string;
  images: {
    webp: {
      image_url: string;
    };
  };
  season: string;
  year: number;
  episodes: number;
  score: number;
  members: number;
  rank: number;
  genres: [
    {
      name: string;
    }
  ];
}

export type TChildren = {
  children: React.ReactNode;
};
