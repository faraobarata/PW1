# Weather Ceará - Previsão do Tempo

Uma aplicação web moderna para consulta de previsão do tempo no Ceará, construída com React e Vite.

## 🌟 Funcionalidades

- 🌡️ Consulta do clima atual de qualquer cidade do Ceará
- 🌤️ Previsão do tempo para os próximos 5 dias
- 📊 Informações detalhadas:
  - Temperatura atual e sensação térmica
  - Umidade do ar
  - Velocidade e direção do vento
  - Pressão atmosférica
  - Índice UV
  - Probabilidade de chuva
- 🎨 Interface responsiva e moderna com suporte para tema claro/escuro
- 💾 Sistema de cache local para otimizar requisições à API

## 🚀 Tecnologias Utilizadas

- ⚛️ React 18
- ⚡ Vite
- 🎨 TailwindCSS
- 🔄 React Query
- 🛣️ React Router DOM
- 🌡️ AccuWeather API
- 🎭 Framer Motion
- 💅 React Icons

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## 🔧 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/weather-ceara.git
   cd weather-ceara
   ```

2. Instale as dependências:
   ```bash
   # Com npm
   npm install

   # Com yarn
   yarn
   ```

3. Crie uma conta no AccuWeather:
   - Acesse [AccuWeather API](https://developer.accuweather.com/)
   - Faça o registro e crie uma nova aplicação
   - Obtenha sua chave de API (API Key)

4. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto
   - Adicione sua chave da API:
     ```env
     VITE_ACCUWEATHER_API_KEY=sua_chave_aqui
     ```

## 🚀 Executando o Projeto

1. Inicie o servidor de desenvolvimento:
   ```bash
   # Com npm
   npm run dev

   # Com yarn
   yarn dev
   ```

2. Acesse a aplicação:
   - Abra seu navegador
   - Digite: `http://localhost:5173`

## 🏗️ Build para Produção

1. Gere a build:
   ```bash
   # Com npm
   npm run build

   # Com yarn
   yarn build
   ```

2. Teste a build localmente:
   ```bash
   # Com npm
   npm run preview

   # Com yarn
   yarn preview
   ```

## 📝 Notas Importantes

### Limites da API
- O plano gratuito do AccuWeather tem limite de 50 chamadas por dia
- A aplicação implementa cache local para otimizar as requisições
- Recomenda-se criar uma conta própria para desenvolvimento

### Cache
- O cache local armazena dados por 30 minutos
- Reduz o número de chamadas à API
- Melhora o tempo de resposta da aplicação

### Tema Escuro
- Suporta preferências do sistema
- Pode ser alterado manualmente
- Persiste a escolha do usuário

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```
3. Commit suas mudanças:
   ```bash
   git commit -m 'Adiciona nova funcionalidade'
   ```
4. Push para a branch:
   ```bash
   git push origin feature/nova-funcionalidade
   ```
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Seu Nome - [GitHub](https://github.com/seu-usuario)

---

⭐ Se este projeto te ajudou, considere dar uma estrela!
