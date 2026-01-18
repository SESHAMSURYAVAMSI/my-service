'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Upload,
  Download,
  Folder,
  File,
  Image,
  Video,
  Music,
  Archive,
  Code,
  Text,
  Pdf,
  MoreVertical,
  Share2,
  Eye,
  Trash2,
  Copy,
  Search,
  Grid,
  List,
  Filter,
  Calendar,
  Users,
  Clock,
  CheckCircle2,
  Cloud
} from 'lucide-react';

const files = [
  { id: '1', name: 'Project Proposal.pdf', type: 'pdf', size: '2.4 MB', uploaded: '2 hours ago', uploader: 'Alex Chen' },
  { id: '2', name: 'Design Mockups.fig', type: 'design', size: '15.2 MB', uploaded: 'Yesterday', uploader: 'Sam Rivera' },
  { id: '3', name: 'Code Review Notes.md', type: 'text', size: '128 KB', uploaded: '2 days ago', uploader: 'Taylor Kim' },
  { id: '4', name: 'Team Photo.jpg', type: 'image', size: '4.8 MB', uploaded: '3 days ago', uploader: 'Jordan Lee' },
  { id: '5', name: 'Marketing Video.mp4', type: 'video', size: '245 MB', uploaded: '1 week ago', uploader: 'Casey Smith' },
  { id: '6', name: 'Database Backup.zip', type: 'archive', size: '1.2 GB', uploaded: '1 week ago', uploader: 'Alex Chen' },
  { id: '7', name: 'API Documentation.json', type: 'code', size: '876 KB', uploaded: '2 weeks ago', uploader: 'Sam Rivera' },
  { id: '8', name: 'Background Music.mp3', type: 'audio', size: '8.5 MB', uploaded: '2 weeks ago', uploader: 'Taylor Kim' },
];

const fileTypeIcons = {
  pdf: Pdf,
  design: File,
  text: Text,
  image: Image,
  video: Video,
  archive: Archive,
  code: Code,
  audio: Music,
  default: File,
};

const fileTypeColors = {
  pdf: 'bg-red-100 text-red-800',
  design: 'bg-purple-100 text-purple-800',
  text: 'bg-blue-100 text-blue-800',
  image: 'bg-green-100 text-green-800',
  video: 'bg-yellow-100 text-yellow-800',
  archive: 'bg-gray-100 text-gray-800',
  code: 'bg-indigo-100 text-indigo-800',
  audio: 'bg-pink-100 text-pink-800',
};

export default function FileSharing() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.uploader.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileSelect = (fileId: string) => {
    setSelectedFiles(prev =>
      prev.includes(fileId)
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const downloadFile = (file: typeof files[0]) => {
    alert(`Downloading ${file.name}...`);
  };

  const shareFile = (file: typeof files[0]) => {
    alert(`Sharing ${file.name}...`);
  };

  const deleteFiles = () => {
    if (selectedFiles.length > 0) {
      alert(`Deleting ${selectedFiles.length} files...`);
      setSelectedFiles([]);
    }
  };

  const getFileIcon = (type: string) => {
    const Icon = fileTypeIcons[type as keyof typeof fileTypeIcons] || fileTypeIcons.default;
    return <Icon className="w-5 h-5" />;
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-cyan-500">
            <Cloud className="w-3 h-3 mr-1" />
            File Sharing
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Secure File Sharing & Storage</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload, share, and collaborate on files with your team securely
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* File List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Team Files</CardTitle>
                    <CardDescription>{filteredFiles.length} files, 1.5 GB used</CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search files..."
                        className="pl-10 w-48"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex border rounded-lg">
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                      >
                        <Grid className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                      >
                        <List className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Upload Area */}
                <div className="mb-8">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                    <Cloud className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Drag & drop files here</h3>
                    <p className="text-gray-600 text-sm mb-4">or click to browse</p>
                    <Button onClick={handleUpload} disabled={isUploading}>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Files
                    </Button>
                    {isUploading && (
                      <div className="mt-4">
                        <Progress value={uploadProgress} className="mb-2" />
                        <p className="text-sm text-gray-600">Uploading... {uploadProgress}%</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Files */}
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredFiles.map((file) => (
                      <motion.div
                        key={file.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`border rounded-lg p-4 cursor-pointer hover:shadow-md transition-all ${
                          selectedFiles.includes(file.id) ? 'border-blue-500 bg-blue-50' : ''
                        }`}
                        onClick={() => handleFileSelect(file.id)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className={`p-2 rounded-lg ${
                            fileTypeColors[file.type as keyof typeof fileTypeColors] || 'bg-gray-100'
                          }`}>
                            {getFileIcon(file.type)}
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                        <h4 className="font-medium text-sm truncate mb-1">{file.name}</h4>
                        <div className="text-xs text-gray-500 space-y-1">
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>{file.uploader}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{file.uploaded}</span>
                          </div>
                          <div>{file.size}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="border rounded-lg">
                    <div className="grid grid-cols-12 gap-4 p-4 border-b font-medium">
                      <div className="col-span-6">Name</div>
                      <div className="col-span-2">Size</div>
                      <div className="col-span-2">Uploaded</div>
                      <div className="col-span-2">Actions</div>
                    </div>
                    {filteredFiles.map((file) => (
                      <div
                        key={file.id}
                        className={`grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50 ${
                          selectedFiles.includes(file.id) ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="col-span-6 flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            fileTypeColors[file.type as keyof typeof fileTypeColors] || 'bg-gray-100'
                          }`}>
                            {getFileIcon(file.type)}
                          </div>
                          <div>
                            <div className="font-medium">{file.name}</div>
                            <div className="text-sm text-gray-500">By {file.uploader}</div>
                          </div>
                        </div>
                        <div className="col-span-2 flex items-center">{file.size}</div>
                        <div className="col-span-2 flex items-center">{file.uploaded}</div>
                        <div className="col-span-2 flex items-center gap-2">
                          <Button variant="ghost" size="icon" onClick={() => downloadFile(file)}>
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => shareFile(file)}>
                            <Share2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Actions & Info */}
          <div className="space-y-6">
            {/* Selected Files Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Selected Files</CardTitle>
                <CardDescription>{selectedFiles.length} files selected</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full" disabled={selectedFiles.length === 0}>
                    <Download className="w-4 h-4 mr-2" />
                    Download Selected
                  </Button>
                  <Button variant="outline" className="w-full" disabled={selectedFiles.length === 0}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Selected
                  </Button>
                  <Button variant="outline" className="w-full" disabled={selectedFiles.length === 0}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy to Folder
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full"
                    disabled={selectedFiles.length === 0}
                    onClick={deleteFiles}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Selected
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Storage Usage */}
            <Card>
              <CardHeader>
                <CardTitle>Storage Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>1.5 GB of 10 GB used</span>
                      <span className="font-medium">15%</span>
                    </div>
                    <Progress value={15} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center p-3 bg-blue-50 rounded">
                      <div className="text-lg font-bold text-blue-600">42</div>
                      <div className="text-gray-600">Files</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded">
                      <div className="text-lg font-bold text-green-600">8</div>
                      <div className="text-gray-600">Folders</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { action: 'Alex uploaded Design Mockups.fig', time: '2 hours ago' },
                    { action: 'Sam shared API Documentation.json', time: '4 hours ago' },
                    { action: 'Taylor created Project folder', time: '1 day ago' },
                    { action: 'Jordan deleted old_backup.zip', time: '2 days ago' },
                  ].map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                      <div>
                        <p className="text-sm">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}