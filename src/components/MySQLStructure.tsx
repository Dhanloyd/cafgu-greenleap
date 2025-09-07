import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, Table, Users, CreditCard, Calendar, DollarSign } from 'lucide-react';

// MySQL Database Structure for CAFGU ZAMPEN COOPERATIVE
export const MySQLStructure: React.FC = () => {
  const tableStructures = [
    {
      name: 'members',
      icon: Users,
      description: 'Member information and status',
      columns: [
        'member_id (PRIMARY KEY, AUTO_INCREMENT)',
        'first_name VARCHAR(50)',
        'last_name VARCHAR(50)',
        'patrol_base VARCHAR(10)',
        'rank VARCHAR(20)',
        'contact_number VARCHAR(15)',
        'email VARCHAR(100)',
        'date_joined DATE',
        'status ENUM("active", "inactive", "suspended")',
        'share_capital DECIMAL(10,2)',
        'created_at TIMESTAMP',
        'updated_at TIMESTAMP'
      ]
    },
    {
      name: 'loans',
      icon: CreditCard,
      description: 'Loan records and details',
      columns: [
        'loan_id (PRIMARY KEY, AUTO_INCREMENT)',
        'member_id INT (FOREIGN KEY)',
        'loan_amount DECIMAL(10,2)',
        'interest_rate DECIMAL(5,2)',
        'loan_term_months INT',
        'monthly_payment DECIMAL(10,2)',
        'principal_balance DECIMAL(10,2)',
        'interest_balance DECIMAL(10,2)',
        'total_balance DECIMAL(10,2)',
        'loan_date DATE',
        'due_date DATE',
        'status ENUM("active", "completed", "defaulted")',
        'purpose TEXT',
        'created_at TIMESTAMP',
        'updated_at TIMESTAMP'
      ]
    },
    {
      name: 'payments',
      icon: DollarSign,
      description: 'Payment transactions and history',
      columns: [
        'payment_id (PRIMARY KEY, AUTO_INCREMENT)',
        'loan_id INT (FOREIGN KEY)',
        'member_id INT (FOREIGN KEY)',
        'payment_amount DECIMAL(10,2)',
        'principal_amount DECIMAL(10,2)',
        'interest_amount DECIMAL(10,2)',
        'payment_date DATE',
        'payment_method ENUM("cash", "check", "bank_transfer")',
        'receipt_number VARCHAR(20)',
        'processed_by VARCHAR(50)',
        'notes TEXT',
        'created_at TIMESTAMP'
      ]
    },
    {
      name: 'loan_schedules',
      icon: Calendar,
      description: 'Payment schedules and due dates',
      columns: [
        'schedule_id (PRIMARY KEY, AUTO_INCREMENT)',
        'loan_id INT (FOREIGN KEY)',
        'payment_number INT',
        'due_date DATE',
        'principal_amount DECIMAL(10,2)',
        'interest_amount DECIMAL(10,2)',
        'total_amount DECIMAL(10,2)',
        'paid_amount DECIMAL(10,2)',
        'balance_amount DECIMAL(10,2)',
        'payment_status ENUM("pending", "paid", "overdue")',
        'paid_date DATE',
        'created_at TIMESTAMP'
      ]
    }
  ];

  const sampleQueries = [
    {
      title: 'Total Active Loans by Patrol Base',
      query: `SELECT 
        m.patrol_base, 
        COUNT(l.loan_id) as loan_count,
        SUM(l.total_balance) as total_amount
      FROM members m 
      JOIN loans l ON m.member_id = l.member_id 
      WHERE l.status = 'active' 
      GROUP BY m.patrol_base 
      ORDER BY total_amount DESC;`
    },
    {
      title: 'Monthly Collection Report',
      query: `SELECT 
        DATE_FORMAT(payment_date, '%Y-%m') as month,
        SUM(payment_amount) as total_collected,
        COUNT(payment_id) as payment_count
      FROM payments 
      WHERE payment_date >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
      GROUP BY month 
      ORDER BY month;`
    },
    {
      title: 'Members with Overdue Loans',
      query: `SELECT 
        m.first_name, m.last_name, m.patrol_base,
        l.loan_amount, l.total_balance,
        DATEDIFF(NOW(), l.due_date) as days_overdue
      FROM members m 
      JOIN loans l ON m.member_id = l.member_id 
      WHERE l.status = 'active' 
        AND l.due_date < NOW()
      ORDER BY days_overdue DESC;`
    },
    {
      title: 'Annual Interest Report by Member',
      query: `SELECT 
        m.member_id, m.first_name, m.last_name,
        SUM(p.interest_amount) as yearly_interest,
        SUM(p.principal_amount) as yearly_principal
      FROM members m 
      JOIN payments p ON m.member_id = p.member_id 
      WHERE YEAR(p.payment_date) = YEAR(NOW())
      GROUP BY m.member_id 
      ORDER BY yearly_interest DESC;`
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="card-dashboard">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            MySQL Database Structure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tableStructures.map((table, index) => (
              <Card key={index} className="border border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <table.icon className="h-4 w-4 text-primary" />
                    {table.name}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">{table.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-1">
                    {table.columns.map((column, colIndex) => (
                      <div key={colIndex} className="text-xs font-mono bg-muted/30 p-2 rounded">
                        {column}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="card-dashboard">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Table className="h-5 w-5 text-primary" />
            Sample MySQL Queries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sampleQueries.map((query, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <h4 className="font-medium text-sm mb-2">{query.title}</h4>
                <pre className="text-xs bg-muted/30 p-3 rounded overflow-x-auto">
                  <code>{query.query}</code>
                </pre>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MySQLStructure;