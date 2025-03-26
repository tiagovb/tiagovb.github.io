# Plano de Ajustes para GitHub Pages - v3

## 1. Requisitos Identificados
- O projeto deve ser hospedado em um repositório com nome `username.github.io`
- GitHub Pages suporta conteúdo estático (HTML, CSS, JS)
- Se não usar Jekyll, é necessário arquivo `.nojekyll`
- O branch de publicação pode ser `main` ou `gh-pages`

## 2. Análise do Projeto Atual
- **Tecnologias**: HTML, CSS (Pico CSS), JavaScript
- **Estrutura**:
  - Página principal: `index.html`
  - Conteúdo em Markdown renderizado client-side com `marked.js`
  - Pastas organizadas (`assets`, `content`)
- **Compatibilidade**: Total com GitHub Pages (não usa Jekyll)

## 3. Ajustes Necessários

### 3.1. Configuração Básica
1. Criar arquivo `.nojekyll` na raiz do projeto
2. Verificar se todos os caminhos de arquivos são relativos
3. Configurar branch de publicação (`main`)

### 3.2. Arquivo .nojekyll
```bash
touch .nojekyll
```

### 3.3. Verificação de Caminhos
- Todos os assets devem usar caminhos relativos (ex: `./assets/css/style.css`)
- Verificar links internos no HTML/Markdown

### 3.4. Configuração do Repositório
1. Criar repositório com nome `username.github.io`
2. Configurar branch de publicação em Settings > Pages:
   - Branch: `main`
   - Pasta: `/ (root)`

## 4. Passo a Passo para Publicação

1. **Preparação Local**:
```bash
# Criar arquivo .nojekyll
touch .nojekyll

# Verificar estrutura
ls -la
```

2. **Configuração do Git**:
```bash
git init
git add .
git commit -m "Preparando para GitHub Pages"
```

3. **Criação do Repositório**:
- Criar novo repositório no GitHub com nome `username.github.io`
- Adicionar remote e fazer push:
```bash
git remote add origin https://github.com/username/username.github.io.git
git push -u origin main
```

4. **Configuração do GitHub Pages**:
- Acessar Settings > Pages
- Selecionar branch `main` e pasta `/ (root)`
- Salvar configurações

## 5. Verificação Pós-Publicação
- Acessar `https://username.github.io`
- Testar todas as funcionalidades:
  - Alternância de idioma
  - Tema claro/escuro
  - Carregamento de posts
  - Links internos

## 6. Observações
- O projeto atual já está bem estruturado para GitHub Pages
- Não é necessário usar Jekyll
- O tempo de publicação pode levar até 10 minutos após o push