import * as Yup from 'yup';

import Recipient from '../models/Recipients';

class RecipientsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required('o nome é obrigatório'),
      adress: Yup.string().required('o endereço é obrigatório'),
      number: Yup.number('precisa ser um número').required(
        'o nome é obrigatório'
      ),
      complement: Yup.string(),
      state: Yup.string().required('o campo estádo é obrigatório'),
      city: Yup.string().required('o campo estado é obrigatório'),
      postal: Yup.string().required('o campo cep deve ser preenchido'),
    });

    // verifica a validação caso não passe exibe mensagem de erro
    // try {
    //   await schema.validate(schema);
    // } catch(path, message) {  }

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'invalid validation' });
    }

    const { name, adress } = await Recipient.create(req.body);

    return res.json({ name, adress });
  }
}

export default new RecipientsController();
