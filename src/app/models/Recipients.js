import Sequelize, { Model } from 'sequelize';

class Recipients extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        adress: Sequelize.STRING,
        number: Sequelize.INTEGER,
        complement: Sequelize.TEXT,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        postal: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Recipients;
