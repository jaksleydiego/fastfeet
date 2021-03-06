import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    // verifica se o schema foi validadox
    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'validations fails' });
    }
    // guarda nas váriaveis os dados do formulário
    const { email, password } = req.body;
    // faz a busca no bd pelo email de um  usuário
    const user = await User.findOne({ where: { email } });
    // verifica se foi encontrado um usuário e retorna msg
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    // verifica se as senhas batem e retorna mensagem
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password is does not match' });
    }
    const { id, name } = user;

    // gera o token e retorna
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expireIn,
      }),
    });
  }
}

export default new SessionController();
