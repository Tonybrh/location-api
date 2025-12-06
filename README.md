# 📍 Location API - Backend

API RESTful para gerenciamento de locais com upload de imagens para AWS S3, desenvolvida com NestJS seguindo princípios
de Clean Architecture e Domain-Driven Design (DDD).

## 🎯 Sobre o Projeto

Sistema fullstack para cadastro e visualização de pontos de interesse em um mapa interativo. Este repositório contém o *
*backend** da aplicação, responsável por:

- CRUD completo de locais
- Upload de imagens para AWS S3
- Integração com PostgreSQL via Prisma ORM
- Documentação automática com Swagger
- Arquitetura limpa e escalável

🔗 **Links:**

- **API em Produção:** [https://location-api-bd7h.onrender.com/api](https://location-api-bd7h.onrender.com/api)
- **Documentação (Swagger):
  ** [https://location-api-bd7h.onrender.com/api/docs](https://location-api-bd7h.onrender.com/api/docs)
- **Frontend:** [Repositório do Frontend](https://github.com/Tonybrh/location-front)

---

## 🏗️ Decisões de Arquitetura

### **Clean Architecture + Domain-Driven Design (DDD)**

A aplicação foi estruturada seguindo os princípios de Clean Architecture e DDD, garantindo:

- ✅ **Separação de responsabilidades** clara entre camadas
- ✅ **Independência de frameworks** - regras de negócio isoladas
- ✅ **Testabilidade** - componentes desacoplados e facilmente testáveis
- ✅ **Manutenibilidade** - código organizado e escalável

### **Estrutura de Diretórios**

```
.
├── prisma/
│   ├── schema.prisma           # Schema do banco de dados
├── src/
│   ├── app.module.ts           # Módulo principal da aplicação
│   ├── main.ts                 # Ponto de entrada da aplicação
│   │
│   ├── domain/                 # Camada de Domínio (Regras de Negócio)
│   │   ├── entities/
│   │   │   └── location.entity.ts          # Entity com validações
│   │   └── repositories/
│   │       └── location.repository.interface.ts  # Contrato do repositório
│   │
│   ├── application/            # Camada de Aplicação (Casos de Uso)
│   │   ├── dtos/
│   │   │   ├── create-location.dto.ts      # DTO para criação
│   │   │   ├── update-location.dto.ts      # DTO para atualização
│   │   │   └── location-response.dto.ts    # DTO de resposta
│   │   └── use-cases/
│   │       ├── create-location.use-case.ts
│   │       ├── list-locations.use-case.ts
│   │       ├── get-location-by-id.use-case.ts
│   │       ├── update-location.use-case.ts
│   │       └── delete-location.use-case.ts
│   │
│   ├── infrastructure/         # Camada de Infraestrutura (Detalhes Técnicos)
│   │   ├── http/
│   │   │   ├── controllers/
│   │   │   │   └── location.controller.ts  # Controller REST
│   │   │   └── location.module.ts          # Módulo de locations
│   │   ├── repositories/
│   │   │   └── prisma-location.repository.ts  # Implementação Prisma
│   │   └── services/
│   │       ├── prisma.service.ts           # Serviço do Prisma
│   │       └── s3-upload.service.ts        # Serviço de upload S3
│   │
│   └── shared/                 # Recursos Compartilhados
│       └── tokens/
│           └── injection-tokens.ts         # Tokens para DI
│
├── test/                       # Testes
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
│
├── .env                        # Variáveis de ambiente
├── .env.example                # Exemplo de variáveis
├── package.json
├── tsconfig.json
└── render-build.sh             # Script de build para Render
```

### **Camadas e Responsabilidades**

#### 1️⃣ **Domain Layer (Camada de Domínio)**

- **Responsabilidade:** Contém as regras de negócio puras
- **Independência:** Não depende de nenhuma outra camada
- **Componentes:**
    - **Entities:** Objetos que representam conceitos do domínio com suas regras
    - **Repository Interfaces:** Contratos que definem como acessar dados

**Exemplo:** A entidade `Location` valida que latitude está entre -90 e 90, sem saber como os dados são salvos.

#### 2️⃣ **Application Layer (Camada de Aplicação)**

- **Responsabilidade:** Orquestra o fluxo da aplicação
- **Dependências:** Depende apenas da camada de domínio
- **Componentes:**
    - **Use Cases:** Implementam casos de uso específicos (ex: "Criar Location")
    - **DTOs:** Definem formato de entrada/saída de dados

**Exemplo:** `CreateLocationUseCase` orquestra: validar dados → criar entidade → fazer upload → salvar no banco.

#### 3️⃣ **Infrastructure Layer (Camada de Infraestrutura)**

- **Responsabilidade:** Implementa detalhes técnicos
- **Dependências:** Depende das camadas de domínio e aplicação
- **Componentes:**
    - **Controllers:** Recebem requisições HTTP
    - **Repository Implementations:** Implementam acesso ao banco
    - **External Services:** AWS S3, APIs externas, etc.

**Exemplo:** `PrismaLocationRepository` implementa `ILocationRepository` usando Prisma.

### **Padrões Utilizados**

- **Repository Pattern:** Abstração do acesso a dados
- **Dependency Injection:** Inversão de controle com tokens
- **DTO Pattern:** Validação e transformação de dados
- **Use Case Pattern:** Lógica de negócio isolada

### **Por que essa arquitetura?**

✅ **Manutenibilidade:** Mudanças em um framework (ex: trocar Prisma por TypeORM) não afetam regras de negócio

✅ **Testabilidade:** Use cases podem ser testados sem banco de dados real

✅ **Escalabilidade:** Novas features são adicionadas sem impactar código existente

✅ **Clareza:** Cada componente tem responsabilidade única e bem definida

---

## 🚀 Tecnologias

- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado do JavaScript
- **[Prisma](https://www.prisma.io/)** - ORM moderno para Node.js
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[AWS S3](https://aws.amazon.com/s3/)** - Armazenamento de arquivos
- **[Swagger](https://swagger.io/)** - Documentação da API
- **[Class Validator](https://github.com/typestack/class-validator)** - Validação de dados
- **[Class Transformer](https://github.com/typestack/class-transformer)** - Transformação de objetos

---

## 📋 Pré-requisitos

- **Node.js** >= 18.x
- **npm** ou **yarn**
- **PostgreSQL** >= 14.x (ou usar Docker)
- **Conta AWS** com bucket S3 configurado

---

## 🔧 Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/location-api.git
cd location-api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/location_api"

# Server
PORT=3000
NODE_ENV=development

# AWS S3
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_S3_BUCKET_NAME=your-bucket-name

# Frontend (CORS)
FRONTEND_URL=http://localhost:3000
```

### 4. Configure o banco de dados

#### Opção A: PostgreSQL Local

Certifique-se que o PostgreSQL está rodando:

```bash
# Criar banco de dados
createdb location_api
```

#### Opção B: Docker (Recomendado)

```bash
# Subir PostgreSQL com Docker
docker compose up -d
```

Atualize o `.env`:

```env
DATABASE_URL="postgresql://location_api:location_api@localhost:5432/location_api"
```

### 5. Execute as migrations do Prisma

```bash
# Gerar Prisma Client
npx prisma generate

# Executar migrations
npx prisma migrate dev --name init
```

### 6. (Opcional) Visualize o banco com Prisma Studio

```bash
npx prisma studio
```

Acesse: [http://localhost:5555](http://localhost:5555)

---

## ▶️ Executando a Aplicação

### Modo Desenvolvimento

```bash
npm run start:dev
```

A API estará disponível em: [http://localhost:3000](http://localhost:3000)

Documentação Swagger: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

### Modo Produção

```bash
# Build
npm run build

# Start
npm run start:prod
```

---

## 📚 Documentação da API

### Endpoints Disponíveis

#### **POST** `/api/locations`

Cria um novo local com upload de imagem

**Body (multipart/form-data):**

```
name: string (mín. 3 caracteres)
description: string
latitude: number (-90 a 90)
longitude: number (-180 a 180)
image: file (JPEG, PNG, WEBP, máx 5MB)
```

**Response 201:**

```json
{
  "id": "uuid",
  "name": "Cristo Redentor",
  "description": "Monumento icônico",
  "latitude": -22.951916,
  "longitude": -43.210487,
  "imageUrl": "https://bucket.s3.amazonaws.com/locations/uuid.jpg"
}
```

#### **GET** `/api/locations`

Lista todos os locais

**Response 200:**

```json
[
  {
    "id": "uuid",
    "name": "Cristo Redentor",
    "description": "Monumento icônico",
    "latitude": -22.951916,
    "longitude": -43.210487,
    "imageUrl": "https://bucket.s3.amazonaws.com/locations/uuid.jpg"
  }
]
```

#### **GET** `/api/locations/:id`

Busca um local por ID

**Response 200:** Objeto do local
**Response 404:** Local não encontrado

#### **PUT** `/api/locations/:id`

Atualiza um local (com ou sem nova imagem)

**Body (multipart/form-data):**

```
name?: string
description?: string
latitude?: number
longitude?: number
image?: file
```

#### **DELETE** `/api/locations/:id`

Deleta um local

**Response 204:** Sem conteúdo
**Response 404:** Local não encontrado

### Testando com cURL

```bash
# Criar location
curl -X POST http://localhost:3000/api/locations \
  -F "name=Cristo Redentor" \
  -F "description=Monumento icônico do Rio de Janeiro" \
  -F "latitude=-22.951916" \
  -F "longitude=-43.210487" \
  -F "image=@/caminho/para/imagem.jpg"

# Listar locations
curl http://localhost:3000/api/locations

# Buscar por ID
curl http://localhost:3000/api/locations/{id}

# Atualizar
curl -X PUT http://localhost:3000/api/locations/{id} \
  -F "name=Cristo Redentor Atualizado"

# Deletar
curl -X DELETE http://localhost:3000/api/locations/{id}
```

---

## 🌐 Deploy

### Deploy no Render.com

#### 1. Crie o banco PostgreSQL

- Acesse [render.com](https://render.com)
- New → PostgreSQL
- Configure e copie a **Internal Database URL**

#### 2. Crie o Web Service

- New → Web Service
- Conecte seu repositório GitHub
- Configure:
  ```
  Build Command: ./render-build.sh
  Start Command: npm run start:prod
  ```

#### 3. Adicione as variáveis de ambiente

```env
DATABASE_URL=[Internal Database URL]
NODE_ENV=production
PORT=3000
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=[Sua key]
AWS_SECRET_ACCESS_KEY=[Sua secret]
AWS_S3_BUCKET_NAME=[Seu bucket]
FRONTEND_URL=https://seu-frontend.vercel.app
```

#### 4. Deploy automático

Faça push para `main`:

```bash
git push origin main
```

O Render fará deploy automaticamente!

---

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Coverage
npm run test:cov
```

---

## 📦 Scripts Disponíveis

```bash
npm run build          # Compila o projeto
npm run start          # Inicia em produção
npm run start:dev      # Inicia em desenvolvimento com watch
npm run start:prod     # Inicia em produção
npm run lint           # Executa ESLint
npm run format         # Formata código com Prettier
npm run test           # Executa testes unitários
npm run test:e2e       # Executa testes e2e
npm run test:cov       # Gera relatório de cobertura
```

---

## 🔐 Configuração do AWS S3

### 1. Criar Bucket

- Acesse o console AWS S3
- Crie um novo bucket (ex: `location-app-images`)
- Região: `us-east-1` (ou outra de sua preferência)

### 2. Configurar Permissões

**Block Public Access:**

- Desmarque "Block all public access"

**Bucket Policy:**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::seu-bucket-name/*"
    }
  ]
}
```

**CORS Configuration:**

```json
[
  {
    "AllowedHeaders": [
      "*"
    ],
    "AllowedMethods": [
      "GET",
      "PUT",
      "POST",
      "DELETE",
      "HEAD"
    ],
    "AllowedOrigins": [
      "*"
    ],
    "ExposeHeaders": [
      "ETag"
    ]
  }
]
```

### 3. Criar IAM User

- IAM → Users → Create user
- Attach policy: `AmazonS3FullAccess`
- Crie Access Key e adicione no `.env`

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 👨‍💻 Autor

**Antônio Dias**

- GitHub: [@Tonybrh](https://github.com/Tonybrh)
- LinkedIn: [Antônio Dias](https://linkedin.com/in/dias-antonio)
- Email: antoniodias1106@gmail.com

---