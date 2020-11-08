import React from  'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './profile-view.scss';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      Username: props.user.Username,
      Password: props.user.Password,
      EmailId: props.user.EmailId,
      BirthDay: props.user.BirthDay,
      FavoriteMovies: props.user.FavoriteMovies
    };
  }

  updateUser(Username, Password, EmailId, BirthDay) {
    axios.put(`https://flix-world.herokuapp.com/users/${localStorage.getItem('user')}`,{
      Username: Username,
      Password: Password,
      EmailId: EmailId,
      BirthDay: BirthDay
    })
    .then((response) => {
      const data = response;
      console.log(data);
      alert(Username + ' has been updated');
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  deregisterUser(Username) {
    axios.delete(`https://flix-world.herokuapp.com/users/${localStorage.getItem('user')}`)
    .then(() => {
      alert(Username + ' has been deleted');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  removeFav(movie) {
    axios.delete(`https://flix-world.herokuapp.com/users/${localStorage.getItem('user')}/favoritemovies/${movie._id}`)
    .then((res) => {
      this.setState({
        FavoriteMovies : (`${localStorage.getItem}('user')`).FavoriteMovies
      });
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  render() {
    let { user, movies } = this.props;

    const { Username, Password, EmailId, BirthDay } = user;

    if(this.props.user.FavoriteMovies === undefined){
      return (
        <div className="profile-view">Not loaded yet</div>
      )
    }

    return (
      <ul>
        <li><h1>username: {this.props.user.Username}</h1></li>
        <li><h1>EmailId: {this.props.user.EmailId}</h1></li>
        <li><h1>FavoriteMovies: {this.props.user.FavoriteMovies}</h1></li>
        <li><h1>movies: {this.props.movies.map ( item => item.Title)}</h1></li>
      </ul>
    )
   
    
    let favMovie = [];
    // let favMovie = movies.filter((m) => this.state.FavoriteMovies.includes(m._id));
    // console.log(favMovie);

    for(let i=0; i < this.props.user.FavoriteMovies.length; i++) {
      let fm = movies.find((m) => {
        return m._id === parseInt(this.props.user.FavoriteMovies[i], 10);
      });
      favMovie.push(fm);
    }

    console.log(favMovie);


    return(
      <Container>
       
        <Form className="profile-view">
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Username" aria-label="Username" value={Username} onChange={(e) => {this.setState(
            {Username: e.target.value})
            if(! e.target.value){
              this.setState({Username: Username})
            }
          }}/>
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" aria-label="Password" value={Password} onChange={(e) => {this.setState({
            Password: e.target.value})
            if(! e.target.value){
              this.setState({Password: Password})
            }
            }} />
          <Form.Text classname="text-muted">
          Password should contain alphanumeric characters and must be of minimum 8 characters.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email ID</Form.Label>
          <Form.Check type="text" placeholder="EmailID" aria-label="Email ID" value={EmailId} onChange={(e) => {this.setState({
            EmailId: e.target.value})
            if(! e.target.value){
              this.setState({EmailId: EmailId})
            }
            }}/>
        </Form.Group>

        <Form.Group controlId="formBirthDay">
          <Form.Label>Birth Date</Form.Label>
          <Form.Check type="text" placeholder="Date of Birth" aria-label="Date of Birth" value={BirthDay} onChange={(e) => {this.setState({
            BirthDay: e.target.value})
            if(! e.target.value){
              this.setState({BirthDay: BirthDay})
            }
            }} />
        </Form.Group>

        <Button variant="outline-dark" type="submit" onClick={e => {
          e.preventDefault();
          this.updateUser(
            this.state.Username,
            this.state.Password,
            this.state.EmailId,
            this.state.BirthDay
          );
        }}>
            Update user info
        </Button>

        <Button variant="outline-dark" type="submit" onClick={e => {
          e.preventDefault();
          this.deregisterUser(Username);
        }}>
          Delete account
        </Button>
        
        <Row>
          {favMovie.map(m => (
            <Col md={3} key={m._id} classname="fav-card">
              <MovieCard key={m._id} movies={m} />
              <Button variant="outline-dark" type="submit" onClick={() => this.removeFav(m._id)}>
                Delete movie
              </Button>
            </Col>
          ))}
        </Row>
 
      </Form>

      </Container>
      
    );
  }
}

// ProfileView.propTypes = {
//   user: PropTypes.shape({
//     Username: PropTypes.string,
//     Password: PropTypes.string,
//     EmailId: PropTypes.string,
//     BirthDay: PropTypes.string,
//     FavoriteMovies: PropTypes.array
//   }),
//   movies: PropTypes.shape({
//     Title: PropTypes.string,
//     Description: PropTypes.string.isRequired,
//     ImageURL: PropTypes.string.isRequired,
//     Featured: PropTypes.boolean,
//     Genre: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Description: PropTypes.string.isRequired
//     }),
//     Director: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Bio: PropTypes.string.isRequired,
//       Birth: PropTypes.string.isRequired,
//       Death: PropTypes.string
//     })
//   })
// }