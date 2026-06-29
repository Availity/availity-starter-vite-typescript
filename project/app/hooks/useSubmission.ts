import { useQuery } from '@tanstack/react-query';

type Submission = {
  id: string;
  status: string;
  submittedAt: string;
};

// Replace with your actual API call
const fetchSubmission = async (): Promise<Submission> => {
  // Simulated API response for demonstration
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 500);
  });
  return {
    id: `REF-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    status: 'Received',
    submittedAt: new Date().toLocaleString(),
  };
};

export const useSubmission = () =>
  useQuery({
    queryKey: ['submission'],
    queryFn: fetchSubmission,
  });
