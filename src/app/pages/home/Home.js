import { useEffect, useState } from "react";
import "./Home.css";
import "animate.css";
import api from "../../api/api";

import ReactDOM from "react-dom";
import QRCode from "react-qr-code";

function Home() {
  const [message, setMessage] = useState();
  const [senha, setSenha] = useState();
  const [result, setResult] = useState();
  const [isCopied, setIsCopied] = useState(false);

  function submitForm(event) {
    event.preventDefault();
    api
      .post("/store", {
        message: message,
        password: senha,
      })
      .then((response) => setResult(response.data))
      .catch((err) => {
        alert("ops! ocorreu um erro" + err);
      });
  }

  // This is the function we wrote earlier
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(window.location.href + "open/" + result.key)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form
      method="post"
      className="centro animate__animated animate__fadeIn"
      onSubmit={submitForm}
    >
      <div className="title">
        <h1>SECRET MESSAGES</h1>
        <p>Comunique-se com segurança e privacidade absoluta.</p>
      </div>

      {result != null ? (
        <div className="d-flex flex-column g-1">
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "225px" }}
            value={window.location.href + "open/" + result.key}
            viewBox={`0 0 256 256`}
          />
          <div>
            <button
              type="button"
              className="btn btn-green"
              onClick={handleCopyClick}
            >
              <span>{isCopied ? "Copiado!" : "Copiar link"}</span>
            </button>
            <a
              className="btn btn-green"
              target="_blank"
              href={window.location.href + "open/" + result.key}
            >
              Abrir link
            </a>
          </div>
        </div>
      ) : (
        <>
          <input
            required
            className="form-control border-green"
            type="password"
            placeholder="PASSWORD"
            name="password"
            onChange={(e) => setSenha(e.target.value)}
          />

          <div className="mensagem border-green">
            <textarea
              required
              className="form-control"
              type="text"
              name="message"
              placeholder="DIGITE UMA MENSAGEM"
              onChange={(e) => setMessage(e.target.value)}
            />

            <button className="btn btn-green align-self-end">
              CRIPTOGRAFAR
            </button>
          </div>
        </>
      )}
    </form>
  );
}

export default Home;
