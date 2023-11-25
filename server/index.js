const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3001;

app.use(cors()); // Corrige: use a função cors
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bem vindo a sua api");
});

app.get("/", (req, res) => {
  res.send("Bem-vindo à sua API");
});

// Rota para obter todos os usuários
app.get("/usuarios", (req, res) => {
  // Lê o conteúdo atual do arquivo data.json
  fs.readFile(path.join(__dirname, "dados.json"), "utf8", (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo data.json:", err);
      return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }

    let usuarios;

    try {
      // Converte o conteúdo para um array de objetos
      usuarios = JSON.parse(data);
    } catch (error) {
      console.error("Erro ao analisar o conteúdo do arquivo data.json:", error);
      return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }

    res.json(usuarios);
  });
});

app.post("/usuarios", (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Nome, email e senha são obrigatórios." });
  }

  // Lê o conteúdo atual do arquivo data.json
  fs.readFile(path.join(__dirname, "dados.json"), "utf8", (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo data.json:", err);
      return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }

    let usuarios = [];

    try {
      // Converte o conteúdo para um array de objetos
      usuarios = JSON.parse(data);
    } catch (error) {
      console.error("Erro ao analisar o conteúdo do arquivo data.json:", error);
      return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }

    const novoUsuario = {
      id: usuarios.length + 1,
      nome,
      email,
      senha,
      "dt-cadastro": new Date().toISOString().split("T")[0],
      "plano-de-treino": [],
    };

    // Adiciona o novo usuário ao array
    usuarios.push(novoUsuario);

    // Escreve o array atualizado de volta no arquivo data.json
    fs.writeFile(
      path.join(__dirname, "dados.json"),
      JSON.stringify(usuarios, null, 2),
      (err) => {
        if (err) {
          console.error("Erro ao escrever no arquivo data.json:", err);
          return res
            .status(500)
            .json({ mensagem: "Erro interno do servidor." });
        }

        res.status(201).json({
          mensagem: "Usuário adicionado com sucesso.",
          usuario: novoUsuario,
        });
      }
    );
  });
});

app.get("/usuarios/:id", (req, res) => {
  const { id } = req.params;

  // Lê o conteúdo atual do arquivo data.json
  fs.readFile(path.join(__dirname, "dados.json"), "utf8", (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo data.json:", err);
      return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }

    let usuarios;

    try {
      // Converte o conteúdo para um array de objetos
      usuarios = JSON.parse(data);
    } catch (error) {
      console.error("Erro ao analisar o conteúdo do arquivo data.json:", error);
      return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }

    // Encontra o usuário com o ID correspondente
    const usuario = usuarios.find((u) => u.id === parseInt(id));

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    res.json(usuario);
  });
});

app.get("/categorias", (req, res) => {
  fs.readFile(path.join(__dirname, "categorias.json"), "utf8", (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo categorias.json:", err);
      return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }

    let categorias;

    try {
      categorias = JSON.parse(data);
    } catch (error) {
      console.error(
        "Erro ao analisar o conteúdo do arquivo categorias.json:",
        error
      );
      return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }

    res.json(categorias);
  });
});

app.get("/categorias/:categoriaId/exercicios", (req, res) => {
  const { categoriaId } = req.params;

  fs.readFile(path.join(__dirname, "categorias.json"), "utf8", (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo categorias.json:", err);
      return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }

    let categorias;

    try {
      categorias = JSON.parse(data);
    } catch (error) {
      console.error(
        "Erro ao analisar o conteúdo do arquivo categorias.json:",
        error
      );
      return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }

    const categoria = categorias.find((c) => c.id === parseInt(categoriaId));

    if (!categoria) {
      return res.status(404).json({ mensagem: "Categoria não encontrada." });
    }

    res.json(categoria.exercicios);
  });
});

