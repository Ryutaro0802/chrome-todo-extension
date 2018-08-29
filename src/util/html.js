export function htmlToElement(html) {
  const template = document.createElement("template");
  template.innerHTML = html;
  return template.content.firstElementChild;
}

/**
 * HTML 文字列からDOM Nodeを作成して返す
 * @return {HTMLElement}
 */
export function element(strings, ...values) {
  const htmlString = strings.reduce((result, string, i) => {
    const value = values[i - 1];
    return result + String(value) + string;
  });
  return htmlToElement(htmlString);
}

/**
 * コンテナ要素の中身をbodyElementで上書きする
 * @param {HTMLElement} bodyElement コンテナ要素の中身となる要素
 * @param {HTMLElement} containerElement コンテナ要素
 */
export function render(bodyElement, containerElement) {
  containerElement.innerHTML = "";
  containerElement.appendChild(bodyElement);
}
