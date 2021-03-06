import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <Link to='/'>Landing </Link>
            <Link to='/Library'> Library</Link>
          </nav>
          <h1>Bloc Jams</h1>
          <p className="credit">Photo by Drew Patrick Miller on Unsplash</p>
        </header>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
        <footer>
          <p className="credit">Photo by Armand Khoury on Unsplash</p>
        </footer>
      </div>
    );
  }
}

export default App;
