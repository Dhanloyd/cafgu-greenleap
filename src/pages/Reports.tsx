import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Download, Printer, Filter, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample data for CAFGU ZAMPEN COOPERATIVE loan deduction report
const sampleLoanData = [
  {
    nr: 1,
    patrolBase: "DCAO",
    names: "CAA EDEN CADUHADA",
    principalLoan: "5,000.00",
    prevPayments: "NEG",
    principalDeduct: "4,040.00",
    monthInt: "150.00",
    procFee: "25.00",
    zampenBenefits: "25.00",
    unpdShareCapital: "100.00",
    totalDeduct: "4,340.00",
    balance: "2,000.00",
    share20122024: "3,800.00",
    remarks: ""
  },
  {
    nr: 2,
    patrolBase: "DCAO",
    names: "CAA JOHANNA DODIN",
    principalLoan: "5,000.00",
    prevPayments: "NEG",
    principalDeduct: "4,590.00",
    monthInt: "150.00",
    procFee: "25.00",
    zampenBenefits: "25.00",
    unpdShareCapital: "100.00",
    totalDeduct: "4,890.00",
    balance: "",
    share20122024: "3,800.00",
    remarks: ""
  },
  {
    nr: 3,
    patrolBase: "DCAO",
    names: "CAA BRITNEY CABANLIT",
    principalLoan: "10,000.00",
    prevPayments: "NEG",
    principalDeduct: "4,840.00",
    monthInt: "300.00",
    procFee: "25.00",
    zampenBenefits: "25.00",
    unpdShareCapital: "200.00",
    totalDeduct: "5,390.00",
    balance: "2,000.00",
    share20122024: "3,800.00",
    remarks: ""
  },
  {
    nr: 4,
    patrolBase: "DCAO",
    names: "CAA TAMULA ISAGANI",
    principalLoan: "20,000.00",
    prevPayments: "NEG",
    principalDeduct: "4,480.00",
    monthInt: "600.00",
    procFee: "25.00",
    zampenBenefits: "25.00",
    unpdShareCapital: "400.00",
    totalDeduct: "5,530.00",
    balance: "17,000.00",
    share20122024: "3,800.00",
    remarks: ""
  },
  {
    nr: 5,
    patrolBase: "DCAO",
    names: "CAA ANGELA QUINTERO",
    principalLoan: "10,000.00",
    prevPayments: "NEG",
    principalDeduct: "3,700.00",
    monthInt: "300.00",
    procFee: "25.00",
    zampenBenefits: "25.00",
    unpdShareCapital: "200.00",
    totalDeduct: "4,250.00",
    balance: "2,000.00",
    share20122024: "3,800.00",
    remarks: ""
  }
];

