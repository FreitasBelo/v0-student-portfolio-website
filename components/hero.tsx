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

        <div className="relative">
          <div className="w-full aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center border border-primary/20">
            <img src="/professional-developer-avatar.jpg" alt="Profile" className="w-full h-full rounded-2xl object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
