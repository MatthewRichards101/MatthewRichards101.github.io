import { About } from './components/About';
import { Background } from './components/Background';
import { BeliefQuote } from './components/BeliefQuote';
import { Contact } from './components/Contact';
import { CuriosityMap } from './components/CuriosityMap';
import { Exploring } from './components/Exploring';
import { FeaturedProject } from './components/FeaturedProject';
import { Hero } from './components/Hero';
import { Journey } from './components/Journey';
import { MotionProvider } from './components/MotionProvider';
import { Nav } from './components/Nav';
import { RecentlyBuilt } from './components/RecentlyBuilt';
import { SectionDivider } from './components/SectionDivider';

export default function Home() {
  return (
    <MotionProvider>
      <div className="relative min-h-screen overflow-hidden bg-[#05060a] text-white">
        <Background />
        <Nav />

        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Journey />
        <BeliefQuote />
        <SectionDivider />
        <Exploring />
        <SectionDivider />
        <RecentlyBuilt />
        <SectionDivider />
        <CuriosityMap />
        <SectionDivider />
        <FeaturedProject />
        <SectionDivider />
        <Contact />

        <footer className="border-t border-white/6 px-6 py-10">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 md:flex-row">
            <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">Matthew Richards</span>
            <span className="text-xs text-zinc-700">&copy; 2026</span>
          </div>
        </footer>
      </div>
    </MotionProvider>
  );
}
