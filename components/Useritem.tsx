import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Useritem() {
  return (
    <div className='flex items-center justify-center p-2'>
      <Link href="/" className="avatar rounded-full bg-emerald-500 flex items-center justify-center">
        <Image
          src="/FrmLogo.png" 
          alt="Logo"
          width={500} 
          height={80} 
          className="rounded"
        />
      </Link>
    </div>
  );
}

export default Useritem;
