import React from "react";
import "./Slider.css";
import Card from "../Card/Card";
import { useSongApi } from "../../contexts/SongApiContext";
import { useEffect } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Slider({ title }) {
  const { albums, fetchAlbums } = useSongApi();

  const cardSkeleton = () => {
    return (
      <div>
        <Skeleton
          baseColor="#2b2b2b"
          highlightColor="#3b3b3b"
          height={152}
          width={152}
        />
        <br />
        <Skeleton
          baseColor="#2b2b2b"
          highlightColor="#3b3b3b"
          height={20}
          width={152}
        />
      </div>
    );
  };
  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div className="slider">
      <div className="slider-title">{title}</div>
      <div className="slider-container">
        {albums.length !== 0
          ? albums.map((album, index) => <Card key={index} album={album} />)
          : [...Array(10)].map(() => {
              return cardSkeleton();
            })}
      </div>
    </div>
  );
}

export default Slider;
