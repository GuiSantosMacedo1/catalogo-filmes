# 🎬 Catálogo de Filmes

Aplicação **front-end desenvolvida em Angular** que consome a API do [TMDB (The Movie Database)](https://www.themoviedb.org/) para exibir filmes populares, permitir buscas por título e apresentar informações detalhadas sobre cada filme.

O projeto foi desenvolvido como **desafio técnico para uma vaga de Desenvolvedor Front-end**, com foco em organização de código, boas práticas, experiência do usuário e utilização de recursos modernos do Angular.

---

## 🚀 Tecnologias

- **Angular 18** — Standalone Components
- **TypeScript**
- **RxJS** — `debounceTime` e `distinctUntilChanged`
- **Jasmine + Karma** — Testes unitários
- **TMDB API** — The Movie Database
- **HTML5**
- **CSS3**

---

## 📋 Funcionalidades

- 🎬 Listagem de filmes populares
- 🔎 Busca de filmes por título
- ⚡ Debounce na busca para evitar requisições excessivas à API
- ⏳ Tratamento de estado de carregamento (*loading*)
- ❌ Tratamento de erros
- 📭 Tratamento de estado vazio quando nenhum resultado é encontrado
- 📖 Página de detalhes do filme
- 📝 Exibição de sinopse
- 🎭 Exibição do elenco principal
- 🏷️ Exibição dos gêneros
- ⏱️ Exibição da duração do filme
- ⭐ Exibição da avaliação
- 📱 Layout responsivo para desktop e dispositivos móveis
- 🧩 Componente reutilizável `MovieCardComponent`

---

## 🗂️ Estrutura do Projeto

A aplicação utiliza uma arquitetura organizada por responsabilidades e funcionalidades:

```text
src/
└── app/
    ├── core/
    │   └── services/
    │       └── movie.service.ts
    │
    ├── shared/
    │   └── components/
    │       └── movie-card/
    │           └── movie-card.component.ts
    │
    ├── features/
    │   ├── home/
    │   │   └── ...
    │   │
    │   └── movie-detail/
    │       └── ...
    │
    └── models/
        └── movie.model.ts
```
## ⚙️ Como rodar o projeto localmente

### 1. Clone o repositório

git clone https://github.com/GuiSantosMacedo1/catalogo-filmes.git
cd catalogo-filmes


### 2. Instale as dependências

npm install


### 3. Configure a API Key do TMDB

Crie uma conta gratuita em [themoviedb.org](https://www.themoviedb.org/) e gere uma API Key em **Configurações → API**.

Copie o arquivo de exemplo:

 
cp src/environments/environment.example.ts src/environments/environment.development.ts


Edite o arquivo `environment.development.ts` e insira sua chave:

typescript
export const environment = {
  production: false,
  tmdbApiKey: 'SUA_CHAVE_AQUI',
  tmdbBaseUrl: 'https://api.themoviedb.org/3',
  tmdbImageUrl: 'https://image.tmdb.org/t/p/w500'
};

### 4. Rode o projeto
 
ng serve

Acesse `http://localhost:4200`.

### 5. Rodando os testes

 
ng test

## 🔒 Nota sobre segurança

A API Key do TMDB (v3) é projetada para uso client-side, mas mesmo assim os arquivos `environment.ts` e `environment.development.ts` estão no `.gitignore` para não expor a chave real no repositório. O arquivo `environment.example.ts` documenta a estrutura esperada.

## 🧠 Decisões técnicas

- **Separação por feature** (`home`, `movie-detail`) + **shared** (componentes reutilizáveis) + **core** (services): facilita escalabilidade e deixa claro onde adicionar novas telas ou lógica compartilhada.
- **RxJS com debounceTime/distinctUntilChanged** na busca: evita disparar uma requisição a cada tecla digitada, melhorando performance e reduzindo uso da API.
- **Componentes standalone**: seguindo a direção mais recente do Angular, sem depender de NgModules.
- **Testes com mocks (jasmine.createSpyObj, HttpClientTestingModule)**: garante testes unitários isolados, sem depender da API real estar disponível.

## 👤 Autor

Guilherme Santos Macedo — [LinkedIn](https://www.linkedin.com/in/guilherme-santos-macedo/) | [GitHub](https://github.com/GuiSantosMacedo1)
