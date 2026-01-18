'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  FileText,
  Download,
  Eye,
  DollarSign,
  Calendar,
  Filter,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Receipt,
  CreditCard,
  Banknote,
  TrendingUp,
  PieChart
} from 'lucide-react';

const invoices = [
  {
    id: 'INV-001',
    date: 'Jan 15, 2024',
    amount: 299.00,
    status: 'paid',
    method: 'Credit Card',
    description: 'Professional Plan - Monthly',
    dueDate: 'Jan 15, 2024',
    paidDate: 'Jan 14, 2024'
  },
  {
    id: 'INV-002',
    date: 'Feb 15, 2024',
    amount: 299.00,
    status: 'paid',
    method: 'Credit Card',
    description: 'Professional Plan - Monthly',
    dueDate: 'Feb 15, 2024',
    paidDate: 'Feb 14, 2024'
  },
  {
    id: 'INV-003',
    date: 'Mar 15, 2024',
    amount: 299.00,
    status: 'paid',
    method: 'Credit Card',
    description: 'Professional Plan - Monthly',
    dueDate: 'Mar 15, 2024',
    paidDate: 'Mar 14, 2024'
  },
  {
    id: 'INV-004',
    date: 'Apr 15, 2024',
    amount: 299.00,
    status: 'pending',
    method: 'Credit Card',
    description: 'Professional Plan - Monthly',
    dueDate: 'Apr 15, 2024',
    paidDate: null
  },
  {
    id: 'INV-005',
    date: 'May 15, 2024',
    amount: 299.00,
    status: 'upcoming',
    method: 'Credit Card',
    description: 'Professional Plan - Monthly',
    dueDate: 'May 15, 2024',
    paidDate: null
  },
  {
    id: 'INV-006',
    date: 'Dec 15, 2023',
    amount: 299.00,
    status: 'paid',
    method: 'PayPal',
    description: 'Professional Plan - Monthly',
    dueDate: 'Dec 15, 2023',
    paidDate: 'Dec 14, 2023'
  },
];

const statusColors: Record<string, string> = {
  'paid': 'bg-green-100 text-green-800',
  'pending': 'bg-yellow-100 text-yellow-800',
  'upcoming': 'bg-blue-100 text-blue-800',
  'overdue': 'bg-red-100 text-red-800',
};

const statusIcons: Record<string, React.ReactNode> = {
  'paid': <CheckCircle2 className="w-4 h-4" />,
  'pending': <Clock className="w-4 h-4" />,
  'upcoming': <Calendar className="w-4 h-4" />,
  'overdue': <AlertCircle className="w-4 h-4" />,
};

