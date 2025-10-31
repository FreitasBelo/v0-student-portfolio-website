export default function Projects() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce application with user authentication, product management, shopping cart, and payment integration using Stripe.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
      link: "#",
    },
    {
      title: "Task Management App",
      description:
        "Real-time collaborative task management application with user collaboration features, drag-and-drop functionality, and data persistence.",
      technologies: ["Next.js", "Firebase", "Tailwind CSS", "TypeScript"],
      link: "#",
    },
    {
      title: "Weather Dashboard",
      description:
        "Interactive weather application that fetches real-time data from APIs, displays forecasts, and provides location-based weather information.",
      technologies: ["React", "OpenWeather API", "Chart.js", "Geolocation API"],
      link: "#",
    },
    {
      title: "Blog Platform",
      description:
        "Headless CMS blog platform with markdown support, SEO optimization, and static site generation for optimal performance.",
      technologies: ["Next.js", "MDX", "Vercel", "Tailwind CSS"],
      link: "#",
    },
  ]

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50 border-y border-border">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title mb-12">Featured Projects</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              className="group bg-background border border-border rounded-xl p-8 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center text-primary group-hover:gap-2 transition-all gap-0">
                <span>View Project</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
