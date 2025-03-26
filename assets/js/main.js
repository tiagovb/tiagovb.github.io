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
    
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.startsWith('pt') ? 'pt' : 'en';
};

const toggleLanguage = () => {
    const currentLang = localStorage.getItem('language') || getPreferredLanguage();
    const newLang = currentLang === 'en' ? 'pt' : 'en';
    localStorage.setItem('language', newLang);
    document.getElementById('lang-toggle').querySelector('span').textContent = newLang.toUpperCase();
    updateContent(newLang);
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

// Update content based on language
const updateContent = async (lang) => {
    try {
        // Load and render profile
        const profileResponse = await fetch(`content/profile/${lang}.md`);
        if (!profileResponse.ok) throw new Error('Failed to load profile');
        
        const profileContent = await profileResponse.text();
        document.getElementById('profile-content').innerHTML = marked.parse(profileContent);
        
    } catch (error) {
        console.error('Error loading content:', error);
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Set up theme toggle
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    
    // Set up language toggle
    const currentLang = getPreferredLanguage();
    localStorage.setItem('language', currentLang);
    document.getElementById('lang-toggle').querySelector('span').textContent = currentLang.toUpperCase();
    
    document.getElementById('lang-toggle').addEventListener('click', toggleLanguage);
    
    // Initialize content and effects
    addSpotlightEffect();
    updateContent(currentLang);
});