
export interface Comment {
    id: string;
    user: string;
    text: string;
    date: string;
}

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    image: string;
    readTime: string;
    status: 'draft' | 'published';
    category: string;
    comments: Comment[];
}

const initialComments: Comment[] = [
    {
        id: 'c1',
        user: 'Jane Doe',
        text: 'This is such an inspiring story! Keep up the great work.',
        date: '2025-10-16'
    }
];

const initialPosts: BlogPost[] = [
    {
        id: '1',
        title: 'The Impact of Clean Water in Kitui',
        excerpt: 'How a single well transformed the lives of 500 families in rural Kenya.',
        content: `
      ## A New Beginning for Kitui

      For decades, the residents of Kitui village had to walk over 5 kilometers every day to fetch water. This burden fell primarily on women and children, keeping them from work and school.

      Thanks to the generous donations from the Esanti community, we have successfully drilled a borehole that now provides clean, safe drinking water to over 500 families.

      ### The Ripple Effect

      The impact has been immediate and profound:
      - **Health:** Waterborne diseases have dropped by 80%.
      - **Education:** School attendance has increased as children no longer need to spend hours fetching water.
      - **Economy:** Women have started small vegetable gardens, improving food security and income.

      We are just getting started. Your continued support makes these stories possible.
    `,
        author: 'Sarah M.',
        date: '2025-10-15',
        image: 'https://images.unsplash.com/photo-1574482620826-40685ca5ebd2?q=80&w=2574&auto=format&fit=crop',
        readTime: '5 min read',
        status: 'published',
        category: 'Water',
        comments: initialComments
    },
    {
        id: '2',
        title: 'Empowering Women Farmers in Ghana',
        excerpt: 'Our organic farming cooperative is changing the agricultural landscape.',
        content: 'Full content regarding the cooperative...',
        author: 'Kwame O.',
        date: '2025-11-02',
        image: 'https://images.unsplash.com/photo-1605000797499-95a059e51b84?q=80&w=2592&auto=format&fit=crop',
        readTime: '4 min read',
        status: 'published',
        category: 'Agriculture',
        comments: []
    }
];

const STORAGE_KEY = 'esanti_blog_data';
const CATEGORIES_KEY = 'esanti_blog_categories';

export const getBlogPosts = (): BlogPost[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    return initialPosts;
};

export const saveBlogPosts = (posts: BlogPost[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};

export const deleteBlogPost = (id: string) => {
    const posts = getBlogPosts().filter(p => p.id !== id);
    saveBlogPosts(posts);
};

export const getCategories = (): string[] => {
    const stored = localStorage.getItem(CATEGORIES_KEY);
    if (stored) return JSON.parse(stored);
    return ['Water', 'Agriculture', 'Education', 'Health', 'Technology'];
};

export const saveCategories = (categories: string[]) => {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
};

export const addComment = (postId: string, comment: Comment) => {
    const posts = getBlogPosts();
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex >= 0) {
        if (!posts[postIndex].comments) posts[postIndex].comments = [];
        posts[postIndex].comments.push(comment);
        saveBlogPosts(posts);
    }
};
