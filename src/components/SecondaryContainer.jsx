import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    <div className="bg-black">
      <div className="-mt-64 pl-12 relative z-20">
        <MovieList category={"Now Playing"} movies={movies?.nowPlayingMovies} />
        <MovieList category={"Trending"} movies={movies?.popularMovies} />
        <MovieList category={"Popular"} movies={movies?.popularMovies} />
        <MovieList category={"Upcoming"} movies={movies?.nowPlayingMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
