import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AnimeBrowsePage from './pages/AnimeBrowsePage';
import MangaBrowsePage from './pages/MangaBrowsePage';
import WatchPage from './pages/WatchPage';
import ReadingPage from './pages/ReadingPage';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/anime" element={<AnimeBrowsePage />} />
          <Route path="/manga" element={<MangaBrowsePage />} />
          <Route path="/watch" element={<WatchPage />} />
          <Route path="/read" element={<ReadingPage />} />
          <Route path="/community" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
