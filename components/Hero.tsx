"use client"
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useSession } from '@clerk/nextjs';

function Hero() {
  const router = useRouter();
  const { session } = useSession();

  // Check if user is signed in
  const userIsSignedIn = session && session.user;

  const handleButtonClick = () => {
    if (userIsSignedIn) {
      router.push('/OnBoarding');
    } else {
      router.push('/sign-in'); // Redirect to sign-in page if not signed in
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-400 to-yellow-300 h-[85vh] relative w-full bg-cover mt-[2px] overflow-hidden text-white">
      <div className='flex h-full items-center justify-center pt-[82px] gap-20 w-[90%] mx-auto max-w-[1450px]'>
        <div className='grid items-center gap-6 md:grid-cols-2'>
          <img
            src="/kanban.png"
            alt='product image'
            className='mx-auto rounded-xl order-last md:min-w-[800px] min-w-[500px] md:h-[500px] max-sm:px-5'
            width={800}
            height={500}
          />
          <div className='flex flex-col justify-center max-md:items-center space-y-4 max-md:text-center'>
            <div className='space-y-2'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl'>
                Visualize Success Daily
              </h2>
              <p className='max-w-[500px] md:text-xl text-gray-100'>
                Take control of your project with our simple but powerful kanban board.
              </p>
            </div>
            <Button onClick={handleButtonClick} className='w-[150px]'>
              {userIsSignedIn ? 'Start Planning Now' : 'Sign In to Get Started'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;

