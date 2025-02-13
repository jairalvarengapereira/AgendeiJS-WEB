import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/Logotipo.png"
import fundo from "../../assets/images/Fundo.jpg";
import { useState } from "react";
import api from "../../constantes/api.js";

function Register(){

  const navigate = useNavigate();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [msg, setMsg] = useState("");

  async function executeAccount() {
    setMsg("");

    if (password!== password2){
      setMsg("Senhas não conferem.");
      return;
    }

    try {
      const response = await api.post("/admin/register", {
        name,
        email,
        password,
      });

      if (response.data){
        localStorage.setItem("sessionToken", response.data.token);
        localStorage.setItem("sessionId", response.data.id_admin);
        localStorage.setItem("sessionEmail", response.data.email);
        localStorage.setItem("sessionName", response.data.name);

        // Adiciona token no cabeçalho das requisições para autenticação
        api.defaults.headers.common['Autorization'] = "Bearer" + response.data.token;

        navigate("/appointments");
      }else{
        setMsg("Erro ao efetuar login. Tente mais tarde.");
      }

    } catch (error) {
      if(error.response?.data.error)
        setMsg(error.response.data.error);
      else
        setMsg("Erro ao efetuar login. Tente mais tarde.");
    }
  }

  return<div className="row">

    <div className="col-sm-5 d-flex justify-content-center align-items-center text-center">
      <form className="frm-signin">
        <img src={logo} className="logo mb-4" />
        <h5 className="mb-5">Crie sua conta agora mesmo.</h5>
        <h5 className="mb-4 text-secondary">Preencha os campos abaixo</h5>

        <div className="mt-4">
          <input 
            type="text" 
            placeholder="Nome" 
            required 
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mt-2">
          <input 
            type="email" 
            placeholder="E-mail" 
            required 
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mt-2">
          <input 
            type="password" 
            placeholder="Senha" 
            required 
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mt-2">
          <input 
            type="password" 
            placeholder="Confirmar senha" 
            required 
            className="form-control"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>

        <div className="mt-3 mb-5">
          <button onClick={executeAccount} className="btn btn-primary w-100" type="button">
            Criar minha conta
          </button>
        </div>

        { //Tratamento de erro - Condição de se msg existir, então (&&) exibe a mensagem abaixo
          msg.length > 0 && 
          <div className="alert alert-danger" role="alert">
            {msg}
          </div>
        }

        <div>
          <span className="me-1">Já tenho conta. </span> 
            <Link to="/"> Acessa agora!</Link>
        </div>
      </form>

    </div>

    <div className="col-sm-7">
      <img src={fundo} className="background-login" />
    </div>

  </div>
}

export default Register;