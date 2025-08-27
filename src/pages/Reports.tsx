import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FileText, Download, Printer, Filter, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for reports
const loanSummaryData = [
  { month: 'Jan', approved: 15, disbursed: 12, collected: 145000 },
  { month: 'Feb', approved: 18, disbursed: 16, collected: 167000 },
  { month: 'Mar', approved: 22, disbursed: 20, collected: 189000 },
  { month: 'Apr', approved: 19, disbursed: 17, collected: 156000 },
  { month: 'May', approved: 25, disbursed: 23, collected: 198000 },
  { month: 'Jun', approved: 28, disbursed: 26, collected: 234000 },
  { month: 'Jul', approved: 24, disbursed: 22, collected: 210000 },
  { month: 'Aug', approved: 26, disbursed: 24, collected: 245000 },
];

const loanStatusData = [
  { name: 'Active Loans', value: 156, color: '#22c55e' },
  { name: 'Pending', value: 23, color: '#f59e0b' },
  { name: 'Completed', value: 89, color: '#6b7280' },
  { name: 'Overdue', value: 12, color: '#ef4444' },
];

const patrolBaseData = [
  { base: 'Alpha Base', members: 45, activeLoans: 23, totalAmount: 1250000 },
  { base: 'Bravo Base', members: 38, activeLoans: 19, totalAmount: 985000 },
  { base: 'Charlie Base', members: 42, activeLoans: 21, totalAmount: 1150000 },
  { base: 'Delta Base', members: 51, activeLoans: 28, totalAmount: 1450000 },
  { base: 'Echo Base', members: 35, activeLoans: 17, totalAmount: 890000 },
];

const topBorrowersData = [
  { name: 'Juan Dela Cruz', loanAmount: 150000, payments: 12, status: 'Good' },
  { name: 'Maria Santos', loanAmount: 125000, payments: 8, status: 'Good' },
  { name: 'Pedro Rodriguez', loanAmount: 100000, payments: 6, status: 'Fair' },
  { name: 'Ana Garcia', loanAmount: 95000, payments: 9, status: 'Good' },
  { name: 'Carlos Lopez', loanAmount: 85000, payments: 4, status: 'Poor' },
];

const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedReport, setSelectedReport] = useState('summary');
  const { toast } = useToast();

  const handlePrint = () => {
    toast({
      title: "Print Report",
      description: "Report is being prepared for printing",
    });
  };

  const handleExport = (format: string) => {
    toast({
      title: "Export Report",
      description: `Report exported as ${format.toUpperCase()}`,
    });
  };

  const getPaymentStatusBadge = (status: string) => {
    const variants: { [key: string]: string } = {
      'Good': 'status-active',
      'Fair': 'status-pending',
      'Poor': 'status-rejected',
    };
    return <span className={variants[status] || 'status-pending'}>{status}</span>;
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Reports & Analytics</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" onClick={() => handleExport('pdf')}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={() => handleExport('excel')}>
            <FileText className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Report Filters */}
      <Card className="card-dashboard mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Report Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select value={selectedReport} onValueChange={setSelectedReport}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summary">Loan Summary</SelectItem>
                  <SelectItem value="collections">Collection Report</SelectItem>
                  <SelectItem value="members">Member Report</SelectItem>
                  <SelectItem value="patrol">Patrol Base Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Period</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Year</label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button className="btn-primary w-full">
                <Calendar className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="card-stat">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Total Loans YTD</p>
              <p className="text-3xl font-bold text-primary">187</p>
              <p className="text-xs text-success">+15.3% from last year</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-stat">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Total Disbursed</p>
              <p className="text-3xl font-bold text-primary">₱12.4M</p>
              <p className="text-xs text-success">+22.1% from last year</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-stat">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Collections YTD</p>
              <p className="text-3xl font-bold text-primary">₱9.8M</p>
              <p className="text-xs text-success">+18.7% from last year</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-stat">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Outstanding Balance</p>
              <p className="text-3xl font-bold text-warning">₱2.6M</p>
              <p className="text-xs text-destructive">+5.2% from last month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Loan Performance Chart */}
        <Card className="card-dashboard">
          <CardHeader>
            <CardTitle>Monthly Loan Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={loanSummaryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="approved" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Approved"
                />
                <Line 
                  type="monotone" 
                  dataKey="disbursed" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  name="Disbursed"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Loan Status Distribution */}
        <Card className="card-dashboard">
          <CardHeader>
            <CardTitle>Loan Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={loanStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {loanStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patrol Base Performance */}
        <Card className="card-dashboard">
          <CardHeader>
            <CardTitle>Patrol Base Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="table-container">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patrol Base</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Active Loans</TableHead>
                    <TableHead>Total Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patrolBaseData.map((base, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{base.base}</TableCell>
                      <TableCell>{base.members}</TableCell>
                      <TableCell>{base.activeLoans}</TableCell>
                      <TableCell className="font-mono">₱{(base.totalAmount / 1000).toFixed(0)}k</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Top Borrowers */}
        <Card className="card-dashboard">
          <CardHeader>
            <CardTitle>Top Borrowers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="table-container">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Borrower</TableHead>
                    <TableHead>Loan Amount</TableHead>
                    <TableHead>Payments Made</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topBorrowersData.map((borrower, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{borrower.name}</TableCell>
                      <TableCell className="font-mono">₱{(borrower.loanAmount / 1000).toFixed(0)}k</TableCell>
                      <TableCell>{borrower.payments}</TableCell>
                      <TableCell>{getPaymentStatusBadge(borrower.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;