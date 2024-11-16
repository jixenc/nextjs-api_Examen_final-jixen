// Importación de la clase base 'Model' desde Sequelize
// Permite definir un modelo que representa una tabla en la base de datos.
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  // Definición del modelo 'ClientInfo', que extiende la clase base 'Model'.
  class ClientInfo extends Model {
    /**
     * Método estático para definir las asociaciones del modelo.
     * Este método configura la relación entre 'ClientInfo' y otros modelos.
     * En este caso, se establece una relación muchos a uno con 'Client'.
     */
    static associate(models) {
      // Relación: Cada registro en 'ClientInfo' pertenece a un cliente.
      // Esto se define utilizando 'client_id' como clave foránea.
      ClientInfo.belongsTo(models.Client, {
        foreignKey: 'client_id', // Clave foránea que conecta con la tabla 'Clients'.
        onDelete: 'CASCADE', // Si se elimina un cliente, también se eliminan sus registros relacionados en 'ClientInfo'.
      });
    }
  }

  // Inicialización del modelo 'ClientInfo' con sus atributos y configuraciones.
  ClientInfo.init(
    {
      // Atributo 'client_id': Identifica al cliente asociado (clave foránea).
      client_id: DataTypes.INTEGER,
      // Atributo 'info_type': Especifica el tipo de información asociada al cliente (texto descriptivo).
      info_type: DataTypes.STRING,
      // Atributo 'created_by': Almacena información sobre quién creó este registro.
      created_by: DataTypes.STRING,
      // Atributo 'info_status': Representa el estado de la información (por ejemplo, activo o inactivo).
      info_status: DataTypes.STRING,
    },
    {
      // Configuración adicional del modelo.
      sequelize, // Conexión a la instancia de Sequelize.
      modelName: 'ClientInfo', // Nombre del modelo para uso interno en Sequelize.
    }
  );

  // Devuelve el modelo 'ClientInfo' para ser utilizado en otras partes del código.
  return ClientInfo;
};
