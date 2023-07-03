/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import db from '../lib/database.js'

class Admin {
  #tables = [
    'role',
    'account',
    'user',
    'film',
    'like',
    'like_film',
    'review',
    'like_review',
  ]

  static async initTables(queries) {
    for await (const table of this.dropAllTables(this.#tables)) {
      console.log(table)
    }
    for await (const table of this.resetAllTables(queries)) {
      console.log(table)
    }
  }

  static async *resetAllTables(queries) {
    for (const query of queries) {
      await db.execute(query)
    }
    yield 'Done!'
  }

  static async dropTable(name) {
    return db.execute('DROP TABLE ?', name)
  }

  static async *dropAllTables() {
    for (const table of this.#tables) {
      await dropTable(table)
    }
    yield 'All tables was dropped!'
  }

  static async createTable() {
    return db.execute(`
    CREATE TABLE role(
      role_id INT NOT NULL AUTO_INCREMENT UNSIGNED,
      role VARCHAR( 30 ) NOT NULL UNIQUE,
      PRIMARY KEY ( role_id ),
    )
    ENGINE = INNODB;`)
  }

  static async createUser({ lastname, firstname, email, password, role = 0 }) {
    return db.execute(
      'INSERT INTO users (id, lastname, firstname, email, password, role) VALUES (?, ?, ?, ?, ?, ?)',
      [null, lastname, firstname, email, password, role]
    )
  }

  static async findUserById(id) {
    return db.execute(
      'SELECT id, lastname, firstname, email, role FROM users WHERE users.id = ?',
      [id]
    )
  }

  static async deleteUserById(id) {
    return db.execute('DELETE FROM users WHERE users.id = ?', [id])
  }

  static async updateUserById(id, data) {
    let attributesToUpdateString = ''

    for (const attribute in data) {
      attributesToUpdateString += `${attribute}='${data[attribute]}' `
    }
    return db.execute(
      `UPDATE users SET ${attributesToUpdateString} WHERE users.id = ${id}`
    )
  }
}
