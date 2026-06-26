import Potion from "../models/potion.model.js"

async function findAll(req, res) {
  try {
    const results = await Potion.findAll();
    res.status(200).json(results);
  }
  catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Erro ao buscar poções' });
  }
}

async function findByPk(req, res) {
  try {
    const result = await Potion.findByPk(req.params.id);
    if (!result)
      res.status(404).json({ error: 'Poção não encontrada' });
    else
      res.status(200).json(result);
  }
  catch (e) {
    console.error(e);
    res.status(500).json({ error: `Erro ao buscar poção por id (id: ${req.params.id})` });
  }
}

async function create(req, res) {
  try {
    const result = await Potion.create(
      {
        name: req.body.name, description: req.body.description,
        imageUrl: req.body.imageUrl, price: req.body.price
      }
    );
    res.status(201).json(result);
  }
  catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Não foi possivel criar a poção' });
  }
}

async function update(req, res) {
  try {
    const [result] = await Potion.update(
      {
        name: req.body.name, description: req.body.description,
        imageUrl: req.body.imageUrl, price: req.body.price
      },
      { where: { id: req.params.id } }
    );

    if (result === 0)
      res.status(404).json({ error: 'Poção não encontrada' });
    else
      res.status(200).json({ updated: result });
  }
  catch (e) {
    console.error(e);
    res.status(500).json({ error: `Erro ao atualizar poção (${req.body.name})` });
  }
}

async function deleteByPk(req, res) {
  try {
    const result = await Potion.destroy(
      { where: { id: req.params.id } }
    );
    if (result == 1)
      res.status(200).send();
    else
      res.status(404).json({ error: 'Poção não encontrada, não foi possivel remover' });
  }
  catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Não foi possível remover a poção' });
  }
}

export default { findAll, findByPk, create, update, deleteByPk };