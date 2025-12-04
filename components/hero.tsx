import Image from "next/image";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance leading-tight">
            Hi, I'm <span className="text-primary">Emilio M. Freitas Belo</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-4 leading-relaxed">
            BSIT Student | Full-Stack Developer | Tech Enthusiast
          </p>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Passionate about building modern web applications and exploring emerging technologies. I combine creative
            problem-solving with technical expertise to create impactful digital solutions.
          </p>
          <div className="flex gap-4">
            <a
              href="#contact"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Get In Touch
            </a>
            <a
              href="#projects"
              className="px-8 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-medium"
            >
              View Work
            </a>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="w-40 h-40 md:w-56 md:h-56 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full overflow-hidden flex items-center justify-center border border-primary/20 shadow-lg">
            <Image
              src="/professional-developer-avatar.jpg"
              alt="Profile"
              width={224}
              height={224}
              priority
              quality={90}
              sizes="(max-width: 768px) 160px, 224px"
              className="w-full h-full object-cover transform-gpu transition-transform duration-200 hover:scale-105 filter saturate-105 contrast-105"
            />
            <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-white/30" />
          </div>
        </div>
      </div>
    </section>
  )
}
