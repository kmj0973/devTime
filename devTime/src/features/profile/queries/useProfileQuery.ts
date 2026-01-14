import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { requestCreateProfile, requestGetProfile } from '../api/requests';
import type { ProfileType } from '../model/types';

export const useProfileQuery = () => {
  const queryClient = useQueryClient();

  const { data: profile, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: () => requestGetProfile(),
  });

  const createProfile = useMutation({
    mutationFn: (data: ProfileType) => requestCreateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  return { profile, refetch };
};
