import ClientShell from "@/components/providers/ClientShell";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Architecture from "@/components/sections/Architecture";
import Skills from "@/components/sections/Skills";
import Achievements from "@/components/sections/Achievements";
import Assistant from "@/components/sections/Assistant";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <ClientShell>
      <Navbar />
      <main id="main" className="relative">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Architecture />
        <Skills />
        <Achievements />
        <Assistant />
        <Contact />
      </main>
      <Footer />
    </ClientShell>
  );
}
