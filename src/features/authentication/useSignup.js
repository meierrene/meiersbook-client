import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export const useSignup = () => {
  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: user => {
      console.log(user);
      toast.success(
        "Account successfully created! Please verify your account the new account from the user's email address."
      );
    },
    onError: err => {
      let errorMessage = err.message;
      if (errorMessage.includes('E11000'))
        errorMessage =
          'This E-mail already exists. Please try another email address or login with this email address.';
      else if (errorMessage.includes('shorter'))
        errorMessage = 'The password must have a minimun of 8 characters.';
      else if (errorMessage.includes('passwordConfirm'))
        errorMessage = 'The confirmation of you password does not match.';
      else errorMessage = 'Could not signup. Please try again later.';
      toast.error(errorMessage);
    },
  });

  return { signup, isLoading };
};
