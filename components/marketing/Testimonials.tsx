import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    content: "Their service completely transformed our online presence. Our website traffic increased by 300% in just 3 months!",
    rating: 5,
    image: "SJ"
  },
  {
    name: "Michael Chen",
    role: "Marketing Director",
    content: "Professional, timely, and exceeded all expectations. The team delivered beyond what we thought was possible.",
    rating: 5,
    image: "MC"
  },
  {
    name: "Emily Rodriguez",
    role: "Small Business Owner",
    content: "As someone with no tech background, they made the process simple and the results were outstanding.",
    rating: 5,
    image: "ER"
  },
  {
    name: "David Wilson",
    role: "Startup Founder",
    content: "The best investment we've made. ROI was achieved within the first month of working with them.",
    rating: 5,
    image: "DW"
  },
  {
    name: "Jessica Park",
    role: "E-commerce Manager",
    content: "Exceptional attention to detail and customer service. They truly care about their clients' success.",
    rating: 5,
    image: "JP"
  },
  {
    name: "Robert Kim",
    role: "Operations Director",
    content: "Reliable, innovative, and professional. Our go-to partner for all digital solutions.",
    rating: 5,
    image: "RK"
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
};

const Avatar = ({ initials }: { initials: string }) => {
  return (
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
      {initials}
    </div>
  );
};

export default function Testimonials() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Quote className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about our services.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar initials={testimonial.image} />
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>
                  <StarRating rating={testimonial.rating} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden overflow-x-auto pb-4">
          <div className="flex space-x-4" style={{ minWidth: 'min-content' }}>
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <Card key={index} className="min-w-[280px] max-w-[280px]">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar initials={testimonial.image} />
                      <div>
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                        <CardDescription>{testimonial.role}</CardDescription>
                      </div>
                    </div>
                    <StarRating rating={testimonial.rating} />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm italic"> "{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 pt-12 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">98%</div>
              <p className="text-gray-600">Client Satisfaction</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">250+</div>
              <p className="text-gray-600">Projects Completed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">24/7</div>
              <p className="text-gray-600">Support Available</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">50+</div>
              <p className="text-gray-600">Happy Clients</p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t">
          <p className="text-center text-gray-500 mb-6">Trusted by companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70">
            <div className="text-2xl font-bold text-gray-800">TECHCORP</div>
            <div className="text-xl font-semibold text-gray-700">INNOVATE</div>
            <div className="text-lg font-bold text-gray-800">GLOBAL</div>
            <div className="text-xl font-semibold text-gray-700">NEXUS</div>
            <div className="text-2xl font-bold text-gray-800">ZENITH</div>
          </div>
        </div>
      </div>
    </section>
  );
}