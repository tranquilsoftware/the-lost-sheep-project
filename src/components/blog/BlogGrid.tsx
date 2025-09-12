import { BookOpen, Search as SearchIcon } from 'lucide-react';
import { BlogPost } from '../types';
import { BlogPostCard } from './BlogPostCard';

interface BlogGridProps {
  categories: string[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredPosts: BlogPost[];
}

export function BlogGrid({ 
  categories, 
  searchQuery, 
  setSearchQuery, 
  filteredPosts 
}: BlogGridProps) {
  return (
    <>
      {/* Categories Section */}
      <div className="mb-4 mt-4">
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <button 
              key={category}
              onClick={() => setSearchQuery(category)}
              className={`px-4 py-2 rounded-full border transition-colors ${
                searchQuery === category 
                  ? 'bg-primary/10 border-primary text-primary' 
                  : 'bg-background border-border text-content-secondary hover:bg-primary/10 hover:text-primary'
              }`}
            >
              {category}
            </button>
          ))}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 rounded-full bg-background border border-border text-content-secondary hover:bg-primary/10 hover:text-primary transition-colors"
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mt-8 relative">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-content-secondary w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full bg-background border border-border rounded-lg pl-12 pr-4 py-3 text-content-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
          />
        </div>
      </div>

      {/* Blog Posts */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white flex items-center pt-8">
            <BookOpen className="w-6 h-6 mr-2 text-primary-light" />
            {searchQuery ? 'Search Results' : 'Latest Articles'}
          </h2>
        </div>
        
        {filteredPosts.length > 0 ? (
          <div className="grid 
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-8"
          >
            {filteredPosts.map((post: BlogPost, index: number) => (
              <BlogPostCard key={index} {...post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-content-secondary text-lg">
              No articles found matching "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    </>
  );
}
