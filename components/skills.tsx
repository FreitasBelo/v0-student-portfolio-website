export default function Skills() {
  const skillCategories = [
    {
      category: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"],
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL"],
    },
    {
      category: "Tools & Platforms",
      skills: ["Git", "GitHub", "VS Code", "Vercel", "Firebase", "Docker"],
    },
    {
      category: "Soft Skills",
      skills: ["Problem Solving", "Team Collaboration", "Communication", "Attention to Detail", "Project Management"],
    },
  ]

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <h2 className="section-title mb-12">Skills & Expertise</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {skillCategories.map((category, index) => (
          <div
            key={index}
            className="group bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
          >
            <h3 className="text-lg font-semibold text-primary mb-6">{category.category}</h3>
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-primary/10 text-foreground rounded-lg hover:bg-primary/20 hover:text-primary transition-colors text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
