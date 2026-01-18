import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Professional Services That <span className="text-yellow-300">Transform</span> Your Business
        </h1>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          We deliver exceptional results with cutting-edge solutions tailored to your needs.
          Expert service, guaranteed satisfaction.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8">
            Get Started Free
          </Button>
          <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-8">
            View Our Work
          </Button>
        </div>
      </div>
    </section>
  );
}
