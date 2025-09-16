export interface School {
  id: string;
  name: string;
  status: 'approved' | 'pending' | 'rejected';
  location: string;
  students: number;
  communityType: 'Quilombola' | 'Indígena' | 'Urbana' | 'Ribeirinha' | 'Rural';
  donationInstallmentValue: number;
  lastPaymentDate: Date;
  installmentsPaid: number;
  walletAddress: string;
}

export interface MonthlyMetrics {
  id: string;
  schoolId: string;
  monthYear: string;
  studentsEnrolled: number;
  dailyAttendanceAvg: number;
  mealsServed: number;
  foodSecurityIndex: number; // 0-1
  teacherTrainingHours: number;
  managementScore: number; // 0-1
  communityParticipation: number; // 0-1
  submittedBy: string;
  validatedAt?: string;
  status: 'draft' | 'submitted' | 'validated';
}

export interface Distribution {
  id: string;
  schoolId: string;
  amount: number;
  currency: 'USDC' | 'XLM';
  transactionHash?: string;
  distributionDate: string;
  purpose: 'alimentacao' | 'capacitacao' | 'infraestrutura';
  status: 'pending' | 'completed' | 'failed';
  eligibilityScoreAtTime: number;
}