import React, { useState } from "react";
import "./App.css";

function App() {
  const [tracks, setTracks] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [currentTrack, setCurrentTrack] = useState(null);
  const audioRef = React.useRef(null);

  const getTracks = async () => {
    let data = await fetch(
      `https://v1.nocodeapi.com/akash19/spotify/TFnufiaJPAusLRnF/search?q=${keyword}&type=track`
    );
    let convertedData = await data.json();
    console.log(convertedData.tracks.items);
    setTracks(convertedData.tracks.items);
  };

  const playTrack = (track) => {
    if (currentTrack === track) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setCurrentTrack(track);
      audioRef.current = new Audio(track.preview_url);
      audioRef.current.play();
    }
  };

  // const playAllSongs = () => {
  //   tracks.forEach((track, index) => {
  //     setTimeout(() => {
  //       const audio = new Audio(track.preview_url);
  //       audio.play();
  //     }); // Adjust the delay between each song (in milliseconds)
  //   });
  // };

  // const pauseAllSongs = () => {
  //   tracks.forEach((track, index) => {
  //     setTimeout(() => {
  //       const audio = new Audio(track.preview_url);
  //       audio.pause();
  //     }); // Adjust the delay between each song (in milliseconds)
  //   });
  // };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          REACT-X-MUSIC
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse w-75"
          id="navbarSupportedContent"
        >
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
            onClick={getTracks}
          >
            Search
          </button>
        </div>
      </nav>
{/* <button onClick={playAllSongs} className="btn btn-primary">
Play All
</button>
<button onClick={pauseAllSongs} className="btn btn-primary">
Pause All
</button> */}
      <div className="container">
        <div className="row">
          {tracks.map((element, index) => {
            // Check if the album images array exists and has at least one image
            if (element.album.images && element.album.images.length > 1) {
              return (
                <div className="col-md-4 col-lg-4" key={index}>
                  <div className="card mb-4">
                    <img
                      src={element.album.images[1].url}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">{element.album.name}</h5>
                      <p className="card-text">
                        Artist : {element.album.artists[0].name}
                      </p>
                      <p className="card-text">
                        Release Date : {element.album.release_date}
                      </p>
                      <button
                        onClick={() => playTrack(element)}
                        className="btn btn-primary"
                      >
                        {currentTrack === element && !audioRef.current.paused
                          ? "Pause"
                          : "Play"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            } else {
              // Handle the case where there are no images or not enough images in the album
              return (
                <div className="col" key={index}>
                  <p>No image available</p>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}

export default App;
