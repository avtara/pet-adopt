import React from 'react';

class Corausel extends React.Component {
  state = {
    photos: [],
    active: 0,
  };
  static getDerivedStateFromProps({ media }) {
    let photos = ['http://placecorgi.com/600/600'];

    if (media.length) {
      photos = media.map(({ large }) => large);
    }

    return { photos };
  }

  handleIndexClick(index) {
    this.setState({
      active: index,
    });
  }
  render() {
    const { photos, active } = this.state;

    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            //eslint-disable-next-line
            <img
              key="photo"
              onClick={this.handleIndexClick.bind(this, index)}
              //onKey={this.handle}
              data-index={index}
              src={photo}
              className={index === active ? 'active' : ''}
              alt="animal Thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Corausel;
