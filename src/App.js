import { render } from "./util/html.js";
import { setItems, getItems } from "./util/store.js";
import { TodoListView } from "./view/TodoListView.js";
import { SwitchDarkModeView } from "./view/SwitchDarkModeView.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListModel } from "./model/TodoListModel.js";

export class App {
  constructor() {
    this.TODO_ITEM_STORAGE_KEY = "todoItemStorageKey";
    this.MODE_KEY = "mode";
    this.DARK_MODE_CLASS_NAME = "dark-mode";
    this.todoListView = new TodoListView();
    this.SwitchDarkModeView = new SwitchDarkModeView();
    this.todoListModel = new TodoListModel([]);
    this.mode = JSON.parse(getItems(this.MODE_KEY)) || "light";
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
    const switchModeContainerElement = document.querySelector(
      "#js-switch-mode-container"
    );
    const darkModeElement = this.SwitchDarkModeView.createElement({
      onChangeMode: () => {
        this.handleChangeMode();
      },
      mode: this.mode === "dark" ? "light" : "dark"
    });
    this.mode = this.mode === "light" ? "dark" : "light";
    setItems(this.MODE_KEY, JSON.stringify(this.mode));
    render(darkModeElement, switchModeContainerElement);

    this.handleSwitchModeClass();
  }

  handleSwitchModeClass() {
    const bodyElement = document.querySelector("body");
    if (this.mode === "dark") {
      bodyElement.classList.add(this.DARK_MODE_CLASS_NAME);
    } else {
      bodyElement.classList.remove(this.DARK_MODE_CLASS_NAME);
    }
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
      },
      mode: this.mode === "dark" ? "light" : "dark"
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
    this.handleSwitchModeClass();

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
