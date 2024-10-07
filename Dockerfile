FROM node:18-alpine AS build 

WORKDIR /app

COPY package*.json ./

# 4. Instalar as dependências
RUN npm install

# 5. Copiar o restante dos arquivos da aplicação
COPY . .

# 6. Criar o build da aplicação
RUN npm run build

# 7. Utilizar uma imagem Nginx para servir a aplicação
FROM nginx:alpine

# 8. Copiar o build gerado para o diretório do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# 9. Expor a porta 80 para servir a aplicação
EXPOSE 80 

# 10. Rodar o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]