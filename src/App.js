import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HeaderComponent, ListaMascotasComponent, MascotasComponent } from './components';

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        <Route path='/' element={ <MascotasComponent /> } />
        <Route path='/mascotas' element={<ListaMascotasComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
