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
      className="card-gradient rounded-xl border border-border overflow-hidden hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 h-full flex flex-col cursor-pointer group"
    >
      {image && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="p-8 flex-grow flex flex-col">
        <div className="flex items-center justify-between text-sm text-content-secondary mb-4">
          <div className="flex items-center">
            <span>{date}</span>
            <span className="mx-4">-</span>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{readTime}</span>
            </div>
          </div>
          <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
            {category}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors leading-tight">{title}</h3>
        <p className="text-content-secondary mb-6 flex-grow text-base leading-relaxed">{excerpt}</p>
      </div>
    </motion.div>
  );
}
