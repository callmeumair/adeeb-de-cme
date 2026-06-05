export default function AboutPage() {
  return (
    <div className="py-24 px-6 max-w-4xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <p className="eyebrow mb-4">THE HOUSE OF ADEEB</p>
        <h1 className="font-display text-4xl md:text-6xl text-ivory font-light leading-tight">Our Story</h1>
      </div>

      <div className="prose prose-invert prose-gold mx-auto space-y-8 text-smoke leading-relaxed text-lg">
        <p className="first-letter:text-7xl first-letter:font-display first-letter:text-gold first-letter:mr-3 first-letter:float-left">
          From the vibrant heart of Solapur, Maharashtra, the CMÉ brand has always been synonymous with unparalleled hospitality and culinary excellence. Founded on the principle of serving unforgettable experiences, we spent years perfecting the art of delighting the senses. Now, we translate that same mastery into the realm of luxury perfumery with ADEEB DE CME.
        </p>

        <p>
          Just as a masterful dish requires the precise balance of rare spices and fresh ingredients, a truly timeless fragrance demands absolute perfection in its composition. ADEEB DE CME was born from our deep-rooted desire to capture the soul of Arabian elegance and blend it with our heritage of Indian hospitality.
        </p>

        <div className="my-12 py-8 border-y border-gold/20 text-center">
          <p className="font-display text-3xl text-gold italic">
            "A fragrance is more than a scent; it is the silent ambassador of your presence."
          </p>
        </div>

        <p>
          We source the finest Ouds, authentic Musks, and precious florals from across the globe, bringing them back to our ateliers to be blended by master artisans. ADEEB DE CME is not just a perfume brand; it is an extension of the CMÉ vision—a commitment to premium quality, profound emotional connection, and absolute luxury.
        </p>
      </div>
    </div>
  );
}
