import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import { Experience } from "@/components/Experience";
import { projectsData, timelineData } from "@/constants";
import { Projects } from "@/components/Projects";
import { ContactCard } from "@/components/ContactCard";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import { TechStack } from "@/components/TechStack";

export default function Home() {
  return (
    <ThemeProvider>
      <div className="theme-transition">
        <NavBar />
        <main className="relative">
          <section id="home">
            <Hero />
          </section>
          <section id="experience">
            <Experience data={timelineData} />
          </section>
          <TechStack />
          <section id="projects">
            <Projects data={projectsData} />
          </section>
          <section id="contact">
            <ContactCard />
          </section>
          <Footer />
        </main>
      </div>
    </ThemeProvider>
  );
}
