import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { School as SchoolIcon, Wallet } from 'lucide-react';
import { School } from '@/types/school';

// Funções de utilidade movidas para fora ou para um arquivo de utils
const isEligible = (lastPaymentDate: Date) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return new Date(lastPaymentDate) > thirtyDaysAgo;
};

const daysAgo = (date: Date) => {
  const now = new Date();
  const differenceInTime = now.getTime() - new Date(date).getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  if (differenceInDays === 0) return 'Hoje';
  if (differenceInDays === 1) return 'Há 1 dia';
  return `Há ${differenceInDays} dias`;
};

interface ApprovedSchoolsListProps {
  schools: School[];
}

export function ApprovedSchoolsList({ schools }: ApprovedSchoolsListProps) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SchoolIcon className="h-5 w-5 text-primary" />
          {t('approved_schools')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {schools.map((school) => (
            <div key={school.id} className="flex items-start justify-between p-3 bg-secondary/20 rounded-lg">
              <div className="flex-1">
                <Link 
                  to={`/schools/${school.id}`}
                  className="font-medium hover:text-primary transition-colors cursor-pointer"
                >
                  {school.name}
                </Link>
                <p className="text-sm text-muted-foreground">{school.location}</p>
                <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{school.communityType}</Badge>
                    <span className="text-xs text-muted-foreground">{t('students_count', { count: school.students })}</span>
                </div>
                <div className="mt-2 text-sm space-y-1">
                  <div className="flex items-center gap-2">
                     <Wallet className="h-4 w-4 text-muted-foreground" />
                     <span className="font-mono text-xs">{school.walletAddress}</span>
                  </div>
                  <p>{t('donation_share')}: <span className="font-semibold">R$ {school.donationInstallmentValue.toFixed(2)}</span></p>
                  <p>{t('installments_paid')}: <span className="font-semibold">{school.installmentsPaid}</span></p>
                  <p>{t('last_payment')}: <span className="font-semibold">{daysAgo(school.lastPaymentDate)}</span></p>
                  <div className="flex items-center gap-2">
                    <span>{t('payment_status')}:</span>
                    {isEligible(school.lastPaymentDate) ? (
                        <Badge variant="default" className="bg-green-500 hover:bg-green-600">{t('eligible')}</Badge>
                    ) : (
                        <Badge variant="destructive">{t('overdue')}</Badge>
                    )}
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild className="ml-4 self-center">
                <Link to={`/schools/${school.id}`}>{t('view_profile')}</Link>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}