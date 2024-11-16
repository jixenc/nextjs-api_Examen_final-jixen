import db from '../../models';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const clients = await db.Client.findAll({
        include: [{ model: db.ClientInfo }],
        order: [['last_name', 'ASC'], ['createdAt', 'ASC']],
      });
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
