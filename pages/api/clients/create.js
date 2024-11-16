import db from '../../../models';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { first_name, last_name, gender, birth_date, status } = req.body;

      // Verifica que todos los campos requeridos estén presentes
      if (!first_name || !last_name || !gender || !birth_date || !status) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }

      // Crea el cliente en la base de datos
      const newClient = await db.Client.create({
        first_name,
        last_name,
        gender,
        birth_date,
        status,
      });

      res.status(201).json(newClient);
    } catch (error) {
      console.error('Error en la creación del cliente:', error); // Log para debug
      res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
