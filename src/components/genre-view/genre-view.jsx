import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './genre-view.scss';
import { Link } from 'react-router-dom';

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genre } = this.props;

    if(! (genre.Name) ) return null;

    return(

      <div>
        <div className="genre-name">
          <span className="label">Name: </span>
          <span className="value">{genre.Name}</span>
        </div>

        <div className="genre-desc">
          <span className="label">Description: </span>
          <span className="value">{genre.Description}</span>
        </div>

        <Link to={`../`}>
          <Button>
            Back
          </Button>
        </Link>

      </div>


    )

  }

}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired
};