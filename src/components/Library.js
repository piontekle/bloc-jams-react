import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import './../App.css';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }

  render() {
    return (
      <div className="row justify-content-center">
        <section className="col">
          {
            this.state.albums.map( (album, index) =>
            <Link className="albumLink" to={`/album/${album.slug}`} key={index}>
              <img src={album.albumCover} alt={album.title} />
              <div>{album.title}</div>
              <div>{album.artist}</div>
              <div>{album.songs.length} songs</div>
            </Link>
            )
          }
        </section>
      </div>
    );
  }
}

export default Library;
