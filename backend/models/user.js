

const db = require('../db');
class User {
  static async createUser(cookies) {
    try {
      let userId;
      const userCookie = cookies;
      console.log(userCookie)
      if (userCookie && userCookie.userId) {
        const user = await db.query('SELECT id FROM users WHERE id = ?;', [userCookie.userId]);
        if (user.length > 0) {
          userId = user[0].id;
        }
      }
      if (!userId) {
        // Obtener el valor máximo actual de id y agregar 1 para el nuevo id
        const maxIdResult = await db.query('SELECT MAX(id) AS maxId FROM users;');
        const newId = maxIdResult[0].maxId + 1;

        // Insertar el nuevo usuario con el nuevo id
        const result = await db.query('INSERT INTO users (id) VALUES (?);', [newId]);
        userId = result.insertId;

        // Crear una nueva cookie con el id del usuario
      // setCookie('userId', userId, 365); // Esto debería manejarse en la capa de ruta

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