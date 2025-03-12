// pages/api/votes.js
let votesData = {
  "Caos": 0,
  "Ordem": 0,
};

let vagas = {
  "Caos": 7,
  "Ordem": 7,
};

export default function handler(req, res) {
  if (req.method === "GET") {
    // Retorna o status atual das vagas
    return res.status(200).json(vagas);
  }

  if (req.method === "POST") {
    const { team } = req.body;
    if (!team || !["Caos", "Ordem"].includes(team)) {
      return res.status(400).json({ message: "Time inválido" });
    }

    if (vagas[team] <= 0) {
      return res.status(400).json({ message: "Não há mais vagas nesse time" });
    }

    // Registra o voto e diminui as vagas
    votesData[team] += 1;
    vagas[team] -= 1;

    return res.status(200).json({ message: "Voto registrado", vagas });
  }

  res.status(405).json({ message: "Método não permitido" });
}
