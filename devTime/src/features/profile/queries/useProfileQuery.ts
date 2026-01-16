import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { requestCreateProfile, requestGetProfile, requestUpdateProfile } from '../api/requests';
import type { ProfileType, UpdateProfileType } from '../model/types';

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
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: (error) => console.log(error.message),
  }).mutateAsync;

  const updateProfile = useMutation({
    mutationFn: (data: UpdateProfileType) => requestUpdateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: (error) => console.log(error.message),
  }).mutateAsync;

  return { profile, refetch, createProfile, updateProfile };
};
