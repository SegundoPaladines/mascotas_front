import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { MascotasComponent } from './components';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={ <MascotasComponent /> }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
