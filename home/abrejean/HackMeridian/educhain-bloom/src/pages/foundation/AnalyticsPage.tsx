import React from 'react';
// ... existing code ...
import { TrendingUp, Users, School, DollarSign, Heart, BookOpen, Utensils, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AnalyticsPage() {
  const { t } = useTranslation();
  // Mock data for charts
// ... existing code ...
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('impact_analytics')}</h1>
        <p className="text-muted-foreground">
          {t('impact_analytics_description')}
        </p>
      </div>

      {/* Key Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="impact-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('impacted_students')}</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {impactMetrics.totalStudents.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {t('vs_last_month', { value: 15 })}
            </p>
          </CardContent>
        </Card>

        <Card className="impact-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('attendance_improvement')}</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              +{impactMetrics.avgAttendanceImprovement}%
            </div>
            <p className="text-xs text-muted-foreground">
              {t('schools_average')}
            </p>
          </CardContent>
        </Card>

        <Card className="impact-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('meals_per_month')}</CardTitle>
            <Utensils className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {impactMetrics.mealsServedMonthly.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {t('in_all_schools')}
            </p>
          </CardContent>
        </Card>

        <Card className="impact-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('average_score')}</CardTitle>
            <Award className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">
              {impactMetrics.avgEligibilityScore}
            </div>
            <p className="text-xs text-muted-foreground">
              {t('general_eligibility')}
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
              {t('distributions_by_month')}
            </CardTitle>
            <CardDescription>
              {t('distributions_by_month_description')}
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
                    t('brl_value')
                  ]}
                  labelFormatter={(label) => `${t('month')}: ${label}`}
                  content={({ active, payload, label }) => {
// ... existing code ...
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <School className="h-5 w-5 text-primary" />
              {t('distribution_by_type')}
            </CardTitle>
            <CardDescription>
              {t('distribution_by_type_description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
// ... existing code ...