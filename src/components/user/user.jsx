import React from "react";

function User(props) {
  return (
    <tr>
      <td>{props.user}</td>
      <td>{props.email}</td>
      <td>{props.fone}</td>
      <td>{props.cep}</td>
      <td>{props.logr}</td>
      <td>{props.num}</td>
      <td>{props.compl}</td>
      <td>{props.bairro}</td>
      <td>{props.cidade}</td>
      <td>{props.uf}</td>

      <td className="text-end">
        <div className="d-inline me-3">
          <button
            onClick={() => props.clickEdit(props.id_user)}
            className="btn btn-primary btn-sm"
          >
            <i className="bi bi-pencil-square"></i>
          </button>
        </div>

        <button
          onClick={() => props.clickDelete(props.id_user)}
          className="btn btn-danger btn-sm"
        >
          <i className="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  );
}

export default User;
