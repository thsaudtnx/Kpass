import { Route, Routes } from "react-router";
import { BrowserRouter } from 'react-router-dom';
import ManagePage from './pages/ManagePage';
import LoginPage from './pages/LoginPage';
import { LogContextProvider } from './contexts/LogContext';


const App = () => {
  return (
    <BrowserRouter>
      <LogContextProvider>
        <Routes>
          <Route path="/manage" element={<ManagePage />} />
          <Route path='/' element={<LoginPage />} />
        </Routes>
      </LogContextProvider>
    </BrowserRouter>
  );
}

export default App;
