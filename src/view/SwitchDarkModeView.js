import { element } from "../util/html.js";

export class SwitchDarkModeView {
  constructor() {
    this.icons = {
      moon: "brightness_2",
      sun: "brightness_5"
    };
    this.mode = "light";
  }

  createElement({ onChangeMode, mode }) {
    this.mode = mode;
    const iconText = this.mode === "light" ? this.icons.sun : this.icons.moon;
    const switchDarkModeElement = element`<div class="switch-mode">
            <a href="#" class="jsc-switch-mode">
                <i class="material-icons jsc-mode-icon">
                  ${iconText}
                </i>
            </a>
        </div>`;
    const switchDarkModeAncElement = switchDarkModeElement.querySelector("a");
    switchDarkModeAncElement.addEventListener("click", e => {
      e.preventDefault();
      onChangeMode();
    });

    return switchDarkModeElement;
  }
}
