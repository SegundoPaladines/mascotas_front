import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { ListaMascotasComponent, MascotasComponent } from './components';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <MascotasComponent /> }></Route>
        <Route path='/mascotas' element={<ListaMascotasComponent />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
