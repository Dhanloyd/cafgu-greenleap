import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer, Download, User, CreditCard, Calendar, Phone, Mail, MapPin, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample borrower data - would come from MySQL database
const borrowerData = {
  member_id: '001',
  first_name: 'Eden',
  last_name: 'Caduhada',
  full_name: 'CAA EDEN CADUHADA',
  rank: 'CAA',
  patrol_base: 'DCAO',
  contact_number: '+63 912 345 6789',
  email: 'eden.caduhada@example.com',
  address: 'Brgy. Libertad, Tungawan, Zamboanga Sibugay',
  date_joined: '2020-03-15',
  status: 'active',
  share_capital: 3800.00,
  total_loans: 2,
  total_borrowed: 25000.00,
  total_paid: 18000.00,
  outstanding_balance: 7000.00,
  current_loan_balance: 2000.00,
  photo_url: '/placeholder.svg'
};

// Sample loan history - MySQL query: SELECT * FROM loans WHERE member_id = ?
const loanHistory = [
  {
    loan_id: 'L001',
    loan_amount: 20000.00,
    interest_rate: 3.6,
    loan_term_months: 12,
    monthly_payment: 1800.00,
    principal_balance: 2000.00,
    interest_balance: 0.00,
    total_balance: 2000.00,
    loan_date: '2024-01-15',
    due_date: '2025-01-15',
    status: 'active',
    purpose: 'Personal loan for family needs',
    yearly_interest: 3600.00
  },
  {
    loan_id: 'L002',
    loan_amount: 5000.00,
    interest_rate: 3.6,
    loan_term_months: 6,
    monthly_payment: 900.00,
    principal_balance: 0.00,
    interest_balance: 0.00,
    total_balance: 0.00,
    loan_date: '2023-06-01',
    due_date: '2023-12-01',
    status: 'completed',
    purpose: 'Emergency loan',
    yearly_interest: 900.00
  }
];

// Sample payment history - MySQL query: SELECT * FROM payments WHERE member_id = ? ORDER BY payment_date DESC
const paymentHistory = [
  {
    payment_id: 'P001',
    loan_id: 'L001',
    payment_amount: 1800.00,
    principal_amount: 1500.00,
    interest_amount: 300.00,
    payment_date: '2024-12-01',
    payment_method: 'cash',
    receipt_number: 'REC-001',
    processed_by: 'Irish C. Dinalo'
  },
  {
    payment_id: 'P002',
    loan_id: 'L001',
    payment_amount: 1800.00,
    principal_amount: 1500.00,
    interest_amount: 300.00,
    payment_date: '2024-11-01',
    payment_method: 'cash',
    receipt_number: 'REC-002',
    processed_by: 'Irish C. Dinalo'
  }
];

