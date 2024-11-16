// Importación de la clase base 'Model' desde Sequelize
// Esto permite definir un modelo que representa una tabla en la base de datos.
import { Model } from 'sequelize'; 

export default (sequelize, DataTypes) => {
  // Definición del modelo 'Client', que extiende la clase base 'Model'.
  class Client extends Model {
    /**
     * Método estático para definir las asociaciones del modelo.
     * Este método es llamado automáticamente por Sequelize y configura las relaciones entre tablas.
     * En este caso, se establece una relación uno a muchos con 'ClientInfo'.
     */
    static associate(models) {
      // Relación: Un cliente puede tener muchas entradas en 'ClientInfo'.
      // Se utiliza 'client_id' como clave foránea en 'ClientInfo'.
      Client.hasMany(models.ClientInfo, {
        foreignKey: 'client_id', // Define la clave foránea que conecta ambas tablas.
        onDelete: 'CASCADE', // Elimina automáticamente los registros relacionados en 'ClientInfo' si se elimina un cliente.
      });
    }
  }

  // Inicialización del modelo 'Client' con sus atributos y configuraciones.
  Client.init(
    {
      // Atributo 'first_name': Almacena el primer nombre del cliente como texto.
      first_name: DataTypes.STRING,
      // Atributo 'last_name': Almacena el apellido del cliente como texto.
      last_name: DataTypes.STRING,
      // Atributo 'gender': Almacena el género del cliente, como texto.
      gender: DataTypes.STRING,
      // Atributo 'birth_date': Almacena la fecha de nacimiento del cliente.
      birth_date: DataTypes.DATE,
      // Atributo 'status': Almacena el estado del cliente, como texto.
      status: DataTypes.STRING,
    },
    {
      // Configuración adicional del modelo.
      sequelize, // Conexión a la instancia de Sequelize.
      modelName: 'Client', // Nombre del modelo. Este es utilizado internamente por Sequelize.
    }
  );

  // Devuelve el modelo 'Client' para ser utilizado en otras partes del código.
  return Client;
};
