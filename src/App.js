import { BrowserRouter, Route,Routes } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar';
import Usuario from './Pages/Usuario';
import UsuarioList from './Pages/UsuarioList';
import EditUsuario from './Pages/EditUsuario';

function App() {
  return (
    <div>
      <BrowserRouter>
       <NavBar />
        <Routes>
          <Route path='/criar' element= {<Usuario />} />
          <Route path='/' element= {<UsuarioList />} />
          <Route path='/atualizar/:id' element= {<EditUsuario />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
