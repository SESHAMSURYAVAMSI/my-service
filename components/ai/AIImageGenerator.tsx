'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Image,
  Download,
  RefreshCw,
  Sparkles,
  Palette,
  ZoomIn,
  Layers,
  Wand2,
  Copy,
  Share2,
  Heart,
  Settings,
  Grid3x3,
  Camera,
  PaintBucket
} from 'lucide-react';

const artStyles = [
  { id: 'realistic', name: 'Photorealistic', description: 'Highly detailed realistic images' },
  { id: 'anime', name: 'Anime', description: 'Japanese animation style' },
  { id: 'digital-art', name: 'Digital Art', description: 'Modern digital painting' },
  { id: '3d-render', name: '3D Render', description: '3D modeled scenes' },
  { id: 'watercolor', name: 'Watercolor', description: 'Traditional watercolor painting' },
  { id: 'vector', name: 'Vector Art', description: 'Clean vector graphics' },
  { id: 'oil-painting', name: 'Oil Painting', description: 'Classic oil painting style' },
  { id: 'pixel-art', name: 'Pixel Art', description: 'Retro pixelated graphics' },
];

const aspectRatios = [
  { value: '1:1', label: 'Square (1:1)' },
  { value: '4:3', label: 'Standard (4:3)' },
  { value: '16:9', label: 'Widescreen (16:9)' },
  { value: '9:16', label: 'Portrait (9:16)' },
  { value: '2:3', label: 'Vertical (2:3)' },
  { value: '3:2', label: 'Horizontal (3:2)' },
];

const samplePrompts = [
  'A futuristic city with flying cars at sunset',
  'A magical forest with glowing mushrooms and fairies',
  'An astronaut riding a horse on Mars, digital art',
  'A cyberpunk samurai in neon-lit Tokyo streets',
  'A beautiful sunset over mountain lake, oil painting',
  'A cute robot making coffee in a cozy kitchen',
];

