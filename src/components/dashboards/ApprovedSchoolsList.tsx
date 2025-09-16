import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { School, Wallet } from 'lucide-react';

// Mock data para escolas - em um aplicativo real, isso viria de uma API
const allSchools = [
  {
    id: 'school-1',
    name: 'Escola Quilombola São José',
    status: 'approved',
    location: 'Bahia, Brasil',
    students: 150,
    communityType: 'Quilombola',
    donationInstallmentValue: 500,
    lastPaymentDate: new Date(new Date().setDate(new Date().getDate() - 15)), // 15 dias atrás
    installmentsPaid: 5,
    walletAddress: 'GABC...XYZ'
  },
  {
    id: 'school-2',
    name: 'Creche Indígena Tabajaras',
    status: 'pending',
    location: 'Paraíba, Brasil',
    students: 80,
    communityType: 'Indígena',
    donationInstallmentValue: 300,
    lastPaymentDate: new Date(new Date().setDate(new Date().getDate() - 45)), // 45 dias atrás
    installmentsPaid: 2,
    walletAddress: 'GDEF...UVW'
  },
  {
    id: 'school-3',
    name: 'Escola Comunitária Esperança',
    status: 'approved',
    location: 'São Paulo, Brasil',
    students: 250,
    communityType: 'Urbana',
    donationInstallmentValue: 750,
    lastPaymentDate: new Date(new Date().setDate(new Date().getDate() - 5)), // 5 dias atrás
    installmentsPaid: 10,
    walletAddress: 'GHIJ...RST'
  },
  {
    id: 'school-4',
    name: 'Escola Ribeirinha Solimões',
    status: 'approved',
    location: 'Amazonas, Brasil',
    students: 120,
    communityType: 'Ribeirinha',
    donationInstallmentValue: 400,
    lastPaymentDate: new Date(new Date().setDate(new Date().getDate() - 25)), // 25 dias atrás
    installmentsPaid: 8,
    walletAddress: 'GKLM...OPQ'
  },
    {
    id: 'school-5',
    name: 'Escola do Campo Verdejante',
    status: 'rejected',
    location: 'Minas Gerais, Brasil',
    students: 95,
    communityType: 'Rural',
    donationInstallmentValue: 200,
    lastPaymentDate: new Date(new Date().setDate(new Date().getDate() - 60)), // 60 dias atrás
    installmentsPaid: 1,
    walletAddress: 'GNOP...MNO'
  }
];

const isEligible = (lastPaymentDate: Date) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return lastPaymentDate > thirtyDaysAgo;
};

const daysAgo = (date: Date) => {
  const now = new Date();
  const differenceInTime = now.getTime() - date.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  if (differenceInDays === 0) return 'Hoje';
  if (differenceInDays === 1) return 'Há 1 dia';
  return `Há ${differenceInDays} dias`;
}

export function ApprovedSchoolsList() {
  const approvedSchools = allSchools.filter(school => school.status === 'approved');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <School className="h-5 w-5 text-primary" />
          Escolas Aprovadas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {approvedSchools.map((school) => (
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