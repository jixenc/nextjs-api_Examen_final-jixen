import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Client extends Model {
    static associate(models) {
      Client.hasMany(models.ClientInfo, {
        foreignKey: 'client_id',
        onDelete: 'CASCADE',
      });
    }
  }

  Client.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      gender: DataTypes.STRING,
      birth_date: DataTypes.DATE,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Client',
    }
  );

  return Client;
};
