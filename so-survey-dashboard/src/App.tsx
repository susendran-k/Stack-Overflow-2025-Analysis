import React, { useState } from 'react';
import {
  ThemeProvider, createTheme, CssBaseline, Box, Container, Grid,
  Paper, Typography, Card, CardContent, Stack, Divider, List,
  ListItemButton, ListItemIcon, ListItemText, Chip, TextField, Button, ButtonGroup
} from '@mui/material';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, LineChart, Line
} from 'recharts';

// Icons
import PsychologyIcon from '@mui/icons-material/Psychology';
import StarsIcon from '@mui/icons-material/Stars';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StorageIcon from '@mui/icons-material/Storage';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import CalculateIcon from '@mui/icons-material/Calculate';

// --- THEME ---
const theme = createTheme({
  palette: {
    background: { default: '#FFF9FB', paper: '#FFFFFF' },
    primary: { main: '#FF2D75' },
    secondary: { main: '#7C4DFF' },
  },
  typography: { fontFamily: "'Inter', sans-serif" },
  components: {
    MuiPaper: { styleOverrides: { root: { borderRadius: 24, boxShadow: '0px 10px 40px rgba(255, 45, 117, 0.05)' } } }
  }
});

// --- DATA FROM YOUR 2025 ANALYSIS ---
const mainRoadmap = [
  { level: 'Junior', cloud: 37581, data: 31697, web: 9387 },
  { level: 'Mid', cloud: 44626, data: 36910, web: 30563 },
  { level: 'Senior', cloud: 64423, data: 56694, web: 51428 },
  { level: 'Expert', cloud: 90679, data: 81698, web: 78328 },
  { level: 'Veteran', cloud: 107951, data: 100180, web: 104236 },
];

const educationData = [
  { level: 'Junior', bachelors: 33000, masters: 49000 },
  { level: 'Mid', bachelors: 39000, masters: 51000 },
  { level: 'Senior', bachelors: 60000, masters: 67000 },
  { level: 'Expert', bachelors: 86000, masters: 85000 },
  { level: 'Veteran', bachelors: 115000, masters: 105000 },
];

