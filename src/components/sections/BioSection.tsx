export function BioSection() {
  return (
    <section id="bio" className="min-h-screen flex flex-col justify-center py-20 px-6 md:px-12 fade-in">
      {/* Decorative flourish */}
      <div className="text-center mb-8">
        <span className="font-flourish text-4xl md:text-5xl text-primary/30">❧</span>
      </div>

      {/* Hero name */}
      <div className="text-center mb-12 flex flex-col items-center">
        <img
          src="/public/images/IMG_6147.JPG"
          alt="Profile photo"
          className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mb-6"
        />
      <div className="text-center mb-12">
        <h1 className="font-flourish text-6xl md:text-8xl lg:text-9xl text-gold-gradient mb-4">
          Alexa Thoennes
        </h1>
        <p className="font-serif text-xl md:text-2xl text-muted-foreground italic">
          Product · Artist · Empiricist
        </p>
      </div>

      {/* Bio content */}
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-lg md:text-xl leading-relaxed text-foreground/90 mb-6">
          Welcome to my corner of the digital world. I craft experiences at the 
          intersection of design and technology, driven by curiosity and a love 
          for meaningful creation.
        </p>
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
          When I'm not building products, you'll find me exploring ceramics, 
          sketching ideas, or capturing moments through my camera lens. 
          I believe in the power of community and mentorship to shape 
          the future of our craft.
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
