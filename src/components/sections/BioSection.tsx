export function BioSection() {
  return (
    <section
      id="bio"
      className="min-h-screen flex flex-col justify-center py-10 px-6 md:px-12 fade-in"
    >
      {/* Decorative flourish */}
      <div className="text-center mb-8">
        <span className="font-flourish text-4xl md:text-5xl text-primary/30">
          ❧
        </span>
      </div>

      {/* Hero name */}
      <div className="text-center mb-12 flex flex-col items-center">
        <img
          src="/images/profile.JPG"
          alt="Profile photo"
          className="w-64 max-w-full rounded-xl object-contain mb-6"
        />

        <h1 className="font-flourish text-6xl md:text-8xl lg:text-9xl text-gold-gradient mb-4">
          Alexa Thoennes
        </h1>
        <p className="font-serif text-lg md:text-2xl text-muted-foreground italic">
          philosophical technologist
        </p>
      </div>

      {/* Bio content */}
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-lg md:text-xl leading-relaxed text-foreground/90 mb-6">
          I help bridge the gap between concept and creation.
        </p>
        
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
          Leveraging the latest empirical approaches to help humans do more while working less:
          whether that’s through product management, artisinal pursuits, or systems building. 
        </p>
      </div>

      {/* Bottom flourish */}
      <div className="text-center mt-16">
        <div className="inline-flex items-center gap-4">
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-primary/30" />
          <span className="font-flourish text-2xl text-primary/40">✦</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-primary/30" />
        </div>
      </div>
    </section>
  );
}
