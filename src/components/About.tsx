import { ScrollAnimation } from './animations/ScrollAnimation'
import { BRAND_NAME, LOGO } from '../globals'

const About = () => {
  return (
    <section id="about" className="relative py-20 overflow-visible bg-transparent">
      <ScrollAnimation>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="relative group">
                <div className="absolute -inset-1 -bottom-10 bg-linear-to-r from-primary/30 via-accent/30 to-primary/30 rounded-full blur-2xl group-hover:blur-[100px] transition-all duration-500 opacity-80 group-hover:opacity-100 z-0"></div>
                
                <div className="relative z-10 aspect-square w-[300px] h-[300px] mx-auto rounded-full ">
                  <img 
                    // src="/logo_no_bg.png"
                    src={LOGO}
                    alt="The Lost Sheep Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12 relative z-10">
              <h2 className="text-3xl font-bold mb-6 gradient-text">About</h2>
              <div className="space-y-4">
               
                <p className="text-content-secondary">
                  {BRAND_NAME}, by proving Christ's through evidence, Jesus will bring peace and love to your heart.
                </p>

              </div>
            </div>
          </div>
        </div>
      </ScrollAnimation>

    </section>
  )
}

export default About
