//controllers\dashboard.js

const Doacao = require("../models/doacao"); // Importe o modelo de doacoes aqui
const User = require("../models/user")

let dashboardController = {};
dashboardController.showDashboard = async (req, res, next) => {
  try {
    // Buscar todas as doacoes no banco de dados
    const doacoes = await Doacao.find();

    // Calcular a quantidade media de pecas doadas
    const doacoesFinais = doacoes.filter((doacao) => doacao.estado === "Fim");
    const totalDoacoes = doacoesFinais.reduce((acc, doacao) => acc + doacao.quantidade, 0);
    const quantidadeMedia = doacoesFinais.length > 0
      ? totalDoacoes / doacoesFinais.length
      : 0;

    // Consulta no banco de dados para obter os dados dos doadores
    // const topDoadores = await Doacao.aggregate([
    //   // Agrupar as doacoes pelo usuario
    //   { $group: { _id: "$user", count: { $sum: 1 } } },
    //   // Ordenar do maior para o menor numero de doacoes
    //   { $sort: { count: -1 } },
    // ]).limit(10); // Limitar aos 10 principais doadores

    const topDoadores = await Doacao.aggregate([
      // Agrupar as doacoes pelo usuario
      { $group: { _id: "$user", count: { $sum: 1 } } },
      // Join with User collection to get user name
      {
        $lookup: {
          from: "users", // replace with your User collection name
          localField: "_id",
          foreignField: "_id",
          as: "user_info"
        }
      },
      // Unwind the user_info array
      {
        $unwind: "$user_info"
      },
      // Project fields
      {
        $project: {
          _id: 1,
          count: 1,
          name: "$user_info.name" // replace 'name' with the actual field name in your User collection
        }
      },
      // Ordenar do maior para o menor numero de doacoes
      { $sort: { count: -1 } },
    ]).limit(10); // Limitar aos 10 principais doadores


// Renderizar a pagina do dashboard com os dados calculados
res.render("dashboard", { quantidadeMedia, totalDoacoes, topDoadores });

  } catch (err) {
    next(err);
  }
};

dashboardController.chartDoadores = async (req, res, next) => {
  try {
    // Consulta no banco de dados para obter os dados dos doadores
    const doadores = await Doacao.aggregate([
      // Agrupar as doacoes pelo usuario
      { $group: { _id: "$user", count: { $sum: 1 } } },
      // Join with User collection to get user name
      {
        $lookup: {
          from: "users", // replace with your User collection name
          localField: "_id",
          foreignField: "_id",
          as: "user_info"
        }
      },
      // Unwind the user_info array
      {
        $unwind: "$user_info"
      },
      // Project fields
      {
        $project: {
          _id: 1,
          count: 1,
          name: "$user_info.name" // replace 'name' with the actual field name in your User collection
        }
      },
      // Ordenar do maior para o menor numero de doacoes
      { $sort: { count: -1 } },
    ]);
    //.limit(10); // Limitar aos 10 principais doadores

    // Prepare the data for the pie chart
    let chartData = doadores.map(doador => [doador.name, doador.count]);

    // Add the column names at the start of the array
    chartData.unshift(['Doadores', 'Doacoes']);

    // Enviar os dados do grafico como resposta
    res.json(chartData);
  } catch (err) {
    next(err);
  }
};

dashboardController.chartEntidades = async (req, res, next) => {
  try {
    // Consulta no banco de dados para obter os dados das doações por entidade
    const entidades = await Doacao.aggregate([
      // Agrupar as doacoes pela entidade
    { $group: { _id: "$entidade", count: { $sum: 1 } } },
    // Join with Entidade collection to get entidade name
    {
      $lookup: {
        from: "entidades", // replace with your Entidade collection name
        localField: "_id",
        foreignField: "_id",
        as: "entidade_info"
      }
    },
    // Unwind the entidade_info array
    {
      $unwind: "$entidade_info"
    },
    // Project fields
    {
      $project: {
        _id: 1,
        count: 1,
        name: "$entidade_info.name" // 
      }
    },
    // Ordenar do maior para o menor numero de doacoes
    { $sort: { count: -1 } },
  ]);

    // Prepare the data for the chart
    let chartData = entidades.map(entidade => [entidade.name, entidade.count]);

    // Add the column names at the start of the array
    chartData.unshift(['Entidade', 'Doacoes']);

    // Enviar os dados do grafico como resposta
    res.json(chartData);
  } catch (err) {
    next(err);
  }
};

dashboardController.chartEstado = async (req, res, next) => {
  try {
    // Consulta no banco de dados para obter os dados das doações por estado
    const estados = await Doacao.aggregate([
      // Agrupar as doacoes pelo estado
      { $group: { _id: "$estado", count: { $sum: 1 } } },
      // Ordenar do maior para o menor numero de doacoes
      { $sort: { count: -1 } },
    ]);

    // Prepare the data for the chart
    let chartData = estados.map(estado => [estado._id, estado.count]);

    // Add the column names at the start of the array
    chartData.unshift(['Estado', 'Doacoes']);

    // Enviar os dados do grafico como resposta
    res.json(chartData);
  } catch (err) {
    next(err);
  }
}

module.exports = dashboardController;
