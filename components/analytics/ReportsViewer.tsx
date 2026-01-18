'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  FileText,
  Download,
  Eye,
  Share2,
  Printer,
  Filter,
  Calendar,
  Search,
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  DollarSign,
  Globe,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';

const reports = [
  {
    id: '1',
    title: 'Monthly Performance Report',
    type: 'Performance',
    date: 'Jan 2024',
    status: 'completed',
    pages: 24,
    views: 145,
    lastUpdated: '2 hours ago'
  },
  {
    id: '2',
    title: 'Q4 Financial Analysis',
    type: 'Financial',
    date: 'Q4 2023',
    status: 'completed',
    pages: 42,
    views: 89,
    lastUpdated: '1 day ago'
  },
  {
    id: '3',
    title: 'User Engagement Metrics',
    type: 'Engagement',
    date: 'Dec 2023',
    status: 'in-progress',
    pages: 18,
    views: 67,
    lastUpdated: 'Just now'
  },
  {
    id: '4',
    title: 'Marketing Campaign ROI',
    type: 'Marketing',
    date: 'Nov 2023',
    status: 'completed',
    pages: 31,
    views: 112,
    lastUpdated: '1 week ago'
  },
  {
    id: '5',
    title: 'Technical Infrastructure',
    type: 'Technical',
    date: 'Oct 2023',
    status: 'archived',
    pages: 56,
    views: 45,
    lastUpdated: '2 weeks ago'
  },
  {
    id: '6',
    title: 'Competitor Analysis',
    type: 'Research',
    date: 'Sep 2023',
    status: 'completed',
    pages: 38,
    views: 78,
    lastUpdated: '3 weeks ago'
  },
];

const reportTypes = [
  'All Reports',
  'Performance',
  'Financial',
  'Marketing',
  'Technical',
  'Engagement',
  'Research'
];

const statusColors: Record<string, string> = {
  'completed': 'bg-green-100 text-green-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  'archived': 'bg-gray-100 text-gray-800',
  'pending': 'bg-yellow-100 text-yellow-800',
};

export default function ReportsViewer() {
  const [selectedReport, setSelectedReport] = useState(reports[0]);
  const [selectedType, setSelectedType] = useState('All Reports');
  const [dateRange, setDateRange] = useState('last-30-days');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReports = reports.filter(report => {
    const matchesType = selectedType === 'All Reports' || report.type === selectedType;
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const viewReport = (report: typeof reports[0]) => {
    setSelectedReport(report);
    // In production, this would fetch report data
    alert(`Viewing report: ${report.title}`);
  };

  const downloadReport = (report: typeof reports[0]) => {
    alert(`Downloading report: ${report.title}`);
  };

  const shareReport = (report: typeof reports[0]) => {
    alert(`Sharing report: ${report.title}`);
  };

  const generateNewReport = () => {
    alert('Generating new report...');
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold">Reports & Analytics</h2>
            <p className="text-gray-600">View and manage all your analytics reports</p>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={generateNewReport}>
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Share All
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Reports List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>All Reports</CardTitle>
                    <CardDescription>{filteredReports.length} reports found</CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search reports..."
                        className="pl-10 w-48"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Select value={dateRange} onValueChange={setDateRange}>
                      <SelectTrigger className="w-40">
                        <Calendar className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Date Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="last-7-days">Last 7 days</SelectItem>
                        <SelectItem value="last-30-days">Last 30 days</SelectItem>
                        <SelectItem value="last-90-days">Last 90 days</SelectItem>
                        <SelectItem value="this-year">This year</SelectItem>
                        <SelectItem value="custom">Custom range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid grid-cols-4 mb-6">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="recent">Recent</TabsTrigger>
                    <TabsTrigger value="shared">Shared</TabsTrigger>
                    <TabsTrigger value="archived">Archived</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-4">
                    {filteredReports.map((report) => (
                      <div
                        key={report.id}
                        className={`p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer ${
                          selectedReport.id === report.id ? 'border-blue-500 bg-blue-50' : ''
                        }`}
                        onClick={() => viewReport(report)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <FileText className="w-5 h-5 text-blue-600" />
                              <h3 className="font-semibold">{report.title}</h3>
                              <Badge className={statusColors[report.status]}>
                                {report.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {report.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <FileText className="w-4 h-4" />
                                {report.pages} pages
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {report.views} views
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                downloadReport(report);
                              }}
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                shareReport(report);
                              }}
                            >
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Last updated: {report.lastUpdated}</span>
                          <Badge variant="outline">{report.type}</Badge>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Report Preview & Actions */}
          <div className="space-y-6">
            {/* Selected Report Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Report Preview</CardTitle>
                <CardDescription>Quick view of selected report</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <FileText className="w-8 h-8 text-blue-600" />
                      <div>
                        <h3 className="font-bold text-lg">{selectedReport.title}</h3>
                        <Badge className={statusColors[selectedReport.status]}>
                          {selectedReport.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-white rounded">
                        <div className="text-2xl font-bold text-blue-600">{selectedReport.pages}</div>
                        <div className="text-sm text-gray-600">Pages</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded">
                        <div className="text-2xl font-bold text-green-600">{selectedReport.views}</div>
                        <div className="text-sm text-gray-600">Views</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full" onClick={() => downloadReport(selectedReport)}>
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Printer className="w-4 h-4 mr-2" />
                      Print Report
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share with Team
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Report Types Filter */}
            <Card>
              <CardHeader>
                <CardTitle>Filter by Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {reportTypes.map((type) => (
                    <Button
                      key={type}
                      variant={selectedType === type ? 'default' : 'outline'}
                      className="w-full justify-start"
                      onClick={() => setSelectedType(type)}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Report Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span>Completed Reports</span>
                    </div>
                    <span className="font-bold">42</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-blue-500" />
                      <span>In Progress</span>
                    </div>
                    <span className="font-bold">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-gray-500" />
                      <span>Archived</span>
                    </div>
                    <span className="font-bold">24</span>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Total Reports</span>
                      <span className="text-2xl font-bold text-blue-600">74</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}