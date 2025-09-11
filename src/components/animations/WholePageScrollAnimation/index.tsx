import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Section from "./Section";
import { VIDEO_1, VIDEO_2, VIDEO_3, VIDEO_4, VIDEO_5 } from "../../../globals";

export default function AnimationScrollPage() {
  const [video, setVideo] = useState("/section1.mp4");
  const [bgOpacity, setBgOpacity] = useState(0.7);

  return (
    <main className="min-h-screen">
      <section className="min-h-screen flex justify-center items-center">
        <h1 className="font-bold text-neutral-900 text-5xl">Hero section</h1>
      </section>

      {/* <section className="bg-black/70"> */}
      <div className="relative">
      <div className="sticky top-0 h-screen w-full">
        <AnimatePresence mode="wait">
          <motion.video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src={video}
            key={video}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        </AnimatePresence>
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: bgOpacity }}
        />
      </div>
        <section className="relative z-10">
        {/* Scroll Sections */}
        <Section video={VIDEO_1} setVideo={setVideo} setBgOpacity={setBgOpacity}>
          Welcome to the era of scroll animations.
        </Section>

        <Section video={VIDEO_2} setVideo={setVideo} setBgOpacity={setBgOpacity}>
          This demo seamlessly blends video content with aesthetic interaction.
        </Section>

        <Section video={VIDEO_3} setVideo={setVideo} setBgOpacity={setBgOpacity}>
          You navigate simply by scrolling.
        </Section>

        <Section video={VIDEO_4} setVideo={setVideo} setBgOpacity={setBgOpacity}>
          You've never seen everything like this before.
        </Section>

        <Section video={VIDEO_5} setVideo={setVideo} setBgOpacity={setBgOpacity}>
          You've never seen everything like this before.
        </Section>
        </section>
      </div>

      <section className="min-h-screen flex justify-center items-center">
        <h1 className="font-bold text-neutral-900 text-5xl">End section</h1>
      </section>
    </main>
  );
}
