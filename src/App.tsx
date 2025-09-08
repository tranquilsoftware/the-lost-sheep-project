import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'

// 3d grid.
import { WEBSITE_TITLE } from './globals'
import BlogCTA from './components/BlogCTA'

function App() {
  // Render app (actually a home page -- see router.tsx)
  return (
      <div className="min-h-screen bg-background-dark relative overflow-hidden">

          <title>{WEBSITE_TITLE}</title>

          {/* Animated Background with increased opacity */}
          <div className="absolute inset-0 z-0 w-full h-full">
            {/*BACKGROUND HERE*/}
          </div>

          {/* Extra Explicit Details - to stop annoying ugly mobile crap on stupid mobile browsers */}
          {/* <div className="min-h-screen bg-background-dark relative overflow-hidden" style={{
            minHeight: '100vh',
            height: '100%',
            width: '100%',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            padding: 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)'
          }}>
            <div className="absolute inset-0 z-0 w-full h-full">
              {isWebGLSupported() && <CoolGrid cameraMode={randomCameraMode} />}
            </div>
            <div className="relative z-10">
              <Header />
            </div>
          </div> */}


          <Header/>

          <Hero/>

          <div className="h-40"/>
          <About/>

          <div className="h-40"/>
          <BlogCTA/>

      </div>
  )
}

// // Function to check WebGL support
// function isWebGLSupported() {
//   try {
//     const canvas = document.createElement('canvas');
//     return !!(window.WebGLRenderingContext && (
//       canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
//     ));
//   } catch (e) {
//     return false;
//   }
// }

export default App
