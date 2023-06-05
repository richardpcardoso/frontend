import { useEffect, useState } from "react";
import "./Open.css";
import "animate.css";
import api from "../../api/api";

import { useParams } from "react-router-dom";

function Open() {
  const [senha, setSenha] = useState();
  const [result, setResult] = useState();

  let { key } = useParams();
  console.log(key);

  function submitForm(event) {
    event.preventDefault();
    api
      .patch("/retrieve", {
        key: key,
        password: senha,
      })
      .then((response) => setResult(response.data))
      .catch((err) => {
        alert("ops! ocorreu um erro" + err);
      });
  }

  return (
    <form
      method="post"
      className="centro animate__animated animate__backInDown"
      onSubmit={submitForm}
    >
      <div className="title">
        <h1>SECRET MESSAGES</h1>
        <p>Comunique-se com segurança e privacidade absoluta.</p>
      </div>

      {result != null ? (
        <div className="d-flex flex-column g-1">
          {result.message == "Sorry, the message wasn't found!" ? (
            <div class="w-100 border-red">
              Desculpa, mas essa mensagem já foi vizualizada ou é invalida!
            </div>
          ) : (
            <div class="w-100 border-green text-white p-4">
              <h5 className="pb-4">MENSAGEM:</h5>
              {result.message}
            </div>
          )}

          <a
            className="btn btn-green"
            href={"/"}
          >
            ENVIAR MENSAGEM
          </a>
        </div>
      ) : (
        <>
          <input
            className="form-control border-green"
            type="password"
            placeholder="PASSWORD"
            name="password"
            onChange={(e) => setSenha(e.target.value)}
          />

          <div className="mensagem ">
            <button className="btn btn-green align-self-end">
              ABRIR MENSAGEM
            </button>
          </div>
        </>
      )}
    </form>
  );
}

export default Open;
