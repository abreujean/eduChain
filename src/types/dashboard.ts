export interface ChartData {
  month: string;
  amount: number;
  schools: number;
}

export interface PieChartData {
  name: string;
  value: number;
  color: string;
}

export interface HistogramData {
  range: string;
  count: number;
}

export interface SchoolRanking {
  id: string;
  name: string;
  score: number;
  improvement: number;
  studentsCount: number;
}

export interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  schoolId?: string;
}

export interface FoundationDashboard {
  totalFunds: number;
  totalSchools: number;
  monthlyDistributions: number;
  activeStudents: number;
  distributionsByMonth: ChartData[];
  schoolsByType: PieChartData[];
  eligibilityScoreDistribution: HistogramData[];
  impactMetrics: {
    childrenFed: number;
    teachersTrained: number;
    communitiesReached: number;
    averageAttendanceImprovement: number;
  };
  pendingApprovals: any[];
  topPerformingSchools: SchoolRanking[];
  recentDistributions: any[];
  alerts: Alert[];
}