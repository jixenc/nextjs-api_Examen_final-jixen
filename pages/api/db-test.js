import db from '../../models';

export default async function handler(req, res) {
  try {
    await db.sequelize.authenticate();
    res.status(200).json({ message: 'Conexión exitosa a la base de datos' });
  } catch (error) {
    res.status(500).json({ error: 'Error conectando a la base de datos', details: error.message });
  }
}
