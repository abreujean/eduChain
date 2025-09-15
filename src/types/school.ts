export interface School {
  id: string;
  name: string;
  type: 'escola' | 'creche';
  communityType: 'quilombola' | 'indigena' | 'comunitaria';
  location: {
    state: string;
    city: string;
    address: string;
    coordinates: [number, number];
  };
  walletAddress?: string;
  managerId: string;
  eligibilityScore: number;
  status: 'pending' | 'approved' | 'suspended';
  studentsCount: number;
  infrastructure: {
    hasKitchen: boolean;
    hasLibrary: boolean;
    internetAccess: boolean;
    safeWater: boolean;
  };
  createdAt: string;
  updatedAt?: string;
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