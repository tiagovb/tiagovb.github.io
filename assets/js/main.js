// Theme handling
const themeToggle = document.getElementById('theme-toggle');
const getCurrentTheme = () => document.documentElement.getAttribute('data-theme');
const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
};

// Initialize theme (dark by default)
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

// Theme toggle button handler
themeToggle.addEventListener('click', () => {
    const newTheme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

// Language handling
const languageSelect = document.getElementById('language-select');
const siteTitle = document.getElementById('site-title');

// Get browser language or saved preference
const getPreferredLanguage = () => {
    const saved = localStorage.getItem('language');
    if (saved) return saved;
    
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.startsWith('pt') ? 'pt' : 'en';
};

// Set initial language
const currentLang = getPreferredLanguage();
languageSelect.value = currentLang;
localStorage.setItem('language', currentLang);

// Language titles
const titles = {
    en: 'My Blog',
    pt: 'Meu Blog'
};

// Format date based on language
const formatDate = (dateStr, lang) => {
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', options);
};

// Load and render posts from index
const loadPosts = async (lang) => {
    try {
        const indexResponse = await fetch(`content/posts/${lang}/index.json`);
        if (!indexResponse.ok) throw new Error('Failed to load posts index');
        
        const postsIndex = await indexResponse.json();
        const postsSection = document.getElementById('posts');
        postsSection.innerHTML = ''; // Clear previous posts
        
        for (const post of postsIndex) {
            try {
                const postResponse = await fetch(`content/posts/${lang}/${post.filename}`);
                if (!postResponse.ok) continue;
                
                const postContent = await postResponse.text();
                const postHtml = marked.parse(postContent);
                const postDate = formatDate(post.date, lang);
                
                const article = document.createElement('article');
                article.className = 'post-card';
                article.innerHTML = `
                    ${postHtml}
                    <footer>
                        <small>${postDate}</small>
                    </footer>
                `;
                postsSection.appendChild(article);
            } catch (postError) {
                console.error(`Error loading post ${post.filename}:`, postError);
            }
        }
        
        // Handle empty posts list
        if (postsSection.children.length === 0) {
            postsSection.innerHTML = `
                <article>
                    <p>${lang === 'en' ? 'No posts available.' : 'Nenhum post disponível.'}</p>
                </article>
            `;
        }
    } catch (error) {
        console.error('Error loading posts:', error);
        const postsSection = document.getElementById('posts');
        postsSection.innerHTML = `
            <article>
                <p>${lang === 'en' ? 'Error loading posts.' : 'Erro ao carregar posts.'}</p>
            </article>
        `;
    }
};

// Update content based on language
const updateContent = async (lang) => {
    try {
        // Update site title
        siteTitle.textContent = titles[lang];
        
        // Load and render profile
        const profileResponse = await fetch(`content/profile/${lang}.md`);
        if (!profileResponse.ok) throw new Error('Failed to load profile');
        
        const profileContent = await profileResponse.text();
        document.getElementById('profile-content').innerHTML = marked.parse(profileContent);
        
        // Load and render posts
        await loadPosts(lang);
    } catch (error) {
        console.error('Error loading content:', error);
    }
};

// Language change handler
languageSelect.addEventListener('change', (e) => {
    const newLang = e.target.value;
    localStorage.setItem('language', newLang);
    updateContent(newLang);
});

// Initialize content with current language
document.addEventListener('DOMContentLoaded', () => {
    updateContent(currentLang);
});