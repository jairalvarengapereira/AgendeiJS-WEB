import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/Logotipo-branco.png";

function Navbar(){

  const navigate = useNavigate()

  function Logout(){
    navigate("/");
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('sessionId');
    localStorage.removeItem('sessionEmail');
    localStorage.removeItem('sessionName');
    
    api.defaults.headers.common['Autorization'] = "";
  }

  return <nav className="navbar fixed-top navbar-expand-lg bg-primary" data-bs-themne="dark">

    <div className="container-fluid">
      <Link className="navbar-brand" to="/appointments">
        <img className="navbar-logo" src={logo} alt="" />
      </Link>


      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        
        {/* Links d Navbar */}
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

          <li className="nav-item">
            <Link className="nav-link" to="/appointments">
              Agendamentos
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/doctors">
              Médicos
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/users">
              Pacientes
            </Link>
          </li>

        </ul>
        {/* ================ */}

        <ul className="navbar-nav">
          <li className="nav-item">

            <div className="btn-group">

            <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              {localStorage.getItem('sessionName')}
            </button>

            <ul className="dropdown-menu dropdown-menu-end">
              <li><Link className="dropdown-item" to="#">Meu Perfil</Link></li>
              <li><hr className="dropdown-divider"></hr></li>
              <li><button className="dropdown-item" onClick={ Logout }>Desconectar</button></li>
            </ul>

          </div>

            
          </li>
        </ul>


      </div>

 
        
    </div>
  </nav>
}

export default Navbar; 