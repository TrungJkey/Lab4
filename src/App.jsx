import React from 'react'
import SearchBar from './component/SearchBar'
import axios from 'axios'
import './App.css'

const API_URL = 'https://api.unsplash.com/';
const ACCESS_KEY='KYzAP1lZUlCUnYm7AHZUIYqhHC2E2RXO6WK_6eDniqQ'
class App extends React.Component {
  state = { images: [] };

  onSearchSubmit = async term => {
    try {
      const response = await axios.get(`${API_URL}search/photos`, {
        params: { query: term },
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY}`
        }
      });
      this.setState({ images: response.data.results });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  renderImages = () => {
    return this.state.images.map(image => (
      <img key={image.id} src={image.urls.regular} alt={image.alt_description} />
    ));
  };

  render() {
    return (
      <div className='ui container' style={{ marginTop: '10px' }}>
        <SearchBar onSubmit={this.onSearchSubmit} />
        <div className='image-list'>{this.renderImages()}</div>
      </div>
    );
  }
}

export default App;
