import { Component } from 'react';

export class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.onEscape)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onEscape)
    }

    onEscape = (event) => {
        if (event.code === "Escape") {
            this.props.onClose();
        }
    }
    onClose = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };
  

  render() {
    const { url} = this.props;
    return (
      <div className="Overlay" onClick={this.onClose}>
        <div className="Modal">
          <img src={url} alt="IMG" />
        </div>
      </div>
    );
  }
}
