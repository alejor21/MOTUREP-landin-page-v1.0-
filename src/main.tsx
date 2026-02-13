
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";

  const rootElement = document.getElementById("root");
  
  if (rootElement) {
    createRoot(rootElement).render(<App />);
    
    // Remove loading indicator once React has rendered
    const loadingIndicator = rootElement.querySelector('.loading');
    if (loadingIndicator) {
      loadingIndicator.remove();
    }
  }
  