export default function InternshipDashboard() {
  const [activeView, setActiveView] = useState('overview');

  // Predictor State
  const [selectedField, setSelectedField] = useState<'web' | 'data' | 'cloud'>('data');
  const [yearsExp, setYearsExp] = useState<number>(0);

  // Dynamic Prediction Logic based on your "Path" Analysis [cite: 16, 17, 52]
  const predictSalary = () => {
    // Ensuring no negative values
    const validYears = Math.max(0, yearsExp);

    // Base medians and estimated annual growth rates derived from your roadmap [cite: 16, 17]
    const configs = {
      web: { base: 9387, growth: 4700 },
      data: { base: 31697, growth: 3400 },
      cloud: { base: 37581, growth: 3500 }
    };

    const { base, growth } = configs[selectedField];
    return (base + (validYears * growth)).toLocaleString();
  };

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
  return (
    /* We use a vertical Stack to ensure the Title and Content are perfectly aligned */
    <Stack spacing={6} sx={{ width: '100%', alignItems: 'center' }}>

      {/* 1. KPI CARDS SECTION - Balanced 3-Column Layout */}
      <Grid container spacing={3} sx={{ width: '100%', maxWidth: 1200 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#FF2D75', color: 'white', height: '100%', borderRadius: 6 }}>
            <CardContent sx={{ p: 4 }}>
              <PsychologyIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h3" sx={{ fontWeight: 900 }}>16.3%</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>The AI Dividend</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Pay increase for using AI Agents.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, height: '100%', borderRadius: 6, textAlign: 'center' }}>
            <StarsIcon color="primary" sx={{ fontSize: 32, mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 900 }}>$37.5k</Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 700 }}>Cloud Junior Median</Typography>
            <Typography variant="caption">Requires prior IT background.</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, height: '100%', borderRadius: 6, textAlign: 'center' }}>
            <TrendingUpIcon sx={{ color: '#7C4DFF', fontSize: 32, mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 900 }}>22,121</Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 700 }}>Cleaned Profiles</Typography>
            <Typography variant="caption">Quantile Filtered (0.05-0.95).</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* 2. MAIN CHART SECTION - Centered and Wide */}
      <Paper sx={{
        p: 5,
        width: '100%',
        maxWidth: 1200,
        borderRadius: 8,
        boxShadow: '0px 20px 60px rgba(0,0,0,0.03)'
      }}>
        <Typography variant="h5" sx={{ mb: 4, fontWeight: 800, textAlign: 'center' }}>
          Market-Wide Career Trajectories (USD)
        </Typography>

        <Box sx={{ width: '100%', height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mainRoadmap} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCloud" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF2D75" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#FF2D75" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
              <XAxis
                dataKey="level"
                axisLine={false}
                tickLine={false}
                tick={{fill: '#999', fontSize: 12, fontWeight: 600}}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${v/1000}k`}
                tick={{fill: '#999', fontSize: 12}}
              />
              <Tooltip
                contentStyle={{ borderRadius: 15, border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              />
              <Legend verticalAlign="top" align="center" height={50} iconType="circle" />
              <Area
                type="monotone"
                dataKey="cloud"
                stroke="#FF2D75"
                strokeWidth={3}
                fill="url(#colorCloud)"
                name="Cloud & DevOps"
              />
              <Area
                type="monotone"
                dataKey="data"
                stroke="#7C4DFF"
                fill="none"
                strokeWidth={3}
                name="Data & AI"
              />
              <Area
                type="monotone"
                dataKey="web"
                stroke="#BBB"
                fill="none"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Web Dev"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
    </Stack>
  );

      case 'education':
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Education Impact Analysis</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                  Comparing Bachelor's vs. Master's degrees across career stages[cite: 63, 64].
                </Typography>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={educationData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="level" />
                    <YAxis tickFormatter={(v) => `$${v/1000}k`} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="masters" stroke="#7C4DFF" strokeWidth={4} name="Master's Degree" />
                    <Line type="monotone" dataKey="bachelors" stroke="#FF2D75" strokeWidth={4} name="Bachelor's Degree" />
                  </LineChart>
                </ResponsiveContainer>
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>Finding: The Experience Bridge</Typography>
                  <Typography variant="body1">
                    While a Master's degree offers a higher starting salary, specialized technical experience eventually bridges the gap in senior roles[cite: 64].
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        );

      case 'predictor':
  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // This centers the children horizontally
      py: 4
    }}>
      {/* HEADER SECTION - Already Centered */}
      <Stack spacing={2} alignItems="center" sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h2" sx={{ fontWeight: 950, letterSpacing: -2 }}>
          Interactive <span style={{ color: '#FF2D75' }}>Salary</span> Engine
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600 }}>
          Projecting 2025 market value based on verified field trajectories.
        </Typography>
      </Stack>

      {/* THE UPDATED CENTERED BOX */}
      <Paper sx={{
        p: { xs: 4, md: 8 },
        width: '100%',
        maxWidth: 900, // This keeps the box wide but controlled
        borderRadius: 10,
        boxShadow: '0px 30px 100px rgba(255, 45, 117, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        mx: 'auto' // Ensures it stays centered in the parent
      }}>

        {/* STEP 1: SELECT CAREER TRACK */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="overline" sx={{ fontWeight: 900, color: '#FF2D75', mb: 3, display: 'block', letterSpacing: 2 }}>
             SELECT CAREER TRACK
          </Typography>
          <Stack direction="row" spacing={3} justifyContent="center">
            {[
              { id: 'web', label: 'WEB DEV', icon: <CodeIcon /> },
              { id: 'data', label: 'DATA & AI', icon: <StorageIcon /> },
              { id: 'cloud', label: 'CLOUD/DEVOPS', icon: <CloudQueueIcon /> }
            ].map((field) => (
              <Button
                key={field.id}
                onClick={() => setSelectedField(field.id as any)}
                variant={selectedField === field.id ? 'contained' : 'outlined'}
                sx={{
                  width: 180, // Fixed width for symmetry
                  height: 140,
                  flexDirection: 'column',
                  borderRadius: 6,
                  borderWidth: 2,
                  '&:hover': { borderWidth: 2 }
                }}
              >
                <Box sx={{ transform: 'scale(1.5)', mb: 2 }}>{field.icon}</Box>
                <Typography variant="caption" sx={{ fontWeight: 800 }}>{field.label}</Typography>
              </Button>
            ))}
          </Stack>
        </Box>

        {/* STEP 2: YEARS OF EXPERIENCE */}
        <Box sx={{ textAlign: 'center', px: { md: 10 } }}>
          <Typography variant="overline" sx={{ fontWeight: 900, color: '#FF2D75', mb: 3, display: 'block', letterSpacing: 2 }}>
             YEARS OF EXPERIENCE
          </Typography>
          <TextField
            fullWidth
            type="number"
            value={yearsExp}
            onChange={(e) => setYearsExp(Number(e.target.value))}
            error={yearsExp < 0}
            inputProps={{
                min: 0,
                style: { textAlign: 'center', fontSize: '2.5rem', fontWeight: 900, padding: '30px' }
            }}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 6, bgcolor: '#FBFBFB' },
            }}
          />
        </Box>

        {/* THE RESULT BOX - Now inside the centered paper */}
        <Box sx={{
          mt: 2,
          p: 6,
          borderRadius: 8,
          background: 'linear-gradient(135deg, #FF2D75 0%, #7C4DFF 100%)',
          color: 'white',
          textAlign: 'center'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600, opacity: 0.8, mb: 1 }}>
            Projected Annual Salary
          </Typography>
          <Typography variant="h1" sx={{ fontWeight: 950, fontSize: '5rem' }}>
            ${yearsExp < 0 ? "0" : predictSalary()}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );

      default: return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* SIDEBAR */}
        <Box sx={{ width: 280, borderRight: '1px solid #EEE', p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 900, mb: 4, color: '#FF2D75' }}>STRATEGY 2025</Typography>
          <List>
            {[
              { id: 'overview', label: 'Overview', icon: <DashboardIcon /> },
              { id: 'education', label: 'Education Impact', icon: <SchoolIcon /> },
              { id: 'predictor', label: 'Salary Predictor', icon: <CalculateIcon /> }
            ].map((item) => (
              <ListItemButton
                key={item.id}
                selected={activeView === item.id}
                onClick={() => setActiveView(item.id)}
                sx={{ borderRadius: 3, mb: 1, '&.Mui-selected': { bgcolor: '#FF2D75', color: 'white', '& .MuiListItemIcon-root': { color: 'white' } } }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600 }} />
              </ListItemButton>
            ))}
          </List>
        </Box>

        {/* MAIN CONTENT AREA */}
        <Box sx={{ flexGrow: 1, p: 6 }}>
          <Container maxWidth="lg">
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 800 }}>Salary <span style={{color: '#FF2D75'}}>Intelligence</span></Typography>
              <Chip label="STACK OVERFLOW" color="primary" variant="outlined" />
            </Stack>
            {renderContent()}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}