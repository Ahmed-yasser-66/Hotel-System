import { useMutation } from '@tanstack/react-query';
import { signUp as signUpApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useSignup() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signUpApi({ fullName, email, password }),

    onSuccess: (user) => {
      console.log(user);
      toast.success(
        'Account created successfully , Please check the provided email inbox to activate your account'
      );
    },
  });

  return { signUp, isLoading };
}
