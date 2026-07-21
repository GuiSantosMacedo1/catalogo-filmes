# 🎬 Catálogo de Filmes

Aplicação front-end em Angular que consome a API do [TMDB](https://www.themoviedb.org/) para listar filmes populares, permitir busca por título e exibir detalhes (sinopse, elenco, gêneros e avaliação).

Projeto desenvolvido como desafio técnico para vaga de desenvolvedor front-end.

## 🚀 Tecnologias

- Angular 18 (standalone components)
- TypeScript
- RxJS (Observables, debounceTime, distinctUntilChanged)
- Jasmine + Karma (testes unitários)
- API TMDB (The Movie Database)

## 📋 Funcionalidades

- Listagem de filmes populares
- Busca por título com debounce (evita chamadas excessivas à API)
- Tratamento de estados de **loading**, **erro** e **vazio**
- Tela de detalhe com sinopse, gêneros, duração e elenco principal
- Layout responsivo (desktop e mobile)
- Componente reutilizável (`MovieCardComponent`)

## 🗂️ Estrutura de pastas


src/app/
  core/
    services/
      movie.service.ts       -> chamadas a API TMDB
  shared/
    components/
      movie-card/            -> componente reutilizavel
  features/
    home/                    -> listagem + busca
    movie-detail/            -> tela de detalhe
  models/
    movie.model.ts           -> tipagem dos dados da API


## ⚙️ Como rodar o projeto localmente

### 1. Clone o repositório

bash
git clone https://github.com/GuiSantosMacedo1/catalogo-filmes.git
cd catalogo-filmes


### 2. Instale as dependências

bash
npm install


### 3. Configure a API Key do TMDB

Crie uma conta gratuita em [themoviedb.org](https://www.themoviedb.org/) e gere uma API Key em **Configurações → API**.

Copie o arquivo de exemplo:

bash
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
bash
ng serve

Acesse `http://localhost:4200`.

### 5. Rodando os testes

bash
ng test

## 🔒 Nota sobre segurança

A API Key do TMDB (v3) é projetada para uso client-side, mas mesmo assim os arquivos `environment.ts` e `environment.development.ts` estão no `.gitignore` para não expor a chave real no repositório. O arquivo `environment.example.ts` documenta a estrutura esperada.

## 🧠 Decisões técnicas

- **Separação por feature** (`home`, `movie-detail`) + **shared** (componentes reutilizáveis) + **core** (services): facilita escalabilidade e deixa claro onde adicionar novas telas ou lógica compartilhada.
- **RxJS com debounceTime/distinctUntilChanged** na busca: evita disparar uma requisição a cada tecla digitada, melhorando performance e reduzindo uso da API.
- **Componentes standalone**: seguindo a direção mais recente do Angular, sem depender de NgModules.
- **Testes com mocks (jasmine.createSpyObj, HttpClientTestingModule)**: garante testes unitários isolados, sem depender da API real estar disponível.

## 👤 Autor

Guilherme Santos Macedo — [LinkedIn](#) | [GitHub](https://github.com/GuiSantosMacedo1)
