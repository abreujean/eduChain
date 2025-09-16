import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { FiatWithXLM } from '@/components/common/FiatWithXLM';
import { TrendingUp, Users, School, DollarSign, Heart, BookOpen, Utensils, Award } from 'lucide-react';

export default function AnalyticsPage() {
  const { t } = useTranslation();

  // Mock data for charts
  const distributionsByMonth = [
    { month: 'Jul', amount: 45000, schools: 8 },
    { month: 'Ago', amount: 52000, schools: 12 },
    { month: 'Set', amount: 48000, schools: 10 },
    { month: 'Out', amount: 67000, schools: 15 },
    { month: 'Nov', amount: 71000, schools: 18 },
    { month: 'Dez', amount: 89000, schools: 22 },
    { month: 'Jan', amount: 95000, schools: 25 }
  ];

  const schoolsByType = [
    { name: t('analytics_schools'), value: 78, color: '#3b82f6' },
    { name: t('analytics_daycares'), value: 49, color: '#10b981' }
  ];

  const communityTypes = [
    { name: t('analytics_community'), value: 65, color: '#6366f1' },
    { name: t('analytics_quilombolas'), value: 38, color: '#8b5cf6' },
    { name: t('analytics_indigenous'), value: 24, color: '#f59e0b' }
  ];

  const eligibilityScores = [
    { range: '0-20', count: 2 },
    { range: '21-40', count: 8 },
    { range: '41-60', count: 23 },
    { range: '61-80', count: 45 },
    { range: '81-100', count: 49 }
  ];

  const impactMetrics = {
    totalStudents: 8543,
    avgAttendanceImprovement: 23,
    mealsServedMonthly: 45780,
    teachersTrained: 234,
    communitiesReached: 45,
    avgEligibilityScore: 73.2
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('analytics_impact_title')}</h1>
        <p className="text-muted-foreground">
          {t('analytics_impact_description')}
        </p>
      </div>

      {/* Key Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="impact-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('analytics_impacted_students')}</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {impactMetrics.totalStudents.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {t('analytics_vs_last_month', { value: 15 })}
            </p>
          </CardContent>
        </Card>

        <Card className="impact-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('analytics_attendance_improvement')}</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              +{impactMetrics.avgAttendanceImprovement}%
            </div>
            <p className="text-xs text-muted-foreground">
              {t('analytics_schools_average')}
            </p>
          </CardContent>
        </Card>

        <Card className="impact-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('analytics_meals_per_month')}</CardTitle>
            <Utensils className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {impactMetrics.mealsServedMonthly.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {t('analytics_in_all_schools')}
            </p>
          </CardContent>
        </Card>

        <Card className="impact-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('analytics_average_score')}</CardTitle>
            <Award className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">
              {impactMetrics.avgEligibilityScore}
            </div>
            <p className="text-xs text-muted-foreground">
              {t('analytics_general_eligibility')}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-success" />
              {t('analytics_distributions_by_month')}
            </CardTitle>
            <CardDescription>
              {t('analytics_distributions_evolution')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={distributionsByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [
                    `R$ ${value.toLocaleString()}`, 
                    t('analytics_brl_value')
                  ]}
                  labelFormatter={(label) => `${t('analytics_month')}: ${label}`}
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const value = payload[0].value;
                      return (
                        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                          <p className="font-medium">{`${label}`}</p>
                          <FiatWithXLM amountBRL={value} />
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="amount" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <School className="h-5 w-5 text-primary" />
              {t('analytics_distribution_by_type')}
            </CardTitle>
            <CardDescription>
              {t('analytics_proportion_description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={schoolsByType}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {schoolsByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-destructive" />
              {t('analytics_communities_served')}
            </CardTitle>
            <CardDescription>
              {t('analytics_distribution_by_community_type')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={communityTypes}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {communityTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              {t('analytics_score_distribution')}
            </CardTitle>
            <CardDescription>
              {t('analytics_score_distribution_description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={eligibilityScores}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [`${value} ${t('analytics_schools')}`, t('analytics_quantity')]}
                />
                <Bar dataKey="count" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Impact Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-secondary" />
            {t('analytics_social_impact_summary')}
          </CardTitle>
          <CardDescription>
            {t('analytics_social_impact_summary_description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">{t('analytics_trained_teachers')}</span>
                <span className="font-bold text-secondary">{impactMetrics.teachersTrained}</span>
              </div>
              <Progress value={78} className="h-2" />
              <p className="text-xs text-muted-foreground">{t('analytics_annual_goal_teachers', { total: 300, percentage: 78 })}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">{t('analytics_communities_reached')}</span>
                <span className="font-bold text-accent">{impactMetrics.communitiesReached}</span>
              </div>
              <Progress value={90} className="h-2" />
              <p className="text-xs text-muted-foreground">{t('analytics_annual_goal_communities', { total: 50, percentage: 90 })}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">{t('analytics_retention_rate')}</span>
                <span className="font-bold text-success">92%</span>
              </div>
              <Progress value={92} className="h-2" />
              <p className="text-xs text-muted-foreground">{t('analytics_retention_rate_description')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}