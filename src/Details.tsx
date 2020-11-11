import React, { lazy } from 'react';
import pet, {Photo} from '@frontendmasters/pet';
import Corausel from './Corausel';
import { navigate, RouteComponentProps } from '@reach/router';
import ErrorBoundary from './ErrorBoundary';
import ThemeContext from './ThemeContext';

const Modal = lazy(() => import('./Modal'));


class Details extends React.Component<RouteComponentProps<{id:string}>> {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     loading: true,
  //   };
  // }

  state = { 
    loading: true, 
    showModal: false, 
    name: "", 
    animal:"", 
    location:"", 
    description:"", 
    media:[] as Photo[],
    url:"",
    breed:"" 
  };

  componentDidMount() {
    if(!this.props.id){
      navigate("/");
      return;
    }
    pet
      .animal(+this.props.id)
      .then(({ animal }) => {
        this.setState({
          url: animal.url,
          name: animal.name,
          animal: animal.type,
          location: `${animal.contact.address.city} - ${animal.contact.address.state}`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary,
          loading: false,
        });
      })
      .catch((err: Error) => this.setState({ error: err }));
  }
  public toggleModal = () => this.setState({ showModal: !this.state.showModal });
  public adopt = () => navigate(this.state.url);
  public render() {
    if (this.state.loading) {
      return <h1>Loading ...</h1>;
    }

    const {
      animal,
      name,
      location,
      description,
      media,
      breed,
      showModal,
    } = this.state;

    return (
      <div className="details">
        <Corausel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name} ?</h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default function DetailsWithErrorBoundary(
  props: RouteComponentProps<{id:string}>
  ) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
