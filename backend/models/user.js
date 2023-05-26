// // // models/User.js
// // const db = require('../db');

// // class User {
// //   static async createUser() {
// //     try {
// //       let userId;
// //       const userCookie = getCookies(); // Obtener la cookie del usuario

// //       if (userCookie && userCookie.userId) { // Si la cookie existe, verificar si el usuario ya existe en la base de datos
// //         const user = await db.query('SELECT id FROM users WHERE id = ?;', [userCookie.userId]);
// //         if (user.length > 0) {
// //           userId = user[0].id;
// //         }
// //       }

// //       if (!userId) { // Si la cookie no existe o el usuario no existe en la base de datos, crear un nuevo usuario
// //         const result = await db.query('INSERT INTO users (created_at) VALUES (NOW());');
// //         userId = result.insertId; // Obtener el id del nuevo usuario

// //         // Crear una nueva cookie con el id del usuario
// //        setCookie('userId', userId, 365);

// //         // Crear un nuevo carrito de compras para el usuario
// //         await db.query('INSERT INTO carts (user_id) VALUES (?);', [userId]);
// //       }

// //       return userId;
// //     } catch (err) {
// //       throw err;
// //     }
// //   }
// // }

// // module.exports = User;
// const db = require('../db');
// const cookie = require('cookie');

// class User {
//   static getCookies(cookieHeader) {
//     const cookies = cookie.parse(cookieHeader || '');
//     return cookies;
//   }

//   static setCookie(res, name, value, options = {}) {
//     const serializedCookie = cookie.serialize(name, value, options);
//     res.setHeader('Set-Cookie', serializedCookie);
//   }

//   static async createUser(req, res) {
//     try {
//       let userId;
//       const userCookie = User.getCookies(req.headers.cookie); // Obtener la cookie del usuario

//       if (userCookie && userCookie.userId) { // Si la cookie existe, verificar si el usuario ya existe en la base de datos
//         const user = await db.query('SELECT id FROM users WHERE id = ?;', [userCookie.userId]);
//         if (user.length > 0) {
//           userId = user[0].id;
//         }
//       }

//       if (!userId) { // Si la cookie no existe o el usuario no existe en la base de datos, crear un nuevo usuario
//         const result = await db.query('INSERT INTO users (created_at) VALUES (NOW());');
//         userId =result.insertId; // Obtener el id del nuevo usuario

//         // Crear una nueva cookie con el id del usuario
//         User.setCookie(res, 'userId', userId, { maxAge: 365 * 24 * 60 * 60 }); // maxAge en segundos

//         // Crear un nuevo carrito de compras para el usuario
//         await db.query('INSERT INTO carts (user_id) VALUES (?);', [userId]);
//       }

//       return userId;
//     } catch (err) {
//       throw err;
//     }
//   }
// }

// module.exports = User;

// models/User.js

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