import { Route, Routes } from "react-router";
import { BrowserRouter } from 'react-router-dom';
import ManagePage from './pages/ManagePage';
import LoginPage from './pages/LoginPage';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/manage/:username" element={<ManagePage />} />
        <Route path='/' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
