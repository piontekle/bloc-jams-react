import React from 'react';
import './../App.css';

const Landing = () => (
  <section className="landing">
    <h1 className="hero-title">Turn the music up!</h1>
    <section className="card-group">
      <div className="card">
        <img className="card-img-top" src=".../100px200/" alt="Card image cap"/>
        <div className="card-body">
          <h2 className="card-title">Choose your music</h2>
          <p className="card-text">The world is full of music; why should you have to listen to music that someone else chose?</p>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Unlimited, streaming, add-free</h2>
          <p className="card-text">No arbitrary limits. No distractions.</p>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Mobile enabled</h2>
          <p className="card-text">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
        </div>
      </div>
    </section>
  </section>
);

export default Landing;
