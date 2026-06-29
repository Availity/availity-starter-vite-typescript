import { Alert, Card, CardHeader, CardContent, Grid, Typography, Button, Stack, CircularProgress } from '@availity/element';
import { useNavigate } from 'react-router-dom';
import { useSubmission } from '@/hooks/useSubmission';

export const Response = () => {
  const navigate = useNavigate();
  const { data: submission, isLoading } = useSubmission();

  if (isLoading) return <CircularProgress />;

  return (
    <>
      <Alert severity="success">Your request has been submitted.</Alert>
      <Card sx={{ mt: 3 }}>
        <CardHeader title="Submission Details" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="subtitle2">Reference ID</Typography>
              <Typography>{submission?.id}</Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="subtitle2">Status</Typography>
              <Typography>{submission?.status}</Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="subtitle2">Submitted At</Typography>
              <Typography>{submission?.submittedAt}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Stack direction="row" justifyContent="flex-end" mt={3}>
        <Button onClick={() => navigate('/')} color="primary">New Request</Button>
      </Stack>
    </>
  );
};
