import { element } from "../util/html.js";
import { TodoItemView } from "./TodoItemView.js";

export class TodoListView {
  /**
   * `todoItems`に対応するTodoリストのHTML要素を作成して返す
   * @param {TodoItemModel[]} todoItems TodoItemModelの配列
   * @param {function({id:string, completed: boolean})} onUpdateTodo チェックボックスの更新イベントリスナー
   * @param {function({id:string)}} onDeleteTodo 削除ボタンのクリックイベントリスナー
   * @param {function({id:string)}} onEditTodo TODO アイテムのテキストを編集するイベントリスナー
   * @returns {HTMLElement} TodoItemModelの配列に対応したリストのHTML要素
   */
  createElement(
    todoItems,
    { onUpdateTodo, onDeleteTodo, onEditTodo, onEditCompleteTodo }
  ) {
    console.log(todoItems.length);
    if (todoItems.length) {
      const todoListElement = element`<ul />`;
      todoItems.forEach(todoItem => {
        const todoItemView = new TodoItemView();
        const todoItemElement = todoItemView.createElement(todoItem, {
          onDeleteTodo,
          onUpdateTodo,
          onEditTodo,
          onEditCompleteTodo
        });
        todoListElement.appendChild(todoItemElement);
      });
      return todoListElement;
    } else {
      return element`<div class="no-tasks">
        <i class="material-icons">sentiment_satisfied_alt</i>
        <p>No tasks</p>
      </div>`;
    }
  }
}
