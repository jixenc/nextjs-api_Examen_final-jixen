import { ClientInfo } from '../../../models';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { client_id, info_type, created_by, info_status } = req.body;

        try {
            const newInfo = await ClientInfo.create({ client_id, info_type, created_by, info_status });
            res.status(201).json(newInfo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
