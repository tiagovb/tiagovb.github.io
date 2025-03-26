# Estado Atual do Projeto (AS-IS)

O projeto consiste em um blog multilíngue (Inglês - EN_US e Português - PT_BR) funcional, implementado utilizando tecnologias compatíveis com o GitHub Pages.

**Estrutura e Tecnologias:**

*   **Tecnologias Base:** Utiliza exclusivamente HTML, CSS e JavaScript (client-side).
*   **Framework CSS:** Implementado com Pico CSS, proporcionando um visual elegante e minimalista.
*   **Temas:** Possui temas claro e escuro, com o tema escuro definido como padrão e um controle funcional para alternância.
*   **Estrutura de Arquivos:** Organização bem definida para gerenciar o conteúdo multilíngue, incluindo pastas separadas para posts e perfis em cada idioma (`content/posts/en`, `content/posts/pt`, `content/profile/`).

**Funcionalidades Implementadas:**

*   **Multilinguismo:**
    *   Detecta automaticamente o idioma preferencial do navegador do usuário.
    *   Oferece um seletor manual para que o usuário possa alternar entre inglês e português.
    *   Armazena a preferência de idioma do usuário no `localStorage` para visitas futuras.
*   **Gerenciamento de Conteúdo:**
    *   Utiliza a biblioteca `marked.js` para renderizar posts e perfis escritos em formato Markdown para HTML.
    *   Carrega e exibe o conteúdo do perfil (`en.md` ou `pt.md`) na página inicial, de acordo com o idioma selecionado.
    *   Exibe a imagem do avatar do autor na página inicial.
    *   Carrega e exibe os posts do blog a partir de arquivos Markdown, utilizando arquivos de índice JSON (`index.json`) para cada idioma.
*   **Formatação:**
    *   Formata as datas dos posts de acordo com as convenções do idioma selecionado (EN_US ou PT_BR).

**Conteúdo Existente:**

*   **Perfis:** Arquivos de perfil em inglês (`en.md`) e português (`pt.md`).
*   **Posts:** Conjuntos de posts em inglês e português, com conteúdo traduzido correspondente.
*   **Índices:** Arquivos JSON (`index.json`) que listam os posts disponíveis para cada idioma.

Em resumo, a implementação atual já contempla os requisitos fundamentais de um blog multilíngue, estático, elegante e funcional para hospedagem no GitHub Pages.