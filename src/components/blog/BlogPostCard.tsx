import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useNavigation } from '../../utils/navigationUtils';
import { BlogPost } from '../../data/blogPosts';

export function BlogPostCard({
  title,
  excerpt,
  date,
  readTime,
  category,
  slug,
  image,
}: BlogPost) {
  const navigateUtil = useNavigation();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={() => navigateUtil(`${slug}`, true)}
      className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/5 transition-all duration-500 h-full flex flex-col cursor-pointer transform hover:-translate-y-1"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {image && (
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50 dark:from-slate-800 dark:to-slate-700">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </div>
      )}
      
      <div className="relative p-6 flex-grow flex flex-col">
        {/* Meta information */}
        <div className="flex items-center justify-between text-sm mb-4 flex-shrink-0">
          <div className="flex items-center text-slate-600 dark:text-slate-400">
            <span className="font-medium">{date}</span>
            <span className="mx-2 text-slate-400">•</span>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1.5" />
              <span>{readTime}</span>
            </div>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            {category}
          </span>
        </div>
        
        {/* Content container - this will center the title and excerpt */}
        <div className="flex-grow flex flex-col justify-center">
          {/* Title */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight line-clamp-2">
            {title}
          </h3>
          
          {/* Excerpt */}
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-3">
            {excerpt}
          </p>
        </div>
        
        {/* Read more indicator */}
        <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors flex-shrink-0 mt-4">
          <span>Read more</span>
          <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}