import logo from './logo.svg';
import './App.css';
import { Navbar } from './Component/Navbar/Navbar';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from './Component/Theme/DarkTheme';
import { Home } from './Component/Home/Home';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Navbar/>
      <Home/>
    </ThemeProvider>
  );
}

export default App;
