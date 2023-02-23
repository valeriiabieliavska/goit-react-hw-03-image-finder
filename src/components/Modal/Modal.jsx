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

  render() {
    const { url, onClose } = this.props;
    return (
      <div className="Overlay" onClick={onClose}>
        <div className="Modal">
          <img src={url} alt="IMG" />
        </div>
      </div>
    );
  }
}
