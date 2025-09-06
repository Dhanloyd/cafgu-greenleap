import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Calendar, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Payment {
  id: number;
  loanId: string;
  amount: number;
  paymentDate: string;
  type: 'principal' | 'interest' | 'penalty';
  status: 'completed' | 'pending';
}

interface PaymentTrackerProps {
  loanId: string;
  loanAmount: number;
  remainingBalance: number;
  interestRate: number;
  payments: Payment[];
  onAddPayment: (payment: Omit<Payment, 'id'>) => void;
}

const PaymentTracker: React.FC<PaymentTrackerProps> = ({
  loanId,
  loanAmount,
  remainingBalance,
  interestRate,
  payments,
  onAddPayment
}) => {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentType, setPaymentType] = useState<'principal' | 'interest' | 'penalty'>('principal');
  const { toast } = useToast();

  const handleAddPayment = () => {
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid payment amount",
        variant: "destructive",
      });
      return;
    }

    const newPayment = {
      loanId,
      amount: parseFloat(paymentAmount),
      paymentDate: new Date().toISOString().split('T')[0],
      type: paymentType,
      status: 'completed' as const
    };

    onAddPayment(newPayment);
    setPaymentAmount('');
    
    toast({
      title: "Payment Added",
      description: `Payment of ₱${paymentAmount} has been recorded`,
    });
  };

  const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const principalPaid = payments.filter(p => p.type === 'principal').reduce((sum, p) => sum + p.amount, 0);
  const interestPaid = payments.filter(p => p.type === 'interest').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Total Loan</div>
            <div className="text-2xl font-bold">₱{loanAmount.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Total Paid</div>
            <div className="text-2xl font-bold text-green-600">₱{totalPaid.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Remaining</div>
            <div className="text-2xl font-bold text-orange-600">₱{remainingBalance.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Interest Rate</div>
            <div className="text-2xl font-bold">{interestRate}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Add Payment Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Payment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Payment Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Payment Type</Label>
              <select
                id="type"
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value as 'principal' | 'interest' | 'penalty')}
                className="w-full px-3 py-2 border border-input bg-background rounded-md"
              >
                <option value="principal">Principal</option>
                <option value="interest">Interest</option>
                <option value="penalty">Penalty</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button onClick={handleAddPayment} className="w-full">
                <DollarSign className="h-4 w-4 mr-2" />
                Add Payment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Payment History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    <p className="text-muted-foreground">No payments recorded yet</p>
                  </TableCell>
                </TableRow>
              ) : (
                payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.paymentDate}</TableCell>
                    <TableCell className="font-medium">₱{payment.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={
                        payment.type === 'principal' ? 'default' :
                        payment.type === 'interest' ? 'secondary' : 'destructive'
                      }>
                        {payment.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={payment.status === 'completed' ? 'default' : 'secondary'}>
                        {payment.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Principal Paid</div>
            <div className="text-xl font-bold">₱{principalPaid.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground mt-1">
              {((principalPaid / loanAmount) * 100).toFixed(1)}% of total loan
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Interest Paid</div>
            <div className="text-xl font-bold">₱{interestPaid.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentTracker;