// import { Button } from "../components/ui/Button"
import { motion } from 'framer-motion'
// import { useNavigate } from 'react-router-dom'
import { BRAND_NAME, BRAND_ELEVATOR_PITCH } from "../globals"

export default function Hero() {
  // const navigate = useNavigate()
  
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
            className="mb-6 text-4xl font-bold md:text-6xl content-primary"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {BRAND_NAME}
          </motion.h1>

          <motion.h2 
            className="mb-8 text-xl text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            {BRAND_ELEVATOR_PITCH}
          </motion.h2>


          <motion.div 
            className="flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 5 }}
          >

          </motion.div>
        </div>
      </motion.div>

    </section>
  )
}