import React from 'react';
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
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SchoolIcon className="h-5 w-5 text-primary" />
          Escolas Aprovadas
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
                    <span className="text-xs text-muted-foreground">{school.students} estudantes</span>
                </div>
                <div className="mt-2 text-sm space-y-1">
                  <div className="flex items-center gap-2">
                     <Wallet className="h-4 w-4 text-muted-foreground" />
                     <span className="font-mono text-xs">{school.walletAddress}</span>
                  </div>
                  <p>Parcela da Doação: <span className="font-semibold">R$ {school.donationInstallmentValue.toFixed(2)}</span></p>
                  <p>Parcelas Pagas: <span className="font-semibold">{school.installmentsPaid}</span></p>
                  <p>Último Pagamento: <span className="font-semibold">{daysAgo(school.lastPaymentDate)}</span></p>
                  <div className="flex items-center gap-2">
                    <span>Status do Pagamento:</span>
                    {isEligible(school.lastPaymentDate) ? (
                        <Badge variant="default" className="bg-green-500 hover:bg-green-600">Elegível</Badge>
                    ) : (
                        <Badge variant="destructive">Atrasado</Badge>
                    )}
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild className="ml-4 self-center">
                <Link to={`/schools/${school.id}`}>Ver Perfil</Link>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}