const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedReport, setSelectedReport] = useState('summary');
  const { toast } = useToast();

  const handlePrint = () => {
    window.print();
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

  return (
    <div className="min-h-screen bg-background">
        {/* Print Header - Only visible when printing */}
        <div className="print:block hidden print:text-center print:mb-4">
          <h1 className="print:text-lg print:font-bold print:mb-1">CAFGU ZAMPEN COOPERATIVE</h1>
          <p className="print:text-sm print:mb-0">So DK, Brgy Libertad, Municipality of Tungawan,</p>
          <p className="print:text-sm print:mb-0">Zamboanga Sibugay Province</p>
          <p className="print:text-sm print:mb-0">CDA REG No. 9520-10900000000-256-00</p>
          <p className="print:text-sm print:mb-0">TIN No. 477424593000</p>
          <p className="print:text-sm print:font-bold print:mt-2 print:mb-3">Cash loan Deduction as Of JULY 2025</p>
        </div>

      <div className="page-container print:p-4 print:max-w-none">
        {/* Screen Header */}
        <div className="page-header print:hidden">
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

        {/* Report Filters - Hidden when printing */}
        <Card className="card-dashboard mb-6 print:hidden">
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
                    <SelectItem value="summary">Financial Summary</SelectItem>
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

        {/* Official Report Document */}
        <div className="bg-white print:bg-white border print:border-0 rounded-lg print:rounded-none p-6 print:p-0 shadow-sm print:shadow-none">
          <div className="overflow-x-auto print:overflow-visible">
            <Table className="border-collapse border border-border text-xs print:text-[10px] w-full print:w-full">
              <TableHeader>
                <TableRow className="bg-muted/50 print:bg-white">
                  <TableHead className="border border-border text-center font-bold py-2 px-1 text-xs print:text-[8px] print:py-1">NR</TableHead>
                  <TableHead className="border border-border text-center font-bold py-2 px-1 text-xs print:text-[8px] print:py-1">PATROL BASE</TableHead>
                  <TableHead className="border border-border text-center font-bold py-2 px-1 text-xs print:text-[8px] print:py-1">NAMES</TableHead>
                  <TableHead className="border border-border text-center font-bold py-2 px-1 text-xs print:text-[8px] print:py-1">PRINCIPAL LOAN</TableHead>
                  <TableHead className="border border-border text-center font-bold py-2 px-1 text-xs print:text-[8px] print:py-1">PREV. PAYMENTS</TableHead>
                  <TableHead className="border border-border text-center font-bold py-2 px-1 text-xs print:text-[8px] print:py-1">PRINCIPAL DEDUCT.</TableHead>
                  <TableHead className="border border-border text-center font-bold py-2 px-1 text-xs print:text-[8px] print:py-1">1 MONTH INT.</TableHead>
                  <TableHead className="border border-border text-center font-bold py-2 px-1 text-xs print:text-[8px] print:py-1">PROC. FEE</TableHead>
                  <TableHead className="border border-border text-center font-bold py-2 px-1 text-xs print:text-[8px] print:py-1">ZAMPEN BENEFITS</TableHead>
                  <TableHead className="border border-border text-center font-bold py-2 px-1 text-xs print:text-[8px] print:py-1">UNPD SHARE CAPITAL</TableHead>
                  <TableHead className="border border-border text-center font-bold py-2 px-1 text-xs print:text-[8px] print:py-1">TOTAL DEDUCT.</TableHead>
                  <TableHead className="border border-border text-center font-bold py-2 px-1 text-xs print:text-[8px] print:py-1">BALANCE</TableHead>
                  <TableHead className="border border-border text-center font-bold py-2 px-1 text-xs print:text-[8px] print:py-1">SHARE 2012-2024</TableHead>
                  <TableHead className="border border-border text-center font-bold py-2 px-1 text-xs print:text-[8px] print:py-1">REMARKS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleLoanData.map((row, index) => (
                  <TableRow key={index} className="print:h-6">
                    <TableCell className="border border-border text-center py-1 px-1 text-xs print:text-[9px] print:py-0.5">{row.nr}</TableCell>
                    <TableCell className="border border-border text-center py-1 px-1 text-xs print:text-[9px] print:py-0.5">{row.patrolBase}</TableCell>
                    <TableCell className="border border-border py-1 px-1 text-xs print:text-[9px] print:py-0.5">{row.names}</TableCell>
                    <TableCell className="border border-border text-right py-1 px-1 text-xs print:text-[9px] print:py-0.5">{row.principalLoan}</TableCell>
                    <TableCell className="border border-border text-center py-1 px-1 text-xs print:text-[9px] print:py-0.5">{row.prevPayments}</TableCell>
                    <TableCell className="border border-border text-right py-1 px-1 text-xs print:text-[9px] print:py-0.5">{row.principalDeduct}</TableCell>
                    <TableCell className="border border-border text-right py-1 px-1 text-xs print:text-[9px] print:py-0.5">{row.monthInt}</TableCell>
                    <TableCell className="border border-border text-right py-1 px-1 text-xs print:text-[9px] print:py-0.5">{row.procFee}</TableCell>
                    <TableCell className="border border-border text-right py-1 px-1 text-xs print:text-[9px] print:py-0.5">{row.zampenBenefits}</TableCell>
                    <TableCell className="border border-border text-right py-1 px-1 text-xs print:text-[9px] print:py-0.5">{row.unpdShareCapital}</TableCell>
                    <TableCell className="border border-border text-right py-1 px-1 text-xs print:text-[9px] print:py-0.5 font-bold">{row.totalDeduct}</TableCell>
                    <TableCell className="border border-border text-right py-1 px-1 text-xs print:text-[9px] print:py-0.5">{row.balance}</TableCell>
                    <TableCell className="border border-border text-right py-1 px-1 text-xs print:text-[9px] print:py-0.5">{row.share20122024}</TableCell>
                    <TableCell className="border border-border text-center py-1 px-1 text-xs print:text-[9px] print:py-0.5">{row.remarks}</TableCell>
                  </TableRow>
                ))}
                {/* Total Row */}
                <TableRow className="bg-muted/50 print:bg-white font-bold print:h-6">
                  <TableCell className="border border-border text-center py-2 px-1 text-xs print:text-[9px] print:py-0.5"></TableCell>
                  <TableCell className="border border-border text-center py-2 px-1 text-xs print:text-[9px] print:py-0.5"></TableCell>
                  <TableCell className="border border-border text-center py-2 px-1 text-xs print:text-[9px] print:py-0.5"></TableCell>
                  <TableCell className="border border-border text-right py-2 px-1 text-xs print:text-[9px] print:py-0.5">120,000.00</TableCell>
                  <TableCell className="border border-border text-center py-2 px-1 text-xs print:text-[9px] print:py-0.5">-</TableCell>
                  <TableCell className="border border-border text-right py-2 px-1 text-xs print:text-[9px] print:py-0.5">62,460.00</TableCell>
                  <TableCell className="border border-border text-right py-2 px-1 text-xs print:text-[9px] print:py-0.5">3,600.00</TableCell>
                  <TableCell className="border border-border text-right py-2 px-1 text-xs print:text-[9px] print:py-0.5">325.00</TableCell>
                  <TableCell className="border border-border text-right py-2 px-1 text-xs print:text-[9px] print:py-0.5">325.00</TableCell>
                  <TableCell className="border border-border text-right py-2 px-1 text-xs print:text-[9px] print:py-0.5">2,400.00</TableCell>
                  <TableCell className="border border-border text-right py-2 px-1 text-xs print:text-[9px] print:py-0.5">69,110.00</TableCell>
                  <TableCell className="border border-border text-right py-2 px-1 text-xs print:text-[9px] print:py-0.5">50,000.00</TableCell>
                  <TableCell className="border border-border text-right py-2 px-1 text-xs print:text-[9px] print:py-0.5">49,100.00</TableCell>
                  <TableCell className="border border-border text-center py-2 px-1 text-xs print:text-[9px] print:py-0.5">-</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Signature Section */}
          <div className="mt-8 print:mt-4 grid grid-cols-1 md:grid-cols-3 gap-8 print:gap-4 print:text-center">
            <div className="text-center">
              <div className="border-b border-border w-48 mx-auto mb-2 h-12 print:h-8 print:w-32"></div>
              <p className="text-sm font-bold print:text-[10px] print:font-bold">FRANCIS MARC G ALVAREZ</p>
              <p className="text-xs print:text-[9px]">BOOKKEEPER</p>
            </div>
            <div className="text-center">
              <div className="border-b border-border w-48 mx-auto mb-2 h-12 print:h-8 print:w-32"></div>
              <p className="text-sm font-bold print:text-[10px] print:font-bold">TRIMETEO D ANTIGA JR</p>
              <p className="text-xs print:text-[9px]">ZAMPEN MANAGER</p>
            </div>
            <div className="text-center">
              <div className="border-b border-border w-48 mx-auto mb-2 h-12 print:h-8 print:w-32"></div>
              <p className="text-sm font-bold print:text-[10px] print:font-bold">IRISH C DINALO</p>
              <p className="text-xs print:text-[9px]">TREASURER/COLLECTOR</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;