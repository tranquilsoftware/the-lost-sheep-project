import { BookOpen } from 'lucide-react';
import { getAllBlogPosts } from '../data/blogPosts';

export default function BlogCTA() {
  const blogPosts = getAllBlogPosts();
  const postCount = blogPosts.length;

  const stats = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      value: `${postCount}`,
      label: "Articles Published"
    },
    // Temporarily commented out as per request
    // {
    //   icon: <Users className="w-6 h-6" />,
    //   value: "50K+",
    //   label: "Monthly Readers"
    // },
    // {
    //   icon: <TrendingUp className="w-6 h-6" />,
    //   value: "95%",
    //   label: "Satisfaction Rate"
    // }
  ];

  return (
    <>
      <section className="relative py-20 overflow-visible bg-background">
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-6 text-3xl md:text-4xl font-bold gradient-text">
              Ready to Elevate Your Digital Presence?
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-description mb-10">
              {/* Get expert insights, tips, and strategies delivered straight to your inbox. 
              Stay ahead of the curve! */}
              Expert insights, zero effort. We research, you benefit - all in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              {/* Temporarily commented out as per request
              <button 
                className="group relative px-8 py-4 bg-gradient-to-r from-primary to-cyan-500 text-white font-medium rounded-lg 
                          overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" /> Subscribe to Newsletter
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              */}
              
              {/*  more subtle blue darker
              <button 
                className="px-8 py-4 bg-transparent border-2 border-primary/30 text-primary font-medium rounded-lg
                          hover:bg-primary/10 transition-all duration-300 flex items-center justify-center gap-2"
              > */}

              <button 
                className="group relative px-8 py-4 bg-gradient-to-r from-primary to-cyan-500 text-white font-medium rounded-lg 
                          overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
                onClick={() => window.location.href = '/blog'}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <BookOpen className="w-5 h-5" /> Read Our Blog
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
            
            {stats.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-8 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className="relative p-6 rounded-xl bg-card-gradient from-primary/10 via-primary/5 to-transparent 
                              backdrop-blur-sm border border-border/30 hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="text-primary mb-3 flex justify-center">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-content-secondary text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}