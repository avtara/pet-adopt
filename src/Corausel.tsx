import React from 'react';
import {Photo} from "@frontendmasters/pet";

interface IProps {
  media: Photo[];
}

interface IState {
  active: number;
  photos: string[];
}

class Corausel extends React.Component<IProps, IState> {
  state = {
    photos: [],
    active: 0,
  };
  static getDerivedStateFromProps({ media } : IProps) {
    let photos = ['http://placecorgi.com/600/600'];

    if (media.length) {
      photos = media.map(({ large }) => large);
    }

    return { photos };
  }

  public handleIndexClick = (event: React.MouseEvent<HTMLElement>) => {
    if(!(event.target instanceof HTMLElement)){
      return;
    }
    if(event.target.dataset.index){
      this.setState({
        active: +event.target.dataset.index,
      });
    }
  }
  public render() {
    const { photos, active } = this.state;

    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key="photo"
              onClick={this.handleIndexClick}
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
