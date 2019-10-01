import { render } from "./util/html.js";
import { setItems, getItems } from "./util/store.js";
import { TodoListView } from "./view/TodoListView.js";
import { SwitchDarkModeView } from "./view/SwitchDarkModeView.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListModel } from "./model/TodoListModel.js";

export class App {
  constructor() {
    this.todoListView = new TodoListView();
    this.SwitchDarkModeView = new SwitchDarkModeView();
    this.todoListModel = new TodoListModel([]);
    this.mode = "light";
    this.TODO_ITEM_STORAGE_KEY = "todoItemStorageKey";
    this.MODE_KEY = "mode";
  }

  /**
   * localStorage からTodoListのアイテムを読み込む
   * @param {Array} storageItems localStorageのitem
   */
  handleLoad(storageItems) {
    if (storageItems.length) {
      storageItems.forEach(item => {
        this.handleAdd(item.title, item.completed);
      });
    } else {
      this.todoListModel.emitChange();
    }
  }

  /**
   * colorModeの切り替え
   */
  handleChangeMode() {
    console.log("handleChange");
    this.mode = this.mode === "light" ? "dark" : "light";
    setItems(this.MODE_KEY, JSON.stringify(this.mode));
  }

  /**
   * Todoを追加時に呼ばれるリスナー関数
   * @param {string} title
   */
  handleAdd(title, state = false) {
    this.todoListModel.addTodo(
      new TodoItemModel({
        title,
        completed: state
      })
    );
  }

  /**
   * Todoの状態を更新時に呼ばれるリスナー関数
   * @param {number} id
   * @param {boolean} completed
   */
  handleUpdate({ id, completed }) {
    this.todoListModel.updateTodo({ id, completed });
  }

  /**
   * Todoを削除時に呼ばれるリスナー関数
   * @param {number} id
   */
  handleDelete({ id }) {
    this.todoListModel.deleteTodo({ id });
  }

  /**
   * Todoを編集する時によばれるリスナー関数
   * @param {number} id
   * @param {string} title
   */
  handleEdit({ id }) {
    this.todoListModel.editTodo({ id });
  }

  /**
   * Todoを編集完了する時よばれるリスナー関数
   * @param {number} id
   * @param {string} title
   */
  handleEditComplete({ id, title }) {
    this.todoListModel.editCompleteTodo({ id, title });
  }

  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const todoCountElement = document.querySelector("#js-todo-count");
    const todoListContainerElement = document.querySelector("#js-todo-list");
    const switchModeContainerElement = document.querySelector(
      "#js-switch-mode-container"
    );
    const darkModeElement = this.SwitchDarkModeView.createElement({
      onChangeMode: () => {
        this.handleChangeMode();
      }
    });

    this.todoListModel.onChange(() => {
      const todoItems = this.todoListModel.getTodoItems();
      const todoListElement = this.todoListView.createElement(todoItems, {
        onUpdateTodo: ({ id, completed }) => {
          this.handleUpdate({ id, completed });
        },
        onDeleteTodo: ({ id }) => {
          this.handleDelete({ id });
        },
        onEditTodo: ({ id }) => {
          this.handleEdit({ id });
        },
        onEditCompleteTodo: ({ id, title }) => {
          this.handleEditComplete({ id, title });
        }
      });

      render(todoListElement, todoListContainerElement);
      todoCountElement.textContent = `Todo Items: ${this.todoListModel.totalCount}`;
      setItems(this.TODO_ITEM_STORAGE_KEY, JSON.stringify(todoItems));
    });

    render(darkModeElement, switchModeContainerElement);

    formElement.addEventListener("submit", e => {
      e.preventDefault();
      this.handleAdd(inputElement.value);
      inputElement.value = "";
    });

    // localStorage からTodoItemを読み込む
    const storageItems = JSON.parse(getItems(this.TODO_ITEM_STORAGE_KEY));
    this.handleLoad(storageItems);
  }
}
