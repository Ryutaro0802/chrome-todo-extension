import { element } from "../util/html.js";

export class TodoItemView {
  /**
   * `todoItem`に対応するTodoアイテムのHTML要素を作成して返す
   * @param {TodoItemModel} todoItem
   * @param {function({id:string, completed: boolean})} onUpdateTodo チェックボックスの更新イベントリスナー
   * @param {function({id:string)}} onDeleteTodo 削除ボタンのクリックイベントリスナー
   * @param {function({id:string)}} onEditTodo TODO アイテムのテキストを編集するイベントリスナー
   * @returns {HTMLElement}
   */
  createElement(todoItem, { onUpdateTodo, onDeleteTodo, onEditTodo }) {
    const todoItemElement = (() => {
      const isCompleteClassName = todoItem.complete ? 'is-complete' : '';
      if (todoItem.isEditing) {
        return element`<li class="${isCompleteClassName}">
          <i class="material-icons checkbox">check_box</i>
          <span class="text"><input type="text" value="${todoItem.title}"></span>
          <button class="delete"><i class="material-icons">close</i></button>
        </li>`;
      } else {
        return element`<li class="${isCompleteClassName}">
          <i class="material-icons checkbox">check_box</i>
          <span class="text">${todoItem.title}</span>
          <button class="delete"><i class="material-icons">close</i></button>
        </li>`;
      }

      // if (todoItem.completed) {
      //   return element`<li class="is-complete">
      //     <i class="material-icons checkbox">check_box</i>
      //     <span class="text"><s>${todoItem.title}</s></span>
      //     <button class="delete"><i class="material-icons">close</i></button>
      //   </li>`;
      // } else {
      //   return element`<li>
      //     <i class="material-icons checkbox">check_box_outline_blank</i>
      //     <span class="text">${todoItem.title}</span>
      //     <button class="delete"><i class="material-icons">close</i></button>
      //   </li>`;
      // }
    })();

    const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
    inputCheckboxElement.addEventListener("click", () => {
      onUpdateTodo({
        id: todoItem.id,
        completed: !todoItem.completed
      });
    });

    const deleteButtonElement = todoItemElement.querySelector(".delete");
    deleteButtonElement.addEventListener("click", () => {
      onDeleteTodo({ id: todoItem.id });
    });

    const textElement = todoItemElement.querySelector(".text");
    textElement.addEventListener("click", () => {
      onEditTodo({
        id: todoItem.id
      });
    });
    
    const inputElement = textElement.querySelector('input');
    if (inputElement) {
      console.log(inputElement);
      inputElement.focus();
      debugger;
    }

    return todoItemElement;
  }
}
