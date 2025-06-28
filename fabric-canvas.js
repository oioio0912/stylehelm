// public/fabric-canvas.js
import "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/4.1.0/fabric.min.js";

class FabricCanvas extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // Wait for fabric to load
    const waitForFabric = () => {
      if (window.fabric) {
        this.renderCanvas();
      } else {
        setTimeout(waitForFabric, 50);
      }
    };
    waitForFabric();
  }

  renderCanvas() {
    const fabric = window.fabric;
    const canvasEl = document.createElement("canvas");
    canvasEl.width = 200;
    canvasEl.height = 400;
    canvasEl.style.border = "1px solid #ccc";
    this.shadowRoot.innerHTML = ''; // Clear any previous content
    this.shadowRoot.appendChild(canvasEl);

    const canvas = new fabric.Canvas(canvasEl);
    const rect = new fabric.Rect({
      left: 50,
      top: 100,
      width: 100,
      height: 100,
      fill: "red"
    });
    canvas.add(rect);
  }
}

if (!customElements.get("fabric-canvas")) {
  customElements.define("fabric-canvas", FabricCanvas);
}
