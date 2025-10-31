export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50 border-y border-border">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title mb-8">About Me</h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <p className="section-subtitle">
              I'm a passionate BSIT student with a strong foundation in web development, software engineering, and
              emerging technologies. My journey in tech has been driven by curiosity and a desire to build solutions
              that make a real impact.
            </p>
            <p className="section-subtitle">
              With hands-on experience in full-stack development, I've worked on diverse projects ranging from
              responsive web applications to backend systems. I'm particularly interested in modern frameworks, cloud
              technologies, and best practices in software development.
            </p>
            <p className="section-subtitle">
              Beyond coding, I'm committed to continuous learning and staying updated with industry trends. I believe in
              writing clean, maintainable code and collaborating effectively with teams to deliver exceptional results.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
              <h3 className="text-lg font-semibold text-primary mb-2">Education</h3>
              <p className="text-muted-foreground">Bachelor of Science in Information Technology</p>
              <p className="text-sm text-muted-foreground/70">University Name • Year</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
              <h3 className="text-lg font-semibold text-secondary mb-2">Focus Areas</h3>
              <p className="text-muted-foreground">Web Development, Mobile Apps, Cloud Technologies</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
              <h3 className="text-lg font-semibold text-primary mb-2">Experience Level</h3>
              <p className="text-muted-foreground">3+ internships & multiple freelance projects</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
