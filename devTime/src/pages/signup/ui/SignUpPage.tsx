import SignUpForm from '@/features/signup/ui/SignUpForm';
import Logo from './svg/Logo';

export default function SignUpPage() {
  return (
    <div className='h-screen flex'>
      <div className='bg-primary flex-1 flex justify-center items-center'>
        <Logo />
      </div>
      <SignUpForm />
    </div>
  );
}
