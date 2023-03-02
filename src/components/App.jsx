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
      this.setState({ isLoading: true });
      fetchImages(this.state.query, this.state.page)
        .then(response => {
          this.setState(prev => ({
            images: [...prev.images, ...response.hits],
          }));
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  handleSubmit = query => {
    this.setState({ query});
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1}));
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
