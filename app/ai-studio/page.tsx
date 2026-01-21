import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import AIContentStudio from '@/components/ai/AIContentStudio';
import AIImageGenerator from '@/components/ai/AIImageGenerator';
import AIAssistant from '@/components/ai/AIAssistant';

export default function AIStudioPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <div className="p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">AI Studio</h1>
              <p className="text-gray-600">Powerful AI tools for content creation and automation</p>
            </div>
            
            <AIAssistant />
            <div className="my-12">
              <AIContentStudio />
            </div>
            <AIImageGenerator />
          </div>
        </main>
      </div>
    </div>
  );
}