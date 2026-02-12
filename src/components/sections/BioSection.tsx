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

        <h1 className="font-flourish text-6xl md:text-8xl lg:text-9xl text-gold-gradient mb-1">
          Alexa Thoennes
        </h1>
        <p className="font-serif text-lg md:text-lg text-muted-foreground italic">
          renaissance technologist
        </p>
      </div>

      {/* Bio content */}
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-lg md:text-xl leading-relaxed text-foreground/90 mb-6">
          I'm here when you need to turn complexity into action.
        </p>
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
          People seek me out to translate ideas clearly for any audience, prototype solutions rapidly, and surface perspectives that shift how problems get solved. Across all domains.
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
