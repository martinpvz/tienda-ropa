// models/User.js
const db = require('../db');

class User {
  static async createUser() {
    try {
      let userId;
      const userCookie = getCookies(); // Obtener la cookie del usuario

      if (userCookie && userCookie.userId) { // Si la cookie existe, verificar si el usuario ya existe en la base de datos
        const user = await db.query('SELECT id FROM users WHERE id = ?;', [userCookie.userId]);
        if (user.length > 0) {
          userId = user[0].id;
        }
      }

      if (!userId) { // Si la cookie no existe o el usuario no existe en la base de datos, crear un nuevo usuario
        const result = await db.query('INSERT INTO users (created_at) VALUES (NOW());');
        userId = result.insertId; // Obtener el id del nuevo usuario

        // Crear una nueva cookie con el id del usuario
       setCookie('userId', userId, 365);

        // Crear un nuevo carrito de compras para el usuario
        await db.query('INSERT INTO carts (user_id) VALUES (?);', [userId]);
      }

      return userId;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = User;