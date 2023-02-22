import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { fetchImages } from 'services/apiServices';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      fetchImages(this.state.query, this.state.page).then(response => {
        this.setState(prev => ({
          images:
            this.state.page === 1
              ? [...response.hits]
              : [...prev.images, ...response.hits],
        }));
      });
    }
  }

  handleSubmit = query => {
    this.setState({ query });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={this.state.images} />
        {!!this.state.images.length && (
          <Button onLoadMore={this.handleLoadMore} />
        )}
      </>
    );
  }
}
