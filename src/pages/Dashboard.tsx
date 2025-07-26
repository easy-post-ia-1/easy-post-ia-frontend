import AuthenticatedNavbar from '@components/navbar/AuthenticatedNavbar';
import BottomNavigationMobile from '@components/navbar/BottomNavigationMobile';
import { Box, useMediaQuery, useTheme, Typography, Skeleton, Grid, Paper, Button } from '@mui/material';
import { PieChart, BarChart } from '@mui/x-charts';
import { useEmployerDashboardMetrics } from '@hooks/queries/dashboard/useEmployerDashboardMetrics';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from 'react';
export default function Dashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { isLoading, data: metrics, error } = useEmployerDashboardMetrics();
  const dashboardRef = useRef<HTMLDivElement>(null);

  // Prepare data for charts
  const postStatusData = [
    { id: 0, value: metrics?.publishedPosts || 0, label: 'Published' },
    { id: 1, value: metrics?.failedPosts || 0, label: 'Failed' },
    { id: 2, value: metrics?.pendingPosts || 0, label: 'Pending' },
  ];
  const barChartData = metrics?.postsPerStrategy?.map((item) => item.count) || [];
  const barChartLabels = metrics?.postsPerStrategy?.map((item) => item.strategy) || [];

  const handleDownloadPDF = async () => {
    if (!dashboardRef.current) return;
    const element = dashboardRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('dashboard.pdf');
  };

  return (
    <>
      <AuthenticatedNavbar />
      <Box sx={{ pb: isMobile ? 8 : 0, p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" data-testid="dashboard-title">Employer Performance Dashboard</Typography>
          <Button variant="outlined" onClick={handleDownloadPDF} data-testid="download-pdf-btn">
            Download PDF
          </Button>
        </Box>
        <div ref={dashboardRef} id="dashboard-pdf-content">
          {isLoading ? (
            <Grid container spacing={2}>
              {[...Array(4)].map((_, i) => (
                <Grid item xs={12} sm={6} md={3} key={i}>
                  <Skeleton variant="rectangular" height={100} />
                </Grid>
              ))}
            </Grid>
          ) : error ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography color="error">{error.message || 'Failed to load dashboard metrics'}</Typography>
            </Paper>
          ) : !metrics ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                No strategies or posts found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Once you or your team create strategies and posts, performance metrics will appear here.
              </Typography>
              <Button variant="contained" sx={{ mt: 2 }} href="/strategies">
                Create a Strategy
              </Button>
            </Paper>
          ) : (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle2">Total Strategies</Typography>
                    <Typography variant="h4" data-testid="dashboard-metric-total-strategies">{metrics.totalStrategies}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle2">Total Posts</Typography>
                    <Typography variant="h4" data-testid="dashboard-metric-total-posts">{metrics.totalPosts}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle2">Published</Typography>
                    <Typography variant="h4" data-testid="dashboard-metric-published">{metrics.publishedPosts}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle2">Failed</Typography>
                    <Typography variant="h4" data-testid="dashboard-metric-failed">{metrics.failedPosts}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle2">Pending</Typography>
                    <Typography variant="h4" data-testid="dashboard-metric-pending">{metrics.pendingPosts}</Typography>
                  </Paper>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2 }} data-testid="dashboard-pie-chart">
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>Post Status Distribution</Typography>
                    <PieChart
                      series={[{ data: postStatusData }]}
                      width={350}
                      height={250}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2 }} data-testid="dashboard-bar-chart">
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>Posts per Strategy</Typography>
                    <BarChart
                      xAxis={[{ data: barChartLabels, scaleType: 'band' }]}
                      series={[{ data: barChartData }]}
                      width={350}
                      height={250}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </>
          )}
        </div>
      </Box>
      <BottomNavigationMobile />
    </>
  );
}
