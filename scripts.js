let currentLanguage = 'en-us';

function toggleLanguage() {
  currentLanguage = currentLanguage === 'en-us' ? 'pt-br' : 'en-us';
  updateContentLanguage();
}

function updateContentLanguage() {
  const posts = document.querySelectorAll('#blog-posts li a');
  posts.forEach(post => {
    const postId = post.getAttribute('href').split('/').pop();
    getTranslatedPost(postId, currentLanguage).then(translatedPost => {
      post.textContent = translatedPost.title;
    });
  });
}

async function getTranslatedPost(postId, language) {
  try {
    const response = await fetch(`/content/${postId}.json`);
    if (!response.ok) throw new Error('Post not found');
    const postData = await response.json();
    return postData[language];
  } catch (error) {
    console.error('Error fetching post:', error);
    return { title: 'Post not available' };
  }
}
