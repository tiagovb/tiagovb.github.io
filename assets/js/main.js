// Theme handling
const initTheme = () => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        document.getElementById('theme-toggle-light').classList.remove('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        document.getElementById('theme-toggle-dark').classList.remove('hidden');
    }
};

const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
        document.getElementById('theme-toggle-dark').classList.remove('hidden');
        document.getElementById('theme-toggle-light').classList.add('hidden');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
        document.getElementById('theme-toggle-light').classList.remove('hidden');
        document.getElementById('theme-toggle-dark').classList.add('hidden');
    }
};

// Language handling
const getPreferredLanguage = () => {
    const saved = localStorage.getItem('language');
    if (saved) return saved;
    return 'en'; // Default to English
};

const toggleLanguage = () => {
    const currentLang = localStorage.getItem('language') || 'en';
    const newLang = currentLang === 'en' ? 'pt' : 'en';
    localStorage.setItem('language', newLang);
    document.getElementById('lang-toggle').querySelector('span').textContent = 
        newLang === 'en' ? 'PT' : 'EN';
    updateContent(newLang);
};

// Format date based on language
const formatDate = (dateStr, lang) => {
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', options);
};

// Mouse move effect for the spotlight
const addSpotlightEffect = () => {
    document.addEventListener('mousemove', (e) => {
        const spotlight = document.querySelector('.group\\/spotlight > div:first-child');
        if (spotlight && document.documentElement.classList.contains('dark')) {
            spotlight.style.background = `radial-gradient(600px circle at ${e.pageX}px ${e.pageY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
        }
    });
};

// Load and render post thumbnails
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
                const postDate = formatDate(post.date, lang);
                
                // Extract title and first paragraph for excerpt
                const titleMatch = postContent.match(/^#\s+(.+)$/m);
                const title = titleMatch ? titleMatch[1] : lang === 'en' ? 'Untitled Post' : 'Post Sem Título';
                
                const excerptMatch = postContent.match(/^(?!#)(.+?)(?=\n|$)/m);
                const excerpt = excerptMatch ? excerptMatch[1] : '';
                
                const article = document.createElement('div');
                article.className = 'post-thumbnail';
                article.innerHTML = `
                    <h3>${title}</h3>
                    <div class="post-date">${postDate}</div>
                    <p class="post-excerpt">${excerpt}</p>
                `;
                postsSection.appendChild(article);
            } catch (postError) {
                console.error(`Error loading post ${post.filename}:`, postError);
            }
        }
        
        // Handle empty posts list
        if (postsSection.children.length === 0) {
            postsSection.innerHTML = `
                <div class="text-slate-600 dark:text-slate-400">
                    <p>${lang === 'en' ? 'No posts available.' : 'Nenhum post disponível.'}</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading posts:', error);
        const postsSection = document.getElementById('posts');
        postsSection.innerHTML = `
            <div class="text-slate-600 dark:text-slate-400">
                <p>${lang === 'en' ? 'Error loading posts.' : 'Erro ao carregar posts.'}</p>
            </div>
        `;
    }
};

// Update content based on language
const updateContent = async (lang) => {
    try {
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    
    // Set up language toggle with English as default
    const currentLang = getPreferredLanguage();
    localStorage.setItem('language', currentLang);
    document.getElementById('lang-toggle').querySelector('span').textContent = 
        currentLang === 'en' ? 'PT' : 'EN';
    
    document.getElementById('lang-toggle').addEventListener('click', toggleLanguage);
    
    // Initialize content and effects
    addSpotlightEffect();
    updateContent(currentLang);
});