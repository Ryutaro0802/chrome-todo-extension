import { EventEmitter } from "../EventEmitter.js";

export class TodoListModel extends EventEmitter {
  /**
   * @param {TodoItemModel[]} [items] 初期アイテム一覧（デフォルトは空の配列）
   */
  constructor(items = []) {
    super();
    this.items = items;
  }

  /**
   * TodoItemの合計数を返す
   * @returns {number}
   */
  get totalCount() {
    return this.items.length;
  }

  /**
   * 表示できるTodoItemの配列を返す
   * @returns {TodoItemModel[]}
   */
  getTodoItems() {
    return this.items;
  }

  /**
   * TodoListの状態が更新されたときに呼び出されるリスナー関数を登録する
   * @param {Function} listener
   * @returns {Function} イベントリスナーの登録を解除する関数を返す
   */
  onChange(listener) {
    this.addEventLister("change", listener);
    return () => {
      this.removeEventLister("change", listener);
    };
  }

  /**
   * 状態が変更されたときに呼ぶ。登録済みのリスナー関数を呼び出す
   */
  emitChange() {
    this.emit("change");
  }

  /**
   * TodoItemを追加する
   * @param {TodoItemModel} todoItem
   */
  addTodo(todoItem) {
    this.items.push(todoItem);
    this.emitChange();
  }

  /**
   * 指定したidのTodoItemのcompletedを更新する
   * @param {number} id
   * @param {boolean} completed
   */
  updateTodo({ id, completed }) {
    const todoItem = this.items.find(todo => todo.id === id);
    if (!todoItem) {
      return;
    }
    todoItem.completed = completed;
    this.emitChange();
  }

  /**
   * 指定したidのTodoItemを削除する
   * @param {number} id
   */
  deleteTodo({ id }) {
    this.items = this.items.filter(todo => todo.id !== id);
    this.emitChange();
  }

  /**
   * 指定したidのTodoItemを編集状態にする
   * @param {number} id
   */
  editTodo({ id }) {
    const todoItem = this.items.find(todo => todo.id === id);
    if (!todoItem) {
      return;
    }
    todoItem.isEditing = true;
    this.emitChange();
  }

  /**
   * 指定したidのTodoItemのtitleを更新してisEditingの状態を変更
   * @param {number} id
   * @param {string} title
   */
  editCompleteTodo({ id, title }) {
    const todoItem = this.items.find(todo => todo.id === id);
    if (!todoItem) {
      return;
    }
    todoItem.isEditing = false;
    todoItem.title = title;
    this.emitChange();
  }
}
