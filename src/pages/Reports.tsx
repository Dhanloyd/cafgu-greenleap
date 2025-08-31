import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Download, Printer, Filter, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample data for demonstration - matches the document format
const sampleReportData = [
  {
    particulars: "CASH/DEMAND BANK DEPOSIT",
    june: "25,000.00",
    july: "30,000.00", 
    august: "35,000.00",
    total: "90,000.00"
  },
  {
    particulars: "CASH SAVINGS DEPOSIT",
    june: "15,000.00",
    july: "20,000.00",
    august: "25,000.00", 
    total: "60,000.00"
  },
  {
    particulars: "CASH SHARE CAPITAL FUND",
    june: "10,000.00",
    july: "15,000.00",
    august: "20,000.00",
    total: "45,000.00"
  },
  {
    particulars: "CASH EDUCATION DEVELOPMENT",
    june: "5,000.00",
    july: "7,500.00",
    august: "10,000.00",
    total: "22,500.00"
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
      <div className="print:block hidden">
        <div className="text-center border-b-2 border-primary pb-4 mb-6">
          <img 
            src="/lovable-uploads/c220bffd-33c5-49db-b365-5c1a2681bdc8.png" 
            alt="Bayang Tungawan Logo" 
            className="mx-auto h-16 w-16 mb-2"
          />
          <h1 className="text-xl font-bold">ZAMBOANGA SIBUGAY AREA</h1>
          <h2 className="text-lg font-semibold">BAYANG TUNGAWAN POLICE STATION</h2>
          <p className="text-sm text-muted-foreground">Financial Report - {selectedYear}</p>
        </div>
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
          {/* Report Title */}
          <div className="text-center mb-6 print:mb-4">
            <h2 className="text-2xl print:text-xl font-bold text-foreground mb-2">
              CASH TOTAL POSITION AS OF JUNE 2024
            </h2>
            <p className="text-sm text-muted-foreground">
              TIN No. 247498900 | Cash Count Deduction as of June 2025
            </p>
          </div>

          {/* Main Financial Table */}
          <div className="overflow-x-auto">
            <Table className="border-collapse border border-border">
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="border border-border text-center font-bold py-3">
                    PARTICULARS
                  </TableHead>
                  <TableHead className="border border-border text-center font-bold">
                    JUNE
                  </TableHead>
                  <TableHead className="border border-border text-center font-bold">
                    JULY
                  </TableHead>
                  <TableHead className="border border-border text-center font-bold">
                    AUGUST
                  </TableHead>
                  <TableHead className="border border-border text-center font-bold">
                    TOTAL
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleReportData.map((row, index) => (
                  <TableRow key={index} className="hover:bg-muted/25">
                    <TableCell className="border border-border font-medium py-2 px-3">
                      {row.particulars}
                    </TableCell>
                    <TableCell className="border border-border text-right py-2 px-3 font-mono">
                      ₱{row.june}
                    </TableCell>
                    <TableCell className="border border-border text-right py-2 px-3 font-mono">
                      ₱{row.july}
                    </TableCell>
                    <TableCell className="border border-border text-right py-2 px-3 font-mono">
                      ₱{row.august}
                    </TableCell>
                    <TableCell className="border border-border text-right py-2 px-3 font-mono font-bold">
                      ₱{row.total}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/50 font-bold">
                  <TableCell className="border border-border py-3 px-3">
                    TOTAL
                  </TableCell>
                  <TableCell className="border border-border text-right py-3 px-3 font-mono">
                    ₱115,000.00
                  </TableCell>
                  <TableCell className="border border-border text-right py-3 px-3 font-mono">
                    ₱142,500.00
                  </TableCell>
                  <TableCell className="border border-border text-right py-3 px-3 font-mono">
                    ₱180,000.00
                  </TableCell>
                  <TableCell className="border border-border text-right py-3 px-3 font-mono text-lg">
                    ₱437,500.00
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Signature Section */}
          <div className="mt-8 print:mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 print:gap-4">
            <div className="text-center">
              <div className="border-b border-border w-48 mx-auto mb-2 h-12"></div>
              <p className="text-sm font-medium">Prepared by:</p>
              <p className="text-xs text-muted-foreground">Finance Officer</p>
            </div>
            <div className="text-center">
              <div className="border-b border-border w-48 mx-auto mb-2 h-12"></div>
              <p className="text-sm font-medium">Reviewed by:</p>
              <p className="text-xs text-muted-foreground">Station Commander</p>
            </div>
            <div className="text-center">
              <div className="border-b border-border w-48 mx-auto mb-2 h-12"></div>
              <p className="text-sm font-medium">Approved by:</p>
              <p className="text-xs text-muted-foreground">Area Director</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 print:mt-4 text-center text-xs text-muted-foreground border-t pt-4">
            <p>Document generated on {new Date().toLocaleDateString()}</p>
            <p>Bayang Tungawan Police Station Financial Report System</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;