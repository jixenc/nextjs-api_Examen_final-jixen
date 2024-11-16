// Importa la instancia de la base de datos 'db', que contiene los modelos definidos (como 'Client' y 'ClientInfo').
import db from '../../models';

export default async function handler(req, res) {
  // Verifica si el método HTTP es 'GET'.
  // Este endpoint solo permite obtener datos.
  if (req.method === 'GET') {
    try {
      // Recupera todos los clientes de la base de datos, incluyendo la información relacionada de 'ClientInfo'.
      const clients = await db.Client.findAll({
        // Relación: Incluye los registros relacionados del modelo 'ClientInfo'.
        include: [{ model: db.ClientInfo }],
        // Ordena los resultados por apellido en orden ascendente, y luego por fecha de creación también en orden ascendente.
        order: [['last_name', 'ASC'], ['createdAt', 'ASC']],
      });

      // Responde con un código 200 (OK) y los datos de los clientes en formato JSON.
      res.status(200).json(clients);
    } catch (error) {
      // Si ocurre un error durante la consulta, responde con un código 500 (Error Interno del Servidor) y los detalles del error.
      res.status(500).json({ error: error.message });
    }
  } else {
    // Si el método HTTP no es 'GET', responde con un código 405 (Método No Permitido).
    res.status(405).json({ message: 'Método no permitido' });
  }
}
