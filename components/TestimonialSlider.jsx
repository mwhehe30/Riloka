'use client';

import { useState, useEffect, useCallback } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialSlider = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  }, [testimonials.length]);

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  // Auto-play testimonials
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextTestimonial();
      }, 5000); // Change testimonial every 5 seconds
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextTestimonial]);

  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-muted-foreground">Tidak ada testimonial ditemukan</p>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full max-w-6xl mx-auto"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="flex items-center justify-center">
        <div className="w-full max-w-4xl">
          <Quote className="w-12 h-12 text-primary/20 absolute -top-4 -left-4" />
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-border relative z-10">
            <div className="flex justify-center mb-6">
              {/* Star Rating */}
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonials[currentIndex]?.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-center text-foreground italic mb-8 leading-relaxed">
              "{testimonials[currentIndex]?.review}"
            </p>
            
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <img 
                  src={testimonials[currentIndex]?.photo || '/images/human.webp'} 
                  alt={testimonials[currentIndex]?.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-primary/10"
                  onError={(e) => {
                    e.target.src = '/images/human.webp';
                  }}
                />
              </div>
              <h4 className="text-xl font-semibold text-foreground">
                {testimonials[currentIndex]?.name}
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                {new Date(testimonials[currentIndex]?.date).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevTestimonial}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white rounded-full p-3 shadow-lg border border-border hover:bg-primary hover:text-white transition-all z-20"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextTestimonial}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white rounded-full p-3 shadow-lg border border-border hover:bg-primary hover:text-white transition-all z-20"
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToTestimonial(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === index 
                ? 'bg-primary w-6' 
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;