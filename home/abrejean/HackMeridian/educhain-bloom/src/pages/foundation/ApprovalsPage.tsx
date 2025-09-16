import React, { useState } from 'react';
// ... existing code ...
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, Eye, MapPin, Users, FileText, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ApprovalsPage() {
  const { t } = useTranslation();
  const [selectedSchool, setSelectedSchool] = useState<any>(null);
// ... existing code ...
  const getCommunityTypeBadge = (type: string) => {
    switch (type) {
      case 'quilombola': return <Badge variant="outline" className="text-purple-600 border-purple-600">{t('quilombola')}</Badge>;
      case 'indigena': return <Badge variant="outline" className="text-orange-600 border-orange-600">{t('indigenous')}</Badge>;
      case 'comunitaria': return <Badge variant="outline" className="text-blue-600 border-blue-600">{t('community')}</Badge>;
      default: return <Badge variant="outline">{t('undefined')}</Badge>;
    }
  };
// ... existing code ...
  const getStatusBadgeForSchool = (schoolId: string) => {
    const currentStatus = schoolStatuses[schoolId] || 'pending';
    switch (currentStatus) {
      case 'approved':
        return <Badge className="bg-green-600 text-white cursor-pointer">{t('status_approved')}</Badge>;
      case 'rejected':
        return <Badge className="bg-red-600 text-white cursor-pointer">{t('status_rejected')}</Badge>;
      case 'pending':
      default:
        return <Badge className="bg-blue-600 text-white cursor-pointer">{t('status_pending')}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('pending_approvals')}</h1>
        <p className="text-muted-foreground">
          {t('pending_approvals_description')}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('status_pending')}</CardTitle>
            <AlertCircle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{pendingSchools.length}</div>
            <p className="text-xs text-muted-foreground">{t('waiting_for_review')}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('this_month')}</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">12</div>
            <p className="text-xs text-muted-foreground">{t('approved_schools')}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('average_time')}</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">3.2</div>
            <p className="text-xs text-muted-foreground">{t('days_for_approval')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Approvals List */}
      <div className="space-y-4">
        {pendingSchools.map((school) => (
          <Card key={school.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {school.name}
                    {getCommunityTypeBadge(school.communityType)}
                  </CardTitle>
                  <CardDescription>
                    {t('submitted_on', { date: school.submittedAt })} • {school.type === 'escola' ? t('school') : t('daycare')}
                  </CardDescription>
                </div>
                <Dialog>
// ... existing code ...