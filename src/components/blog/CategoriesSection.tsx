import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Assuming these props are passed in
interface CategoriesSectionProps {
  categories: string[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function CategoriesSection({ categories, searchQuery, setSearchQuery }: CategoriesSectionProps) {
  return (
    <div className="mb-8 mt-6">
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category, index) => (
          <motion.button
            key={category}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
            onClick={() => setSearchQuery(category)}
            className={`group relative px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
              searchQuery === category
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-primary-50 dark:hover:bg-slate-700 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-200 dark:hover:border-primary-600 hover:shadow-md'
            }`}
          >
            <motion.span 
              className="relative z-10"
              animate={{ 
                color: searchQuery === category ? '#ffffff' : undefined 
              }}
              transition={{ duration: 0.2 }}
            >
              {category}
            </motion.span>
            
            {/* Background gradient overlay */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500/10 to-accent-500/10"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: searchQuery !== category ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Active state background with morphing effect */}
            {searchQuery === category && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 bg-primary-500 rounded-full shadow-lg shadow-primary-500/30"
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30,
                  duration: 0.4
                }}
              />
            )}
          </motion.button>
        ))}
        
        <AnimatePresence>
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -20 }}
              transition={{ 
                duration: 0.3,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ 
                scale: 0.95,
                transition: { duration: 0.1 }
              }}
              onClick={() => setSearchQuery('')}
              className="group relative px-4 py-2.5 rounded-full font-medium text-sm bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-600 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-600 transition-all duration-300 flex items-center gap-2"
            >
              <motion.div
                animate={{ rotate: 0 }}
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-4 h-4" />
              </motion.div>
              Clear Filter
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}