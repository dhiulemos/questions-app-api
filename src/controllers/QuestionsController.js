const Questions = require('../models/Questions');

module.exports = {
  // buscar todas as perguntas
  async findAll(req, res) {
    const question = await Questions.findAll();

    if (!question) {
      return res.status(404).json({ massage: 'Não existem respostas para esta pergunta!' });
    }

    return res.status(200).json({ question });
  },

  // criar uma pergunta

  create(req, res) {
    const { question } = req.body;

    if (!question) {
      return res.status(404).json({ massage: 'Pergunta está vazia!' });
    }

    Questions.create(question, (err, rs) => {
      if (err) {
        return res.status(500).json({
          massage: 'Encontramos um erro em nosso servidor. Por favor tente novamente!',
        });
      } else {
        return res.status(200).json({ massage: 'Pergunta criada com sucesso!' });
      }
    });
  },

  // excluir uma pergunta
  async delete(req, res) {
    const id = req.params.id;

    const question = await Questions.findById(id);

    if (!question) {
      return res.status(404).json({ massage: 'Está pergunta não existe em nosso bando de dados!' });
    }

    Questions.delete(id, (err, rs) => {
      if (err) {
        return res.status(500).json({
          massage: 'Encontramos um erro em nosso servidor. Por favor tente novamente!',
        });
      } else {
        return res.status(200).json({ massage: 'Pergunta excluida com sucesso!' });
      }
    });
  },

  // atualizar uma pergunta
  async update(req, res) {
    const id = req.params.id;
    const { question } = req.body;

    const questionExists = await Questions.findById(id);

    if (!questionExists) {
      return res.status(404).json({ massage: 'Está pergunta não existe em nosso bando de dados!' });
    }

    Questions.update(
      {
        id,
        question,
      },
      (err, rs) => {
        if (err) {
          return res.status(500).json({
            massage: 'Encontramos um erro em nosso servidor. Por favor tente novamente!',
          });
        } else {
          return res.status(200).json({ massage: 'Pergunta atualizada com sucesso!' });
        }
      }
    );
  },
};
