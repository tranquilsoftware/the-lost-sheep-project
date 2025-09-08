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
                <div className="absolute -inset-1 -bottom-10 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 rounded-full blur-2xl group-hover:blur-[100px] transition-all duration-500 opacity-80 group-hover:opacity-100 z-0"></div>
                
                <div className="relative z-10 aspect-square w-[300px] h-[300px] mx-auto rounded-full ">
                  <img 
                    // src="/logo_no_bg.png"
                    src={LOGO}
                    alt="Tranquil Software Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12 relative z-10">
              <h2 className="text-3xl font-bold mb-6 gradient-text">About {BRAND_NAME}</h2>
              <div className="space-y-4">
               
                <p className="text-content-secondary">
                  At {BRAND_NAME}, we're not just web designers
                  - we're your local technical experts and consultants for all things tech-related.
                  Our passion lies in delivering custom creative solutions personalised to your business needs.
                </p>

                {/* <p className="text-content-secondary"> */}
                  {/* Our values are simple: we create beautiful software that your business and customers will love to use. We believe in building intuitive applications that showcase your vision perfectly. After all, seeing is believing, and we're passionate about creating amazing software that helps your business grow.                </p> */}
               
                <p className="text-content-secondary">
                  Whether you're looking to startup or an established brand, we're here to be your personal technology partner. Let us help you scale in the digital world!
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
