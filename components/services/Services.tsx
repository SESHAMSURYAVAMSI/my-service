import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { CheckCircle } from 'lucide-react';

const services = [
  {
    title: "Web Development",
    description: "Modern, responsive websites with cutting-edge technology.",
    features: ["Next.js/React", "Mobile Optimized", "SEO Friendly", "Fast Loading"]
  },
  {
    title: "Digital Marketing",
    description: "Grow your online presence with data-driven strategies.",
    features: ["SEO Optimization", "Social Media", "Content Strategy", "Analytics"]
  },
  {
    title: "UI/UX Design",
    description: "Beautiful, intuitive designs that users love.",
    features: ["User Research", "Wireframing", "Prototyping", "Testing"]
  }
];

export default function Services() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Premium Services</h2>
          <p className="text-gray-600 text-lg">Expert solutions for your business growth</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-lg">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="text-green-500 w-5 h-5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t">
                  <p className="text-3xl font-bold">$99<span className="text-sm font-normal text-gray-500">/month</span></p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}