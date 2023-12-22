import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { Canvas } from "@react-three/fiber";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <div style={{ width: "100vw", height: "100vh" }}>
    <Canvas camera={{ position: [0, 0, 150], near: 1, far: 1000000 }}>
      <ambientLight intensity={0.01} />
      <App />
    </Canvas>
  </div>
);
