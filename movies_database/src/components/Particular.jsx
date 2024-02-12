import React from "react";

const Particular = ({ pageData,type }) => {
  
  return (
    <div className=" w-full flex gap-x-6 text-xl  dark:bg-slate-900 flex-wrap justify-center items-center  ">
      <img
        className=" h-96 min-w-72 "
        src={`https://image.tmdb.org/t/p/w500/${pageData.poster_path}`}
        alt={`${pageData.id}`}
      />
      <div className="flex flex-col p-4 max-w-[900px] ">
        <h3 className="text-4xl font-bold ">
          {pageData.original_title || pageData.original_name
            ? (pageData.original_title || pageData.original_name).length > 18
              ? (
                  pageData.original_title || pageData.original_name
                )
              : pageData.original_title || pageData.original_name
            : "Title not available"}
        </h3>
        <p>Language - {pageData.original_language}</p>
        {type==="tv" ? (<div>
          <p>Airing - {`${pageData.in_production}` }</p>
          <p>First Air Date- {pageData.first_air_date} </p>
          <p>Last Air Date- {pageData.last_air_date} </p>
          <p>Seasons - {pageData.seasons.length}</p>
        </div>): <p>Realease Date - {pageData.release_date}</p> }
        
          <p>Overview - {pageData.overview}</p>
        <p className="flex gap-2">
          Genres - 
          {}
          {pageData.genres.map((genre, index) => {
            return <span key={index}>{genre.name}</span>;
          })}
        </p>
        <p> Popularity - {pageData.popularity}</p>
        <p>Average Vote - {pageData.vote_average}</p>
      </div>
    </div>
  );
};

export default Particular;
