import { Button } from "../components/ui/Button"
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const navigate = useNavigate()
  
  return (
    // <section className="relative w-full pt-64 pb-24 overflow-hidden bg-transparent">
    <section className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-transparent">


<div className="h-20" />

      {/* Content */}
      <motion.div 
        className="relative z-20 mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1 
            className="mb-6 text-4xl font-bold md:text-6xl gradient-text"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Tasmanian Web Design & Development
            {/* Get All Over The Web Like A Tuuarantula */}
          </motion.h1>

          

          {/* <motion.p 
            className="mb-8 text-xl text-content-white "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Stand out with a custom design
          </motion.p>
           */}



          <motion.p 
            className="mb-8 text-xl text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            {/* Developing premium websites and custom software solutions for businesses across Tasmania and Australia */}
            {/* Ongoing support and one-off solutions */}
            Stand out with a eye-catching custom design
          </motion.p>


          <motion.div 
            className="flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 5 }}
          >

            {/* View Work Button */}
            <Button
              className="bg-gradient-to-r from-primary-light to-accent hover:from-primary hover:to-accent-dark text-white"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Work
            </Button>


            {/* Build your Quote Button */}
            <Button
              variant="outline"
              className="border-border bg-white/5 text-white hover:bg-white/10"
              onClick={() => navigate('/quote-builder')}
            >
              Build your Quote
            </Button>
          </motion.div>
        </div>
      </motion.div>

    </section>
  )
}