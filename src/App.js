import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Router from "./app/router";
import Open from "./app/pages/open/Open";

function App() {
  return (
    <div class="content">
      <div className="foto-1">
        <video
          width={"100%"}
          height={"100vh"}
          loop="true"
          autoplay="true"
          muted
        >
          <source src="/media/video4.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="formulario">
        <Router />
      </div>
    </div>
  );
}

export default App;
