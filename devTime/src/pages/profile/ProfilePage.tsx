import ProfileForm from '@/features/profile/ui/ProfileForm';
import Logo from '../signup/ui/svg/Logo';

export default function ProfilePage() {
  return (
    <div className='min-h-screen flex'>
      <div className='bg-primary flex-1 flex justify-center items-center'>
        <Logo />
      </div>
      <ProfileForm />
    </div>
  );
}
