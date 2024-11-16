// Importación del modelo 'ClientInfo' desde el directorio de modelos.
// Este modelo representa la tabla 'ClientInfo' en la base de datos.
import { ClientInfo } from '../../../models';

export default async function handler(req, res) {
    // Verifica si el método HTTP es 'POST'.
    // Este endpoint solo acepta solicitudes POST para crear un nuevo registro.
    if (req.method === 'POST') {
        // Extrae los campos necesarios del cuerpo de la solicitud.
        // Estos datos deben ser enviados en formato JSON por el cliente.
        const { client_id, info_type, created_by, info_status } = req.body;

        try {
            // Intenta crear un nuevo registro en la tabla 'ClientInfo' con los datos proporcionados.
            const newInfo = await ClientInfo.create({ client_id, info_type, created_by, info_status });

            // Responde al cliente con el registro recién creado y un código de estado 201 (Creado).
            res.status(201).json(newInfo);
        } catch (error) {
            // Si ocurre un error durante el proceso, responde con un código 500 (Error Interno del Servidor).
            // Además, envía el mensaje de error al cliente para facilitar la depuración.
            res.status(500).json({ error: error.message });
        }
    } else {
        // Si se usa un método HTTP distinto a 'POST', responde con un código 405 (Método No Permitido).
        // Esto asegura que el endpoint solo maneje solicitudes POST.
        res.status(405).json({ error: 'Method not allowed' });
    }
}
