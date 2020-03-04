// responsavel por funçoes no banco de dados
import Sequelize from 'sequelize';
// importação do model
import User from '../app/models/User';
import Recipients from '../app/models/Recipients';
// importação das configurações de conexão
import dabaseConfig from '../config/database';

// models
const models = [User, Recipients];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // faz conexão com o banco
    this.connection = new Sequelize(dabaseConfig);
    // carrega os models
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
