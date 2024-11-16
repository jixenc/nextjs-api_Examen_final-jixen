import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ClientInfo extends Model {
    static associate(models) {
      ClientInfo.belongsTo(models.Client, {
        foreignKey: 'client_id',
        onDelete: 'CASCADE',
      });
    }
  }

  ClientInfo.init(
    {
      client_id: DataTypes.INTEGER,
      info_type: DataTypes.STRING,
      created_by: DataTypes.STRING,
      info_status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'ClientInfo',
    }
  );

  return ClientInfo;
};
