import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { fetchImages } from 'services/apiServices';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    totalImages: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      fetchImages(this.state.query, this.state.page)
        .then(response => {
          this.setState(prev => ({
            images:
              this.state.page === 1
                ? [...response.hits]
                : [...prev.images, ...response.hits],
            totalImages: response.totalHits,
          }));
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  handleSubmit = query => {
    this.setState({ query, isLoading: true, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1, isLoading: true }));
  };

  renderButtonOrLoader = () => {
    return this.state.isLoading ? (
          <Loader />
        ) : (
          !!this.state.images.length &&
          this.state.images.length < this.state.totalImages && (
            <Button onLoadMore={this.handleLoadMore} />
          )
        )
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={this.state.images} />
        {this.renderButtonOrLoader()}
      </>
    );
  }
}
