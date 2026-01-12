import { NavBar } from '@/widgets/navBar/ui/NavBar';
import HeatMap from './item/HeatMap';
import StudyLogDiv from './item/StudyLogDiv';
import StatsContainer from './StatsContainer';

export default function DashboardContainer() {
  return (
    <div className=' w-full items-center bg-linear-to-b from-[#F6F7F9] to-[#E9ECF5] pt-4 pb-12'>
      <NavBar />
      <div className='grid grid-cols-3 gap-4 max-w-[1200px] mx-auto mt-10'>
        <StatsContainer />

        <HeatMap />
        <StudyLogDiv />
      </div>
    </div>
  );
}
