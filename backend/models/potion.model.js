import { Model, DataTypes } from 'sequelize'
import sequelize from '#config/database.js'

const Potion = sequelize.define(
  'Potion',
  {
    // Atributos de Poção com base nos exemplos
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }
);

export default Potion;