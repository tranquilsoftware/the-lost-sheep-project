import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import BlogCTA from './components/BlogCTA'
import ScrollTextAnimation from './components/animations/MotionScrollTextAnimation/ScrollTextAnimation'
import Footer from './components/Footer'
import { Matthew1914Quote } from './components/ui/BiblicalQuote';
import SEO from './components/SEO'
import ScrollRevealAnimations from './components/animations/ScrollRevealAnimations';

function App() {
  // Render app (actually a home page -- see router.tsx)
  return (
      <div className="min-h-screen bg-background-dark relative overflow-hidden">

          <SEO title="" description="" path="/" />

          {/* Regular content below animated sections */}
          <div className="relative z-10">
            <Header/>

            <Hero/>

            <ScrollTextAnimation
              text="For God so loved the world, that he gave his only begotten Son"
              scrollVelocity={3}
            />
            
            <ScrollTextAnimation
              text="that whosoever believeth on Him should not perish, but have everlasting life."
              scrollVelocity={-3}
            />

            {/* Scroll Reveal Animations Component */}
            {/* <ScrollRevealAnimations /> */}

            <About/>

            <BlogCTA/>

            <Matthew1914Quote/>

            <Footer/>
          </div>

      </div>
  )
}

export default App
