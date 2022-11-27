const Answers = require('../models/Answers');
const Questions = require('../models/Questions');

module.exports = {
  // buscar respostas para uma pergunta
  async findAll(req, res) {
    const question_id = req.params.question_id;

    const question = await Questions.findById(question_id);

    if (!question) {
      return res.status(404).json({ massage: 'Está pergunta não existe em nosso bando de dados!' });
    }

    const answers = await Answers.findAll(question_id);

    if (!answers) {
      return res.status(404).json({ massage: 'Não existem respostas para esta pergunta!' });
    }

    return res.status(200).json({ answers });
  },

  // criar resposta
  async create(req, res) {
    const question_id = req.params.question_id;
    const answer = req.body;

    const question = await Questions.findById(question_id);

    if (!question) {
      return res.status(404).json({ massage: 'Está pergunta não existe em nosso bando de dados!' });
    }

    if (!answer) {
      return res.status(404).json({ massage: 'Conteúdo da resposta é obrigatório!' });
    }

    Answers.create(answer, question_id, (err, rs) => {
      if (err) {
        return res.status(500).json({
          massage: 'Encontramos um erro em nosso servidor. Por favor tente novamente!',
        });
      } else {
        return res.status(200).json({ massage: 'Resposta criada com sucesso!' });
      }
    });
  },

  // excluir uma resposta
  async delete(req, res) {
    const id = req.params.id;

    const answer = await Answers.findById(id);

    if (!answer) {
      return res.status(404).json({ massage: 'Está resposta não existe em nosso bando de dados!' });
    }

    Answers.delete(id, (err, rs) => {
      if (err) {
        return res.status(500).json({
          massage: 'Encontramos um erro em nosso servidor. Por favor tente novamente!',
        });
      } else {
        return res.status(200).json({ massage: 'Resposta excluida com sucesso!' });
      }
    });
  },

  // atualizar resposta
  async update(req, res) {
    const id = req.params.id;
    const answer = req.body;

    const answerExists = await Answers.findById(id);

    if (!answerExists) {
      return res.status(404).json({ massage: 'Está resposta não existe em nosso bando de dados!' });
    }

    Answers.update(answer, id, (err, rs) => {
      if (err) {
        return res.status(500).json({
          massage: 'Encontramos um erro em nosso servidor. Por favor tente novamente!',
        });
      } else {
        return res.status(200).json({ massage: 'Resposta atualizada com sucesso!' });
      }
    });
  },
};
