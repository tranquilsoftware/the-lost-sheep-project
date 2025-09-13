import { BookOpen, Search as SearchIcon } from 'lucide-react';
import { BlogPost } from '../../data/blogPosts';
import { BlogPostCard } from './BlogPostCard';
import { CategoriesSection } from './CategoriesSection';
import { AnimatePresence, motion } from 'framer-motion';

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
      <CategoriesSection 
        categories={categories}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mt-8 mb-12 relative">
        <div className="relative group">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5 transition-colors group-focus-within:text-primary-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl pl-12 pr-4 py-4 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 dark:focus:border-primary-500 transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg"
          />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/5 to-accent-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </div>

      {/* Blog Posts */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center">
            <div className="relative">
              <BookOpen className="w-7 h-7 mr-3 text-primary-500" />
              <div className="absolute inset-0 w-7 h-7 mr-3 text-primary-500 animate-pulse-soft opacity-50" />
            </div>
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              {searchQuery ? 'Search Results' : 'Latest Articles'}
            </span>
          </h2>
          {filteredPosts.length > 0 && (
            <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
              {searchQuery && ` for "${searchQuery}"`}
            </div>
          )}
        </div>

        {filteredPosts.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {filteredPosts.map((post: BlogPost, index: number) => (
                <motion.div
                  key={`${post.slug}-${searchQuery}`}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { 
                      duration: 0.4,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    y: -20, 
                    scale: 0.95,
                    transition: { duration: 0.2 }
                  }}
                  layout
                  className="h-full"
                >
                  <BlogPostCard {...post} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="max-w-md mx-auto">
              <motion.div 
                className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.3,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
              >
                <SearchIcon className="w-8 h-8 text-slate-400 dark:text-slate-500" />
              </motion.div>
              <motion.h3 
                className="text-xl font-semibold text-slate-900 dark:text-white mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                No articles found
              </motion.h3>
              <motion.p 
                className="text-slate-600 dark:text-slate-400 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                We couldn't find any articles matching "{searchQuery}". Try adjusting your search terms or browse our categories.
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchQuery('')}
                className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors duration-200"
              >
                View All Articles
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}