export default function InvoiceList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState(invoices[0]);

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         invoice.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0);
  const totalPending = invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0);
  const totalUpcoming = invoices.filter(i => i.status === 'upcoming').reduce((sum, i) => sum + i.amount, 0);

  const viewInvoice = (invoice: typeof invoices[0]) => {
    setSelectedInvoice(invoice);
    // In production, this would open invoice details
    alert(`Viewing invoice: ${invoice.id}`);
  };

  const downloadInvoice = (invoice: typeof invoices[0]) => {
    alert(`Downloading invoice: ${invoice.id}`);
  };

  const payInvoice = (invoice: typeof invoices[0]) => {
    alert(`Processing payment for invoice: ${invoice.id}`);
  };

  const exportAllInvoices = () => {
    alert('Exporting all invoices as CSV...');
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-cyan-500">
            <Receipt className="w-3 h-3 mr-1" />
            Billing History
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Invoice Management</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            View and manage all your invoices and billing history in one place
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Invoice List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Invoice History</CardTitle>
                    <CardDescription>{filteredInvoices.length} invoices found</CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search invoices..."
                        className="pl-10 w-48"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" onClick={exportAllInvoices}>
                      <Download className="w-4 h-4 mr-2" />
                      Export All
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Status Filters */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <Button
                    variant={filterStatus === 'all' ? 'default' : 'outline'}
                    onClick={() => setFilterStatus('all')}
                  >
                    All Invoices
                  </Button>
                  <Button
                    variant={filterStatus === 'paid' ? 'default' : 'outline'}
                    onClick={() => setFilterStatus('paid')}
                  >
                    Paid
                  </Button>
                  <Button
                    variant={filterStatus === 'pending' ? 'default' : 'outline'}
                    onClick={() => setFilterStatus('pending')}
                  >
                    Pending
                  </Button>
                  <Button
                    variant={filterStatus === 'upcoming' ? 'default' : 'outline'}
                    onClick={() => setFilterStatus('upcoming')}
                  >
                    Upcoming
                  </Button>
                </div>

                {/* Invoices Table */}
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInvoices.map((invoice) => (
                        <TableRow key={invoice.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-blue-600" />
                              {invoice.id}
                            </div>
                            <div className="text-sm text-gray-500">{invoice.description}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">{invoice.date}</div>
                            <div className="text-xs text-gray-500">Due: {invoice.dueDate}</div>
                          </TableCell>
                          <TableCell className="font-bold">
                            ${invoice.amount.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Badge className={`${statusColors[invoice.status]} flex items-center gap-1 w-fit`}>
                              {statusIcons[invoice.status]}
                              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {invoice.method === 'Credit Card' ? (
                                <CreditCard className="w-4 h-4 text-gray-500" />
                              ) : (
                                <Banknote className="w-4 h-4 text-gray-500" />
                              )}
                              <span className="text-sm">{invoice.method}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => viewInvoice(invoice)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => downloadInvoice(invoice)}
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                              {invoice.status === 'pending' && (
                                <Button
                                  size="sm"
                                  onClick={() => payInvoice(invoice)}
                                >
                                  Pay Now
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Invoice Summary & Details */}
          <div className="space-y-6">
            {/* Selected Invoice Details */}
            <Card>
              <CardHeader>
                <CardTitle>Invoice Details</CardTitle>
                <CardDescription>INV-{selectedInvoice.id.split('-')[1]}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-2xl font-bold">${selectedInvoice.amount.toFixed(2)}</div>
                        <Badge className={statusColors[selectedInvoice.status]}>
                          {selectedInvoice.status}
                        </Badge>
                      </div>
                      <FileText className="w-12 h-12 text-blue-600" />
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Invoice ID:</span>
                        <span className="font-medium">{selectedInvoice.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Issue Date:</span>
                        <span className="font-medium">{selectedInvoice.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Due Date:</span>
                        <span className="font-medium">{selectedInvoice.dueDate}</span>
                      </div>
                      {selectedInvoice.paidDate && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Paid Date:</span>
                          <span className="font-medium">{selectedInvoice.paidDate}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full" onClick={() => downloadInvoice(selectedInvoice)}>
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview Invoice
                    </Button>
                    {selectedInvoice.status === 'pending' && (
                      <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => payInvoice(selectedInvoice)}>
                        <DollarSign className="w-4 h-4 mr-2" />
                        Pay Now
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Billing Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Billing Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span>Total Paid</span>
                    </div>
                    <span className="font-bold text-green-600">${totalPaid.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-yellow-500" />
                      <span>Pending Payment</span>
                    </div>
                    <span className="font-bold text-yellow-600">${totalPending.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span>Upcoming</span>
                    </div>
                    <span className="font-bold text-blue-600">${totalUpcoming.toFixed(2)}</span>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Total Billed</span>
                      <span className="text-2xl font-bold">${(totalPaid + totalPending + totalUpcoming).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
                      <div>
                        <p className="font-medium">•••• 4242</p>
                        <p className="text-sm text-gray-500">Expires 12/25</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Default</Badge>
                  </div>
                  <Button variant="outline" className="w-full">
                    + Add Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}