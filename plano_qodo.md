
# Plano de Ajuste para GitHub Pages

## 1. Análise da Situação Atual
### 1.1. Estrutura Existente
- Site multilíngue com suporte a português e inglês
- Gerenciamento de temas claro/escuro
- Sistema de posts em markdown
- Sistema de perfil com avatar

### 1.2. Arquivos Principais
- `main.js`: Gerenciamento de temas e idiomas
- `index.html`: Página principal
- Arquivos markdown para conteúdo

## 2. Ajustes Necessários

### 2.1. Configuração do Repositório
1. Adicionar arquivo `_config.yml` com as configurações básicas:
   ```yaml
   title: "Tiago Viana"
   description: "Software Engineering"
   theme: jekyll-theme-minimal
   ```

### 2.2. Estrutura de Diretórios
1. Criar estrutura Jekyll padrão:
   ```
   tiagoviana.github.io/
   ├── _posts/
   │   ├── pt/
   │   └── en/
   ├── _layouts/
   ├── _includes/
   ├── assets/
   │   ├── css/
   │   ├── js/
   │   └── images/
   ├── _config.yml
   └── index.html
   ```

2. Mover posts existentes para `_posts/[idioma]/`
3. Criar arquivo `.nojekyll` na raiz caso não queira usar Jekyll

### 2.3. Ajustes nos Arquivos Existentes

#### 2.3.1. HTML/Layout
1. Adicionar metadados Jekyll no `index.html`:
   ```yaml
   ---
   layout: default
   title: Home
   ---
   ```

2. Criar layouts base em `_layouts/`
   - `default.html`
   - `post.html`
   - `page.html`

#### 2.3.2. JavaScript
1. Ajustar `main.js` para trabalhar com a estrutura Jekyll:
   - Atualizar caminhos dos posts
   - Adaptar carregamento de conteúdo

### 2.4. Configuração do GitHub Pages
1. Ir em Settings > Pages
2. Configurar source branch (main ou gh-pages)
3. Selecionar pasta raiz (/) como source
4. Verificar se GitHub Actions está habilitado

## 3. Plano de Execução

### 3.1. Preparação (Local)
```powershell
# Criar estrutura de diretórios
New-Item -ItemType Directory -Path "_posts", "_layouts", "_includes"
New-Item -ItemType Directory -Path "_posts/pt", "_posts/en"

# Criar arquivo _config.yml
New-Item -ItemType File -Path "_config.yml"

# Criar arquivo .nojekyll (se necessário)
New-Item -ItemType File -Path ".nojekyll"
```

### 3.2. Migração de Conteúdo
1. Mover posts existentes para estrutura Jekyll
2. Adicionar frontmatter YAML em cada post
3. Adaptar links e referências

### 3.3. Commit e Deploy
```powershell
# Adicionar alterações
git add .

# Criar commit
git commit -m "Ajustes para GitHub Pages"

# Enviar para o GitHub
git push origin main
```

## 4. Verificação Pós-Deploy

### 4.1. Checklist de Validação
- [ ] Acessar `https://tiagoviana.github.io`
- [ ] Verificar navegação multilíngue
- [ ] Testar troca de temas
- [ ] Validar carregamento de posts
- [ ] Verificar perfil e avatar
- [ ] Testar responsividade

### 4.2. Solução de Problemas
- Verificar logs do GitHub Actions
- Consultar build status em Settings > Pages
- Verificar console do navegador para erros JS
- Testar localmente usando Jekyll se necessário

## 5. Manutenção Contínua

### 5.1. Rotina de Atualização
1. Desenvolver em branch separada
2. Testar localmente
3. Criar Pull Request
4. Revisar e mergear
5. Verificar deploy automático

### 5.2. Monitoramento
- Acompanhar builds no GitHub Actions
- Verificar analytics (se implementado)
- Manter backup do conteúdo
- Atualizar dependências quando necessário
