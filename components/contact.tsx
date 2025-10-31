export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50 border-t border-border">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="section-title mb-6">Let's Work Together</h2>
        <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto">
          I'm always interested in hearing about new projects and opportunities. Whether you have a question or just
          want to say hi, feel free to reach out!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <a
            href="mailto:your.email@example.com"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Send Email
          </a>
          <a
            href="#"
            className="px-8 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-medium"
          >
            Download Resume
          </a>
        </div>

        <div className="flex justify-center gap-6 mb-12">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.474-2.236-1.68-2.236-.915 0-1.461.612-1.701 1.202-.087.216-.109.516-.109.816v5.787h-3.553s.047-9.411 0-10.392h3.553v1.471c.459-.708 1.282-1.716 3.119-1.716 2.279 0 3.986 1.489 3.986 4.691v5.946zM5.337 8.855c-1.144 0-1.915-.759-1.915-1.71 0-.955.769-1.71 1.958-1.71 1.187 0 1.915.755 1.938 1.71 0 .951-.751 1.71-1.981 1.71zm1.581 11.597H3.722V9.06h3.196v11.392zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
            </svg>
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 002.856-3.39 9.959 9.959 0 01-2.799.823c.999-.596 1.755-1.541 2.113-2.67-.936.556-1.974.957-3.089 1.175a4.993 4.993 0 00-8.538 4.55 14.178 14.178 0 01-10.288-5.2 4.961 4.961 0 001.545 6.659 4.988 4.988 0 01-2.262-.567v.06a4.993 4.993 0 003.997 4.9 4.996 4.996 0 01-2.252.085 4.994 4.994 0 004.659 3.468 10.025 10.025 0 01-6.177 2.131c-.399 0-.779-.023-1.17-.067a14.043 14.043 0 007.577 2.21c9.056 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.935 9.935 0 002.46-2.548l.046-.06z" />
            </svg>
          </a>
        </div>

        <p className="text-sm text-muted-foreground">© 2025 Your Name. All rights reserved.</p>
      </div>
    </section>
  )
}
