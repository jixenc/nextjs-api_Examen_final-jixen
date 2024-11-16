// Importa la instancia de base de datos 'db' que contiene los modelos definidos (como 'Client').
import db from '../../../models';

export default async function handler(req, res) {
  // Verifica que el método HTTP de la solicitud sea 'POST'.
  // Este endpoint solo maneja la creación de clientes.
  if (req.method === 'POST') {
    try {
      // Extrae los datos enviados en el cuerpo de la solicitud (body).
      const { first_name, last_name, gender, birth_date, status } = req.body;

      // Valida que todos los campos requeridos estén presentes.
      // Si falta algún dato, responde con un error 400 (Bad Request).
      if (!first_name || !last_name || !gender || !birth_date || !status) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }

      // Crea un nuevo cliente en la tabla 'Clients' de la base de datos.
      // Usa el modelo 'Client' de Sequelize para realizar la operación.
      const newClient = await db.Client.create({
        first_name,
        last_name,
        gender,
        birth_date,
        status,
      });

      // Responde con un código 201 (Created) y los datos del cliente recién creado.
      res.status(201).json(newClient);
    } catch (error) {
      // En caso de error durante la creación, captura el error y lo registra en la consola.
      console.error('Error en la creación del cliente:', error); // Log para depuración.

      // Responde con un código 500 (Internal Server Error) y los detalles del error.
      res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
  } else {
    // Si el método HTTP no es 'POST', responde con un código 405 (Method Not Allowed).
    res.status(405).json({ message: 'Método no permitido' });
  }
}
