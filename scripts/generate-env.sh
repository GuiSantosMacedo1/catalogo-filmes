#!/bin/bash
# Gera os arquivos de environment do Angular a partir da variavel TMDB_API_KEY
# Usado tanto no Vercel quanto pode ser reaproveitado em outros ambientes de build

mkdir -p src/environments

cat > src/environments/environment.ts << EOF
export const environment = {
  production: true,
  tmdbApiKey: '${TMDB_API_KEY}',
  tmdbBaseUrl: 'https://api.themoviedb.org/3',
  tmdbImageUrl: 'https://image.tmdb.org/t/p/w500'
};
EOF

cat > src/environments/environment.development.ts << EOF
export const environment = {
  production: false,
  tmdbApiKey: '${TMDB_API_KEY}',
  tmdbBaseUrl: 'https://api.themoviedb.org/3',
  tmdbImageUrl: 'https://image.tmdb.org/t/p/w500'
};
EOF

echo "Arquivos de environment gerados com sucesso."