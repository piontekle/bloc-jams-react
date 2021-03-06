import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import './../App.css';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      volume: 0.5,
      isPlaying: false,
      isHovering: false
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
    this.audioElement.volume = this.state.volume;
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumecontrol: e => {
        this.setState({ volume: this.audioElement.volume })
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumecontrol', this.eventListeners.volumecontrol);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.removeEventListener('volumecontrol', this.eventListeners.volumecontrol)
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying:false })
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song })
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(currentIndex + 1, this.state.album.songs.length - 1);
    const newSong = this.state.album.songs[newIndex];

    if (this.state.currentSong === newSong && this.state.isPlaying) {
      document.getElementById("next").disabled = true;
    } else {
      this.setSong(newSong);
      this.play();
    }
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ volume: newVolume })
  }

  formatTime(time) {
    const minutes = Math.floor(time/60);
    const seconds = ((time % 60) / 100).toFixed(2).substr(2, 2);
    return time ? `${minutes}:${seconds}` : "-:--";
  }

  mouseEnter(index) {
    this.setState({ isHovering: index })
  }

  mouseLeave() {
    this.setState({ isHovering:false })
  }



  render() {
    return (
      <section className="row">
        <section className="col-12 col-sm-6 col-md-8" id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info" className="albumText">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <div className="col-6 col-md-4">
          <table id="song-list">
            <colgroup>
              <col id="song-number-column" />
              <col id="song-title-column"/>
              <col id="song-duration-column"/>
            </colgroup>
            <tbody className="albumText">
              {
                this.state.album.songs.map ( (song, index) =>
                  <tr className="song"
                    key={index}
                    onClick={() => this.handleSongClick(song)}
                    onMouseEnter={() => this.mouseEnter(index)}
                    onMouseLeave={() => this.mouseLeave()}>
                    <td id="song-number-row">
                      {
                        this.state.currentSong.title === song.title ?
                        (<span className={this.state.isPlaying ? "icon ion-md-pause" : "icon ion-md-play-circle"}/>) : this.state.isHovering === index ? (<span className="icon ion-md-play-circle" />) : (<span className="song-number">{index + 1}</span>)
                      }
                    </td>
                    <td id="song-title-row">{song.title}</td>
                    <td id="song-duration-row">{this.formatTime(song.duration)}</td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
        <PlayerBar
        isPlaying={this.state.isPlaying}
        currentSong={this.state.currentSong}
        currentTime={this.audioElement.currentTime}
        duration={this.audioElement.duration}
        volume={this.audioElement.volume}
        handleSongClick={() => this.handleSongClick(this.state.currentSong)}
        handlePrevClick={() => this.handlePrevClick()}
        handleNextClick={() => this.handleNextClick()}
        handleTimeChange={(e) => this.handleTimeChange(e)}
        handleVolumeChange={(e) => this.handleVolumeChange(e)}
        formatTime={(time) => this.formatTime(time)}
         />
      </section>
    );
  }
}

export default Album;
