import { element } from "../util/html.js";

export class SwitchDarkModeView {
  constructor({ mode }) {
    this.mode = mode;
  }

  createElement({ onChangeMode }) {
    // TODO    i要素の中を書き換える
    const switchDarkModeElement = element`<div class="switch-mode">
            <a href="#" class="jsc-switch-mode">
                <i class="material-icons jsc-mode-icon"></i>
            </a>
        </div>`;

    const switchDarkModeAncElement = switchDarkModeElement.querySelector("a");
    switchDarkModeAncElement.addEventListener("click", () => {
      onChangeMode();
    });

    return switchDarkModeElement;
  }

  // init() {
  //   this.setParams();
  //   this.bindEvent();
  //   // dark-mode: 1
  //   // nomal-mode: 0
  //   if (this.isDarkMode) this.body.classList.add("dark-mode");
  //   this.icon.textContent = this.isDarkMode ? this.icons.sun : this.icons.moon;
  // }

  // setParams() {
  //   this.icons = {
  //     moon: "brightness_2",
  //     sun: "brightness_5"
  //   };
  //   // SessionStrageではstringになるため、~~でnumberにする
  //   this.isDarkMode = ~~(getItems("mode") || 0);
  //   this.switchTrigger = document.querySelector(".jsc-switch-mode");
  //   this.body = document.body;
  //   this.icon = document.querySelector(".jsc-mode-icon");
  // }

  // bindEvent() {
  //   this.switchTrigger.addEventListener("click", e => this.SwitchDarkMode(e));
  // }

  // SwitchDarkMode(e) {
  //   e.preventDefault();
  //   this.isDarkMode = this.isDarkMode ? 0 : 1;
  //   localStorage.setItem("mode", this.isDarkMode);
  //   this.body.classList.toggle("dark-mode");
  //   this.icon.textContent = this.isDarkMode ? this.icons.sun : this.icons.moon;
  // }
}
