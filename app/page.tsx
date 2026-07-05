'use client';

import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.h1 
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            MR
          </motion.h1>
          <div className="flex gap-8">
            <a href="#about" className="hover:text-blue-400 transition">About</a>
            <a href="#work" className="hover:text-blue-400 transition">Work</a>
            <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2 
            className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            Matthew Richards
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-slate-300 mb-8"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
          >
            Premium Digital Professional
          </motion.p>
          
          <motion.p 
            className="text-lg text-slate-400 mb-12 max-w-2xl"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.4 }}
          >
            Crafting exceptional digital experiences and innovative solutions
          </motion.p>
          
          <motion.div 
            className="flex gap-4 justify-center"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.6 }}
          >
            <button className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition">
              View Work
            </button>
            <button className="px-8 py-3 border-2 border-blue-500 hover:bg-blue-500/10 rounded-lg font-semibold transition">
              Get in Touch
            </button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-800/50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h3 
            className="text-4xl font-bold mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h3>
          <motion.p 
            className="text-lg text-slate-300 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            I'm a passionate digital professional dedicated to creating impactful solutions and memorable experiences.
          </motion.p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center text-slate-400">
          <p>&copy; 2026 Matthew Richards. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
