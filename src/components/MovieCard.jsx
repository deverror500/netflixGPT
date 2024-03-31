import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ movie }) => {
  return (
    <div className="w-48 pr-4">
      <img src={IMG_CDN_URL + movie?.poster_path} alt={movie?.title} />
    </div>
  );
};

export default MovieCard;
