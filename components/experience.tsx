export default function Experience() {
  const experiences = [
    {
      role: "Junior Full-Stack Developer",
      company: "Tech Startup Inc.",
      period: "2024 - Present",
      description:
        "Developing and maintaining full-stack web applications using React, Node.js, and PostgreSQL. Collaborating with cross-functional teams to implement features and optimize performance.",
    },
    {
      role: "Frontend Development Intern",
      company: "Digital Solutions Ltd.",
      period: "2023 - 2024",
      description:
        "Built responsive UI components using React and Tailwind CSS. Improved website performance by 40% through optimization techniques and best practices.",
    },
    {
      role: "Web Development Intern",
      company: "Creative Agency",
      period: "2022 - 2023",
      description:
        "Assisted in developing client websites using HTML, CSS, JavaScript, and WordPress. Learned version control, responsive design, and client communication.",
    },
  ]

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <h2 className="section-title mb-12">Experience</h2>

      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="group bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
              <div>
                <h3 className="text-xl font-semibold text-primary group-hover:text-secondary transition-colors">
                  {exp.role}
                </h3>
                <p className="text-lg text-foreground">{exp.company}</p>
              </div>
              <span className="text-sm px-4 py-2 bg-primary/10 text-primary rounded-full whitespace-nowrap">
                {exp.period}
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
