import { motion } from 'framer-motion';
import { ScrollAnimation } from './animations/ScrollAnimation';
import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  technologies: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'ARBL Carpentry',
    description: 'Professional carpentry business',
    image: 'https://arblcarpentry.com/1.png',
    url: 'https://arblcarpentry.com',
    technologies: ['Vite', 'React', 'TypeScript', 'Tailwind CSS']
  },
  {
    id: 2,
    title: 'Spyra Designs',
    description: 'Creative handmade clothing business',
    image: 'https://i.imgur.com/A8xGqNf.jpeg',
    // https://i.imgur.com/A8xGqNf.jpeg
    url: 'https://tranquilsoftware.github.io/spyra.github.io/',
    technologies: ['Vite', 'React', 'TypeScript', 'Tailwind CSS']
  },

];

const Portfolio = () => {
  // const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Add cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--cursor-x', `${x}%`);
      document.documentElement.style.setProperty('--cursor-y', `${y}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="portfolio" className="relative py-20 bg-transparent overflow-hidden">
      <ScrollAnimation>
        <div className="container relative z-10 mx-auto px-4">


          {/* Section Title */}
          <h2 className="text-3xl font-bold text-center mb-4 gradient-text">
            Our Work
          </h2>

          {/* Content Description 
          <p className="text-content-secondary text-center max-w-2xl mx-auto italic mb-12">
            Projects featured with client consent
            {/*Projects that customers consented to publically showcase here:*-/}
          </p>*/}

          {/* Templates Card - Full width with half height */}
          {/* <TemplatesSection /> */}

          {/* Project cards grid */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8"></div> */}

          {/* Centered single project card with increased width */}
          <div className="max-w-4xl mx-auto flex flex-col gap-8"> {/* Added gap-8 and flex-col for proper spacing */}
            {projects.map((project) => (
                <motion.div
                    key={project.id}
                    className={`group relative rounded-xl overflow-hidden card-gradient animated-glow ${
                        hoveredId === project.id ? 'ring-2 ring-primary' : ''
                    }`}
                    whileHover={{scale: 1.02}}
                    onHoverStart={() => setHoveredId(project.id)}
                    onHoverEnd={() => setHoveredId(null)}
                    onFocus={() => setHoveredId(project.id)}
                    onBlur={() => setHoveredId(null)}
                    tabIndex={0}
                >
                  {/* Glow effect */}
                  <div
                      className="absolute inset-0 hero-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>

                  {/* Image container with increased height */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:blur-sm group-hover:brightness-20"
                    />
                  </div>

                  {/* Content overlay with larger text */}
                  <div
                      className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <h3
                        data-text={project.title}
                        className="relative z-10 text-2xl font-bold text-outline mb-3"
                    >
                      {project.title}
                    </h3>
                    <p className="text-secondary text-lg mb-6">{project.description}</p>

                    {/* Technology tags in oval shapes - appear on hover */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, index) => (
                          <motion.span
                              key={index}
                              initial={{opacity: 0, scale: 0.8}}
                              animate={{opacity: 1, scale: 1}}
                              transition={{delay: 0.2 + index * 0.1}}
                              className="inline-block px-3 py-1 rounded-full bg-primary/20 text-sm font-medium"
                          >
                            {tech}
                          </motion.span>
                      ))}
                    </div>


                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors duration-300 text-lg"
                    >
                      Visit Project
                    </a>
                  </div>
                </motion.div>
            ))}
          </div>
        </div>
      </ScrollAnimation>
    </section>
  );
};

export default Portfolio;
