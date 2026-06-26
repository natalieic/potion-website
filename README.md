# Poções e Soluções

Site da loja de poções de Annabelle Merigold.

## Estrutura do projeto

```
potion-website/
├── backend/    # API REST com Express + Sequelize + SQLite em memória
└── frontend/   # Interface web com React + Vite
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- npm

## Configuração e execução

### Terminal 1 — Backend

```bash
cd backend
npm install
npm start
```

O servidor sobe em **http://localhost:3000** e preenche o banco com as poções de exemplo automaticamente.

### Terminal 2 — Frontend

```bash
cd frontend
npm install
npm run dev
```

A interface sobe em **http://localhost:5173**.

> O frontend está configurado com um proxy para `/api → localhost:3000`, então não é necessário nenhuma configuração adicional de CORS ou URL.


## Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/potions` | Lista todas as poções |
| `GET` | `/api/potions/:id` | Busca poção por ID |
| `POST` | `/api/potions` | Cria uma nova poção |
| `PUT` | `/api/potions/:id` | Atualiza uma poção |
| `DELETE` | `/api/potions/:id` | Remove uma poção |

### Exemplo de corpo para POST/PUT

```json
{
  "name": "Poção Blue Sky",
  "description": "Provê um surto de inspiração por 24 horas.",
  "imageUrl": "https://exemplo.com/imagem.png",
  "price": 300
}
```

## Observações

- O banco de dados é **SQLite em memória**: os dados são resetados a cada reinicialização do backend. As poções de exemplo são inseridas automaticamente na inicialização.
- O botão **Comprar** é decorativo, sem funcionalidade implementada
