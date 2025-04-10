import { Routes, Route } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <Container>
      <Typography variant="h4" sx={{ my: 2 }}>Vite + React + MUI + Router + Redux</Typography>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Container>
  );
}
export default App;
