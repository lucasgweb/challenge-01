import fs from "node:fs/promises";

// returns the complete local path of this file
const filePath = import.meta.url;
const databasePath = new URL("../db.json", filePath);

export class Database {
  #database = {};

  #getDate() {
    return new Date().toLocaleString();
  }

  constructor() {
    fs.readFile(databasePath, "utf-8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persiste();
      });
  }

  #persiste() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  selectUnique(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      const data = this.#database[table][rowIndex];

      return data;
    }
  }

  select(table) {
    const data = this.#database[table] ?? [];

    return data;
  }

  insert(table, data) {
    data.created_at = this.#getDate();
    data.completed_at = null;
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persiste();

    return data;
  }

  update(table, id, data, isDone = false) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      data.updated_at = this.#getDate();
      data.completed_at = isDone ? this.#getDate() : null;
      this.#database[table][rowIndex] = { id, ...data };
      this.#persiste();
    }

    return data;
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persiste();
    }
  }
}
