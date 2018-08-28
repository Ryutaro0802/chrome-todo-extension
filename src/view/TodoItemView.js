import { element } from "../util/html.js";

export class TodoItemView {
  /**
   * `todoItem`に対応するTodoアイテムのHTML要素を作成して返す
   * @param {TodoItemModel} todoItem
   * @param {function({id:string, completed: boolean})} onUpdateTodo チェックボックスの更新イベントリスナー
   * @param {function({id:string)}} onDeleteTodo 削除ボタンのクリックイベントリスナー
   * @param {function({id:string)}} onEditTodo TODO アイテムのテキストを編集するイベントリスナー
   * @param {function({id:string)}} onEditCompleteTodo TODO アイテムのテキストが編集し終わったら呼ぶリスナー
   * @returns {HTMLElement}
   */
  createElement(
    todoItem,
    { onUpdateTodo, onDeleteTodo, onEditTodo, onEditCompleteTodo }
  ) {
    const todoItemElement = (() => {
      const isCompleteClassName = todoItem.completed ? "is-complete" : "";
      // todo 要修正
      const checkIcon = todoItem.completed
        ? `<i class="material-icons checkbox">check_circle</i>`
        : `<i class="material-icons checkbox">check_circle_outline</i>`;
      console.log(checkIcon);
      if (todoItem.isEditing) {
        return element`<li class="${isCompleteClassName}">
          ${checkIcon}
          <div class="text">
            <input type="text" value="${todoItem.title}">
          </div>
          <button class="delete"><i class="material-icons">close</i></button>
        </li>`;
      } else {
        return element`<li class="${isCompleteClassName}">
          ${checkIcon}
          <div class="text">
            <span class="todo-title">${todoItem.title}</span>
          </div>
          <button class="delete"><i class="material-icons">close</i></button>
        </li>`;
      }
    })();

    const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
    if (inputCheckboxElement) {
      inputCheckboxElement.addEventListener("click", () => {
        onUpdateTodo({ id: todoItem.id, completed: !todoItem.completed });
      });
    }

    const deleteButtonElement = todoItemElement.querySelector(".delete");
    deleteButtonElement.addEventListener("click", () => {
      onDeleteTodo({ id: todoItem.id });
    });

    const todoTitleElement = todoItemElement.querySelector(".todo-title");
    if (todoTitleElement) {
      todoTitleElement.addEventListener("click", () => {
        onEditTodo({ id: todoItem.id });
      });
    }

    const inputElement = todoItemElement.querySelector("input[type='text']");
    if (inputElement) {
      setTimeout(() => {
        const valueLength = inputElement.value.length;
        inputElement.focus();
        inputElement.setSelectionRange(valueLength, valueLength);
      }, 20);
      inputElement.addEventListener("blur", () => {
        onEditCompleteTodo({ id: todoItem.id, title: inputElement.value });
      });
    }

    return todoItemElement;
  }
}
