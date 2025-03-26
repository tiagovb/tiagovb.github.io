// Language handling
const languageSelect = document.getElementById('language-select');

// Get browser language or saved preference
const getPreferredLanguage = () => {
    const saved = localStorage.getItem('language');
    if (saved) return saved;
    
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.startsWith('pt') ? 'pt' : 'en';
};

// Set initial language
const currentLang = getPreferredLanguage();
localStorage.setItem('language', currentLang);

// Format date based on language
const formatDate = (dateStr, lang) => {
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', options);
};

// Add hover effect to navigation
const addNavHoverEffect = () => {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    // Mouse move effect for the spotlight
    document.addEventListener('mousemove', (e) => {
        const spotlight = document.querySelector('.group\\/spotlight > div:first-child');
        if (spotlight) {
            spotlight.style.background = `radial-gradient(600px circle at ${e.pageX}px ${e.pageY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
        }
    });
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
                const postDate = formatDate(post.date, lang);
                
                // Extract title from markdown (assuming first line is # Title)
                const titleMatch = postContent.match(/^#\s+(.+)$/m);
                const title = titleMatch ? titleMatch[1] : 'Untitled Post';
                
                // Remove title from content since we'll display it separately
                const contentWithoutTitle = postContent.replace(/^#\s+.+\n+/, '');
                const postHtml = marked.parse(contentWithoutTitle);
                
                const article = document.createElement('div');
                article.className = 'group relative grid grid-cols-8 gap-4 transition-all sm:items-center sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 mb-12';
                article.innerHTML = `
                    <div class="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                    <div class="z-10 col-span-6">
                        <p class="-mt-1 text-sm font-semibold leading-6">${postDate}</p>
                        <h3 class="-mt-1">
                            <a class="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base" href="#${post.filename}">
                                <span class="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                                <span>${title}</span>
                            </a>
                        </h3>
                        <div class="markdown mt-2 text-sm leading-normal">
                            ${postHtml}
                        </div>
                    </div>
                `;
                postsSection.appendChild(article);
            } catch (postError) {
                console.error(`Error loading post ${post.filename}:`, postError);
            }
        }
        
        // Handle empty posts list
        if (postsSection.children.length === 0) {
            postsSection.innerHTML = `
                <div class="text-slate-400">
                    <p>${lang === 'en' ? 'No posts available.' : 'Nenhum post disponível.'}</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading posts:', error);
        const postsSection = document.getElementById('posts');
        postsSection.innerHTML = `
            <div class="text-slate-400">
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

// Initialize content and UI effects
document.addEventListener('DOMContentLoaded', () => {
    addNavHoverEffect();
    updateContent(currentLang);
});