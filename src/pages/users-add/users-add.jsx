import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.jsx";
import api from "../../constantes/api.js";

function UsersAdd() {
  const { id_user } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({ name: "", email: "", fone: "", cep: "", logr: "", num: "", compl: "", bairro: "", cidade: "", uf: "" });

  async function loadUser(id) {
    try {
      const response = await api.get(`/users/${id}`);
      console.log(response.data);
      if (response.data) {
        const userData = Array.isArray(response.data) ? response.data[0] : response.data;
        setUser({
          ...userData,
        });
      }
    } catch (error) {
      alert("Erro ao carregar paciente");
      console.error("Erro:", error);
    }
  }

  async function saveUser() {
    const json = {
      name: user.name,
      email: user.email,
      fone: user.fone,
      cep:user.cep,
      logr: user.logr,
      num: user.num,
      compl: user.compl,
      bairro: user.bairro,
      cidade: user.cidade,
      uf: user.uf,
      id_user: id_user
    };
    
    
    try {
      
      console.log(id_user);
      const response = id_user
      ? await api.put(`/users/${id_user}`, json)
      : await api.post("/users", json);
      
      if (response.status === 200 || response.status === 201) {
        console.log("Paciente salvo com sucesso:", response.data);
        navigate("/users");
      }
    } catch (error) {
      console.error("❌ Erro ao salvar paciente:", error);
    }
  }

  useEffect(() => {
    if (id_user) {
      loadUser(id_user);
    }
  }, [id_user]);

  return (
    <>
      <Navbar />
      <div className="container-fluid mt-page">
        <div className="row col-lg-4 offset-lg-4">
          <div className="col-12 mt-2">
            <h2>{id_user ? "Editar Paciente" : "Novo Paciente"}</h2>
          </div>

          {/* Nome do Paciente */}
          <div className="col-12 mt-4">
            <label htmlFor="name" className="form-label">Nome</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              value={user.name}
              onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Nome paciente"
            />
          </div>

          {/* Email do Paciente */}
          <div style={{ width: '50%' }} className="col-12 mt-4">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              value={user.email}
              onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="Email paciente"
            />
          </div>

          {/* Telefone do Paciente */}
          <div style={{ width: '50%' }} className="col-12 mt-4">
            <label htmlFor="fone" className="form-label">Telefone</label>
            <input
              type="tel"
              name="fone"
              id="fone"
              className="form-control"
              value={user.fone}
              onChange={(e) => setUser((prev) => ({ ...prev, fone: e.target.value }))}
              placeholder="Telefone paciente"
            />
          </div>

          {/* CEP do Paciente */}
          <div style={{ width: '30%' }} className="col-12 mt-4">
            <label htmlFor="cep" className="form-label">CEP</label>
            <input
              type="number"
              name="cep"
              id="cep"
              className="form-control"
              value={user.cep}
              onChange={(e) => setUser((prev) => ({ ...prev, cep: e.target.value }))}
              placeholder="CEP"
            />
          </div>

          {/* Logradouro do Paciente */}
          <div style={{ width: '70%' }} className="col-12 mt-4">
            <label htmlFor="logr" className="form-label">Logradouro (Av., rua, viela, estrada,...)</label>
            <input
              type="text"
              name="logr"
              id="logr"
              className="form-control"
              value={user.logr}
              onChange={(e) => setUser((prev) => ({ ...prev, logr: e.target.value }))}
              placeholder="Logradouro paciente"
            />
          </div>

          {/* Número da residência do Paciente */}
          <div style={{ width: '50%' }} className="col-12 mt-4">
            <label htmlFor="num" className="form-label">Número</label>
            <input
              type="text"
              name="num"
              id="num"
              className="form-control"
              value={user.num}
              onChange={(e) => setUser((prev) => ({ ...prev, num: e.target.value }))}
              placeholder="Número"
            />
          </div>

          {/* Complemento do Paciente */}
          <div style={{ width: '50%' }} className="col-12 mt-4">
            <label htmlFor="compl" className="form-label">Complemento</label>
            <input
              type="text"
              name="compl"
              id="compl"
              className="form-control"
              value={user.compl}
              onChange={(e) => setUser((prev) => ({ ...prev, compl: e.target.value }))}
              placeholder="Complemento do endereço"
            />
          </div>

          {/* Bairro do Paciente */}
          <div className="col-12 mt-4">
            <label htmlFor="bairro" className="form-label">Bairro</label>
            <input
              type="text"
              name="bairro"
              id="bairro"
              className="form-control"
              value={user.bairro}
              onChange={(e) => setUser((prev) => ({ ...prev, bairro: e.target.value }))}
              placeholder="Bairro paciente"
            />
          </div>

          {/* Cidade do Paciente */}
          <div style={{ width: '80%' }} className="col-12 mt-4">
            <label htmlFor="cidade" className="form-label">Cidade</label>
            <input
              type="text"
              name="cidade"
              id="cidade"
              className="form-control"
              value={user.cidade}
              onChange={(e) => setUser((prev) => ({ ...prev, cidade: e.target.value }))}
              placeholder="Cidade paciente"
            />
          </div>

          {/* UF do Paciente */}
          <div style={{ width: '20%' }} className="col-12 mt-4">
            <label htmlFor="uf" className="form-label">UF</label>
            <select
              name="uf"
              id="uf"
              className="form-select"
              value={user.uf}
              onChange={(e) => setUser((prev) => ({ ...prev, uf: e.target.value }))}
            >
              <option value="AC">AC</option>
              <option value="AL">AL</option>
              <option value="AP">AP</option>
              <option value="AM">AM</option>
              <option value="BA">BA</option>
              <option value="CE">CE</option>
              <option value="DF">DF</option>
              <option value="ES">ES</option>
              <option value="GO">GO</option>
              <option value="MA">MA</option>
              <option value="MT">MT</option>
              <option value="MS">MS</option>
              <option value="MG">MG</option>
              <option value="PA">PA</option>
              <option value="PB">PB</option>
              <option value="PR">PR</option>
              <option value="PE">PE</option>
              <option value="PI">PI</option>
              <option value="RJ">RJ</option>
              <option value="RN">RN</option>
              <option value="RS">RS</option>
              <option value="RO">RO</option>
              <option value="RR">RR</option>
              <option value="SC">SC</option>
              <option value="SP">SP</option>
              <option value="SE">SE</option>
              <option value="TO">TO</option>
            </select>
          </div>

          {/* Botões */}
          <div className="col-12 mt-4">
            <div className="d-flex justify-content-end">
              <Link to="/users" className="btn btn-outline-primary me-3">
                Cancelar
              </Link>
              <button
                onClick={saveUser}
                type="button"
                className="btn btn-primary ms-2"
              >
                Salvar Dados
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UsersAdd;
