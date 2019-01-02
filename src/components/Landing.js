import React from 'react';
import './../App.css';

const Landing = () => (
  <section className="landing">
    <h2 className="hero-title">Turn the music up!</h2>
    <div className="row justify-content-center">
      <div className="col-sm-6">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Choose your music</h4>
            <p className="card-text">The world is full of music; why should you have to listen to music that someone else chose?</p>
          </div>
        </div>
      </div>
    </div>
    <div className="row justify-content-center">
      <div className="col-sm-6">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Unlimited, streaming, add-free</h4>
            <p className="card-text">No arbitrary limits. No distractions.</p>
          </div>
        </div>
      </div>
    </div>
    <div className="row justify-content-center">
      <div className="col-sm-6">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Mobile enabled</h4>
            <p className="card-text">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Landing;
