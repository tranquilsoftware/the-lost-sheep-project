export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  image?: string;
  slug: string; // this has to be the exact *.md file name
  category: string;
  tagline?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'My First Blog Post',
    excerpt: 'This is a sample blog post excerpt.',
    readTime: '5 min read',
    date: '2023-01-01',
    // image: 'https://placeholder.co/150',
    slug: 'my-first-post',
    category: 'Technology',
    tagline: 'Exploring the future of technology'
  },
  {
    id: '2',
    title: 'Brief Overview of Archaeological Evidence',
    excerpt: 'This is a sample blog post excerpt.',
    readTime: '5 min read',
    date: '2023-01-01',
    slug: 'brief-overview-of-archaeological-evidence',
    category: 'Historical Evidence',
  },
  {
    id: '3',
    title: 'Common Misconceptions of the Bible',
    excerpt: 'Addressing common misconceptions about the Bible with overwhelming manuscript evidence and archaeological facts.',
    readTime: '5 min read',
    date: '2023-01-01',
    slug: 'common-misconceptions-of-the-bible',
    category: 'Historical Evidence',
  },
  {
    id: '4',
    title: 'No Evidence Has Ever Disproven the Bible or Jesus Christ',
    excerpt: 'Examining the historical and archaeological evidence that confirms the Bible\'s accuracy and the reality of Jesus Christ.',
    readTime: '10 min read',
    date: '2024-01-16',
    // image: '/assets/blog/bible-evidence.jpg',
    slug: 'no-evidence-disproves-bible-jesus',
    category: 'Apologetics',
  },
  {
    id: '5',
    title: 'No One Dies for a Lie: The Martyrdom of the Disciples',
    excerpt: 'Examining how all of Jesus\' disciples died rather than deny that He was the Son of God - powerful evidence for the truth of the resurrection.',
    readTime: '8 min read',
    date: '2024-01-17',
    // image: '/assets/blog/disciples-martyrdom.jpg',
    slug: 'disciples-died-for-truth',
    category: 'Apologetics',
  },
  {
    id: '6',
    title: 'The Alexamenos Graffito: Ancient Graffiti That Proves Jesus Was Crucified',
    excerpt: 'Discover how this 2,000-year-old Roman graffiti provides powerful archaeological evidence for the crucifixion of Jesus and early Christian persecution.',
    readTime: '6 min read',
    date: '2024-01-18',
    // image: '/assets/blog/alexamenos-graffito.jpg',
    slug: 'alexamenos-graffito',
    category: 'Apologetics',
  },
  {
    id: '7',
    title: 'Big Bang Theory and God: Why Science Points to Divine Creation, Not Atheism',
    excerpt: 'Examining the Big Bang theory and its implications for the existence of God.',
    readTime: '8 min read',
    date: '2024-01-19',
    // image: '/assets/blog/big-bang-cosmos.jpg',
    slug: 'big-bang-theory-god-atheism-evidence',
    category: 'Philosophy & Science',
  }
];

// Helper function to get a blog post by slug
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

// Helper function to get all blog posts
export const getAllBlogPosts = (): BlogPost[] => {
  return [...blogPosts];
};

// Get all unique categories from blog posts
export const categories = Array.from(
  new Set(blogPosts.map(post => post.category))
).sort();

// Helper function to get posts by category
export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};
