let currentLanguage = 'en-us';

function toggleLanguage() {
  currentLanguage = currentLanguage === 'en-us' ? 'pt-br' : 'en-us';
  updateContentLanguage();
}

function updateContentLanguage() {
  const posts = document.querySelectorAll('#blog-posts li a');
  posts.forEach(post => {
    const postId = post.getAttribute('href').split('/').pop();
    const translatedPost = getTranslatedPost(postId, currentLanguage);
    post.textContent = translatedPost.title;
  });
}

function getTranslatedPost(postId, language) {
  // Exemplo de dados de posts traduzidos
  const posts = {
    'post1': {
      'en-us': { title: 'Post 1' },
      'pt-br': { title: 'Postagem 1' }
    },
    'post2': {
      'en-us': { title: 'Post 2' },
      'pt-br': { title: 'Postagem 2' }
    },
    'post3': {
      'en-us': { title: 'Post 3' },
      'pt-br': { title: 'Postagem 3' }
    }
  };
  return posts[postId][language];
}