const BorrowerRecord: React.FC = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

  const handlePrint = () => {
    window.print();
    toast({
      title: "Print Record",
      description: "Borrower record is being prepared for printing",
    });
  };

  const handleExport = () => {
    toast({
      title: "Export Record",
      description: "Borrower record exported successfully",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="status-active">Active</Badge>;
      case 'completed':
        return <Badge className="status-inactive">Completed</Badge>;
      case 'overdue':
        return <Badge className="status-rejected">Overdue</Badge>;
      default:
        return <Badge className="status-pending">{status}</Badge>;
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/borrowers')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Borrowers
          </Button>
          <div>
            <h1 className="page-title">Borrower Record</h1>
            <p className="page-subtitle">Complete borrower information and loan history</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Borrower Info Card */}
      <Card className="card-dashboard mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Member Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Photo and Basic Info */}
            <div className="text-center">
              <div className="w-32 h-32 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
                <User className="h-16 w-16 text-muted-foreground" />
              </div>
              <h3 className="font-bold text-lg">{borrowerData.full_name}</h3>
              <p className="text-muted-foreground">{borrowerData.rank}</p>
              {getStatusBadge(borrowerData.status)}
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Contact Information
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3 text-muted-foreground" />
                  <span>{borrowerData.contact_number}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 text-muted-foreground" />
                  <span>{borrowerData.email}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-3 w-3 text-muted-foreground mt-0.5" />
                  <span>{borrowerData.address}</span>
                </div>
              </div>
            </div>

            {/* Membership Info */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Membership Details
              </h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Patrol Base:</span>
                  <span className="ml-2 font-medium">{borrowerData.patrol_base}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Date Joined:</span>
                  <span className="ml-2">{new Date(borrowerData.date_joined).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Member ID:</span>
                  <span className="ml-2 font-mono">{borrowerData.member_id}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Share Capital:</span>
                  <span className="ml-2 font-medium">₱{borrowerData.share_capital.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Financial Summary
              </h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Total Borrowed:</span>
                  <span className="ml-2 font-medium">₱{borrowerData.total_borrowed.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Paid:</span>
                  <span className="ml-2 text-success">₱{borrowerData.total_paid.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Outstanding:</span>
                  <span className="ml-2 text-warning font-medium">₱{borrowerData.outstanding_balance.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Current Balance:</span>
                  <span className="ml-2 font-bold">₱{borrowerData.current_loan_balance.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for detailed information */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Loan Overview</TabsTrigger>
          <TabsTrigger value="history">Loan History</TabsTrigger>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="card-stat">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Loans</p>
                    <p className="text-2xl font-bold text-foreground">{loanHistory.filter(l => l.status === 'active').length}</p>
                    <p className="text-xs text-muted-foreground">Current active loans</p>
                  </div>
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-stat">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Yearly Interest</p>
                    <p className="text-2xl font-bold text-foreground">₱{loanHistory.reduce((sum, loan) => sum + loan.yearly_interest, 0).toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Total for this year</p>
                  </div>
                  <div className="h-12 w-12 bg-success/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-stat">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Payment Status</p>
                    <p className="text-2xl font-bold text-success">Current</p>
                    <p className="text-xs text-muted-foreground">No overdue payments</p>
                  </div>
                  <div className="h-12 w-12 bg-success/10 rounded-lg flex items-center justify-center">
                    <AlertCircle className="h-6 w-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="card-dashboard">
            <CardHeader>
              <CardTitle>Loan History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="table-responsive">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Loan ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Interest Rate</TableHead>
                      <TableHead>Term</TableHead>
                      <TableHead>Monthly Payment</TableHead>
                      <TableHead>Balance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Purpose</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loanHistory.map((loan) => (
                      <TableRow key={loan.loan_id}>
                        <TableCell className="font-mono">{loan.loan_id}</TableCell>
                        <TableCell>₱{loan.loan_amount.toLocaleString()}</TableCell>
                        <TableCell>{loan.interest_rate}%</TableCell>
                        <TableCell>{loan.loan_term_months} months</TableCell>
                        <TableCell>₱{loan.monthly_payment.toLocaleString()}</TableCell>
                        <TableCell>₱{loan.total_balance.toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(loan.status)}</TableCell>
                        <TableCell className="max-w-xs truncate">{loan.purpose}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card className="card-dashboard">
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="table-responsive">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Principal</TableHead>
                      <TableHead>Interest</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Receipt</TableHead>
                      <TableHead>Processed By</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentHistory.map((payment) => (
                      <TableRow key={payment.payment_id}>
                        <TableCell className="font-mono">{payment.payment_id}</TableCell>
                        <TableCell>{new Date(payment.payment_date).toLocaleDateString()}</TableCell>
                        <TableCell>₱{payment.payment_amount.toLocaleString()}</TableCell>
                        <TableCell>₱{payment.principal_amount.toLocaleString()}</TableCell>
                        <TableCell>₱{payment.interest_amount.toLocaleString()}</TableCell>
                        <TableCell className="capitalize">{payment.payment_method}</TableCell>
                        <TableCell className="font-mono">{payment.receipt_number}</TableCell>
                        <TableCell>{payment.processed_by}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BorrowerRecord;