export default function AIImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('realistic');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [quality, setQuality] = useState([8]);
  const [creativity, setCreativity] = useState([7]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [enableUpscale, setEnableUpscale] = useState(true);
  const [enableEnhance, setEnableEnhance] = useState(true);
  const [batchSize, setBatchSize] = useState(4);

  const generateImages = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const newImages = Array.from({ length: batchSize }, (_, i) => 
        `https://picsum.photos/seed/${Date.now() + i}/512/512`
      );
      setGeneratedImages(newImages);
      setSelectedImage(newImages[0]);
      setIsGenerating(false);
    }, 3000);
  };

  const applySamplePrompt = (sample: string) => {
    setPrompt(sample);
  };

  const downloadImage = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `ai-image-${Date.now()}.jpg`;
    link.click();
  };

  const upscaleImage = () => {
    if (selectedImage) {
      alert('Upscaling image to 4K resolution...');
    }
  };

  const enhanceImage = () => {
    if (selectedImage) {
      alert('Enhancing image quality...');
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500">
            <Sparkles className="w-3 h-3 mr-1" />
            AI Image Studio
          </Badge>
          <h2 className="text-4xl font-bold mb-4">AI Image Generator</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create stunning images from text descriptions using advanced AI models
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Generation Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Prompt Input */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Image Prompt</Label>
                  <Textarea
                    placeholder="Describe the image you want to generate..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                {/* Negative Prompt */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Negative Prompt</Label>
                  <Input
                    placeholder="What to avoid in the image..."
                    value={negativePrompt}
                    onChange={(e) => setNegativePrompt(e.target.value)}
                  />
                </div>

                {/* Art Style */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Art Style</Label>
                  <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      {artStyles.map((style) => (
                        <SelectItem key={style.id} value={style.id}>
                          <div>
                            <span>{style.name}</span>
                            <p className="text-xs text-gray-500">{style.description}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Aspect Ratio */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Aspect Ratio</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {aspectRatios.map((ratio) => (
                      <Button
                        key={ratio.value}
                        variant={aspectRatio === ratio.value ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setAspectRatio(ratio.value)}
                      >
                        {ratio.value}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Quality Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-sm font-medium">Quality</Label>
                    <span className="text-sm font-medium">{quality[0]}/10</span>
                  </div>
                  <Slider value={quality} onValueChange={setQuality} min={1} max={10} step={1} />
                </div>

                {/* Creativity Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-sm font-medium">Creativity</Label>
                    <span className="text-sm font-medium">{creativity[0]}/10</span>
                  </div>
                  <Slider value={creativity} onValueChange={setCreativity} min={1} max={10} step={1} />
                </div>

                {/* Batch Size */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-sm font-medium">Batch Size</Label>
                    <span className="text-sm font-medium">{batchSize} images</span>
                  </div>
                  <Slider value={[batchSize]} onValueChange={(v) => setBatchSize(v[0])} min={1} max={8} step={1} />
                </div>

                {/* Advanced Options */}
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto Upscale</p>
                      <p className="text-sm text-gray-600">Enhance to 4K resolution</p>
                    </div>
                    <Switch checked={enableUpscale} onCheckedChange={setEnableUpscale} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto Enhance</p>
                      <p className="text-sm text-gray-600">Improve colors and details</p>
                    </div>
                    <Switch checked={enableEnhance} onCheckedChange={setEnableEnhance} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sample Prompts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sample Prompts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {samplePrompts.map((sample, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-2"
                      onClick={() => applySamplePrompt(sample)}
                    >
                      <span className="text-sm truncate">{sample}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Generation Controls */}
            <Card>
              <CardHeader>
                <CardTitle>Generate Images</CardTitle>
                <CardDescription>
                  Click generate to create images based on your settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={generateImages}
                    disabled={isGenerating || !prompt.trim()}
                    className="flex-1 min-w-[140px]"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4 mr-2" />
                        Generate Images
                      </>
                    )}
                  </Button>
                  
                  <Button variant="outline" onClick={upscaleImage} disabled={!selectedImage}>
                    <ZoomIn className="w-4 h-4 mr-2" />
                    Upscale
                  </Button>
                  
                  <Button variant="outline" onClick={enhanceImage} disabled={!selectedImage}>
                    <PaintBucket className="w-4 h-4 mr-2" />
                    Enhance
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Generated Images */}
            <AnimatePresence>
              {generatedImages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Generated Images</CardTitle>
                      <CardDescription>
                        {batchSize} variations of your prompt
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Selected Image Preview */}
                      {selectedImage && (
                        <div className="mb-6">
                          <div className="relative rounded-lg overflow-hidden border-2 border-blue-500">
                            <img
                              src={selectedImage}
                              alt="Selected AI generated image"
                              className="w-full h-auto"
                            />
                            <div className="absolute bottom-4 right-4 flex gap-2">
                              <Button size="sm" onClick={() => downloadImage(selectedImage)}>
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </Button>
                              <Button size="sm" variant="outline">
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Image Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {generatedImages.map((image, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                              selectedImage === image 
                                ? 'border-blue-500 ring-2 ring-blue-500' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setSelectedImage(image)}
                          >
                            <img
                              src={image}
                              alt={`AI generated image ${idx + 1}`}
                              className="w-full h-32 object-cover"
                            />
                            <div className="absolute top-2 right-2">
                              <Badge className="bg-black/50 text-white backdrop-blur-sm">
                                {idx + 1}
                              </Badge>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                              <div className="flex justify-between items-center">
                                <Button size="sm" variant="ghost" className="text-white hover:text-white hover:bg-white/20">
                                  <Heart className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="ghost" className="text-white hover:text-white hover:bg-white/20">
                                  <Download className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Generation Progress */}
            {isGenerating && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    <div>
                      <h3 className="font-semibold mb-2">Generating Images</h3>
                      <p className="text-gray-600 text-sm">
                        AI is creating {batchSize} images based on your prompt...
                      </p>
                    </div>
                    <Progress value={75} className="w-full" />
                    <div className="text-sm text-gray-500">
                      Estimated time: 15 seconds remaining
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}