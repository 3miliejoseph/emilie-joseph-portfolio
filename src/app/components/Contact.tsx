import { Mail, Linkedin, Github } from "lucide-react";

export function Contact() {
  return (
    <div className="min-h-screen bg-background py-16 sm:py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <div className="inline-block px-3 py-1 bg-accent rounded-full text-xs uppercase tracking-wider mb-4 sm:mb-6 text-muted-foreground">
            Contact
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 font-medium">Let's work together</h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-medium mb-6 sm:mb-8">Get in Touch</h2>
              
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-accent/20 border border-accent rounded-sm flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-medium mb-1">Email</h3>
                    <a href="mailto:emilieneha@gmail.com" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors break-all">
                      emilieneha@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-accent/20 border border-accent rounded-sm flex items-center justify-center flex-shrink-0">
                    <Linkedin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-medium mb-1">LinkedIn</h3>
                    <a 
                      href="https://www.linkedin.com/in/emilie-joseph-90n982229" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors break-all"
                    >
                      linkedin.com/in/emilie-joseph-90n982229
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-accent/20 border border-accent rounded-sm flex items-center justify-center flex-shrink-0">
                    <Github className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-medium mb-1">GitHub</h3>
                    <a 
                      href="https://github.com/3miliejoseph" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors break-all"
                    >
                      github.com/3miliejoseph
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-border rounded-sm p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-medium mb-4">Currently Open To</h3>
              <div className="space-y-3 text-sm sm:text-base text-muted-foreground">
                <p className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-foreground rounded-full mr-3"></span>
                  Freelance projects
                </p>
                <p className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-foreground rounded-full mr-3"></span>
                  Full-time opportunities
                </p>
                <p className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-foreground rounded-full mr-3"></span>
                  Design consultations
                </p>
                <p className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-foreground rounded-full mr-3"></span>
                  Speaking engagements
                </p>
              </div>
            </div>

            <div className="border border-border rounded-sm p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-medium mb-3">Response Time</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                I typically respond to all inquiries within 24-48 hours. 
                For urgent matters, please mention it in your email subject line.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col justify-center">
            <div className="border border-border rounded-sm p-8 sm:p-12 text-center">
              <div className="w-16 h-16 bg-accent/20 border border-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-medium mb-4">Ready to collaborate?</h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-8 max-w-md mx-auto">
                Drop me an email and let's discuss how we can work together to bring your vision to life.
              </p>
              <a
                href="mailto:emilieneha@gmail.com"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-sm hover:opacity-90 transition-all font-medium text-sm sm:text-base"
              >
                Send Email
                <Mail className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}