app.post("/usuarios/:id/plano-de-treino", (req, res) => {
  const { id } = req.params;
  const { nome, descricao, repeticoes, series, nivel } = req.body;

  if (!nome || !descricao || !repeticoes || !series || !nivel) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos do exercício são obrigatórios." });
  }

  // Lê o conteúdo atual do arquivo dados.json
  fs.readFile(path.join(__dirname, "dados.json"), "utf8", (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo dados.json:", err);
      return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }

    let usuarios;

    try {
      // Converte o conteúdo para um array de objetos
      usuarios = JSON.parse(data);
    } catch (error) {
      console.error(
        "Erro ao analisar o conteúdo do arquivo dados.json:",
        error
      );
      return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }

    // Encontra o usuário com o ID correspondente
    const usuario = usuarios.find((u) => u.id === parseInt(id));

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    // Adiciona o exercício ao plano de treino do usuário
    const novoExercicio = {
      id: usuario["plano-de-treino"].length + 1,
      nome,
      descricao,
      repeticoes,
      series,
      nivel,
    };

    usuario["plano-de-treino"].push(novoExercicio);

    // Escreve o array atualizado de volta no arquivo dados.json
    fs.writeFile(
      path.join(__dirname, "dados.json"),
      JSON.stringify(usuarios, null, 2),
      (err) => {
        if (err) {
          console.error("Erro ao escrever no arquivo dados.json:", err);
          return res
            .status(500)
            .json({ mensagem: "Erro interno do servidor." });
        }

        res.status(201).json({
          mensagem: "Exercício adicionado ao plano de treino com sucesso.",
          exercicio: novoExercicio,
        });
      }
    );
  });
});

app.get("/usuarios/:id/plano-de-treino", (req, res) => {
  const { id } = req.params;

  // Lê o conteúdo atual do arquivo dados.json
  fs.readFile(path.join(__dirname, "dados.json"), "utf8", (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo dados.json:", err);
      return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }

    let usuarios;

    try {
      // Converte o conteúdo para um array de objetos
      usuarios = JSON.parse(data);
    } catch (error) {
      console.error(
        "Erro ao analisar o conteúdo do arquivo dados.json:",
        error
      );
      return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }

    // Encontra o usuário com o ID correspondente
    const usuario = usuarios.find((u) => u.id === parseInt(id));

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    // Retorna o plano de treino do usuário
    res.json(usuario["plano-de-treino"]);
  });
});

app.delete("/usuarios/:id/plano-de-treino/:exercicioId", (req, res) => {
  const { id, exercicioId } = req.params;

  // Lê o conteúdo atual do arquivo dados.json
  fs.readFile(path.join(__dirname, "dados.json"), "utf8", (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo dados.json:", err);
      return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }

    let usuarios;

    try {
      // Converte o conteúdo para um array de objetos
      usuarios = JSON.parse(data);
    } catch (error) {
      console.error(
        "Erro ao analisar o conteúdo do arquivo dados.json:",
        error
      );
      return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }

    // Encontra o usuário com o ID correspondente
    const usuario = usuarios.find((u) => u.id === parseInt(id));

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    // Encontra o exercício com o ID correspondente no plano de treino do usuário
    const exercicioIndex = usuario["plano-de-treino"].findIndex(
      (ex) => ex.id === parseInt(exercicioId)
    );

    if (exercicioIndex === -1) {
      return res
        .status(404)
        .json({
          mensagem: "Exercício não encontrado no plano de treino do usuário.",
        });
    }

    // Remove o exercício do plano de treino do usuário
    usuario["plano-de-treino"].splice(exercicioIndex, 1);

    // Escreve o array atualizado de volta no arquivo dados.json
    fs.writeFile(
      path.join(__dirname, "dados.json"),
      JSON.stringify(usuarios, null, 2),
      (err) => {
        if (err) {
          console.error("Erro ao escrever no arquivo dados.json:", err);
          return res
            .status(500)
            .json({ mensagem: "Erro interno do servidor." });
        }

        res.json({
          mensagem: "Exercício removido do plano de treino com sucesso.",
        });
      }
    );
  });
});

app.listen(port, () => {
  console.log("Servidor rodando na porta 3001");
});
