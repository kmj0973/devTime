import BackgroundLogo from './svg/BackgroundLogo';
import LoginForm from '@/features/auth/ui/LoginForm';

export default function LoginPage() {
  return (
    <div className='relative h-screen flex justify-center items-center'>
      <BackgroundLogo />
      <LoginForm />
    </div>
  );
}
