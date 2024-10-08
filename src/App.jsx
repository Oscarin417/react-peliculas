import { useState } from 'react'
import axios from 'axios'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'

const API_KEY = '7ff1cf4c9adb83dc6060643ee2b47969'; // Reemplaza con tu API Key de TMDB
const BASE_URL = 'https://api.themoviedb.org/3/';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Función para buscar películas
  const searchMovies = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${BASE_URL}search/movie`, {
        params: {
          api_key: API_KEY,
          query: query,
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  // Función para agregar película a favoritos
  const addToFavorites = (movie) => {
    setFavorites([...favorites, movie]);
  };

  // Función para eliminar película de favoritos
  const removeFromFavorites = (movieId) => {
    setFavorites(favorites.filter((movie) => movie.id !== movieId));
  };

  return (
    <Container>
      <h1 className="my-4 text-center">Búsqueda de Películas</h1>

      <Form onSubmit={searchMovies} className="mb-4">
        <Form.Group controlId="query">
          <Form.Control
            type="text"
            placeholder="Buscar película..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-2">
          Buscar
        </Button>
      </Form>

      <Row>
        <Col>
          <h2>Resultados de la Búsqueda</h2>
          <Row>
            {movies.map((movie) => (
              <Col key={movie.id} md={4} className="mb-4">
                <Card>
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>{movie.overview.substring(0, 100)}...</Card.Text>
                    <Button
                      variant="success"
                      onClick={() => addToFavorites(movie)}
                    >
                      <i className="fas fa-heart"></i> Añadir a Favoritos
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        <Col>
          <h2>Películas Favoritas</h2>
          {favorites.length === 0 ? (
            <p>No has agregado ninguna película a favoritos.</p>
          ) : (
            <Row>
              {favorites.map((movie) => (
                <Col key={movie.id} md={4} className="mb-4">
                  <Card>
                    <Card.Img
                      variant="top"
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <Card.Body>
                      <Card.Title>{movie.title}</Card.Title>
                      <Button
                        variant="danger"
                        onClick={() => removeFromFavorites(movie.id)}
                      >
                        <i className="fas fa-trash"></i> Eliminar de Favoritos
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
