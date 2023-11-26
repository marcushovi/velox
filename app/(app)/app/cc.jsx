// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { signIn, signOut, useSession, getProviders } from "next-auth/react";

// const Nav = () => {
//   const { data: session } = useSession();

//   const [providers, setProviders] = useState(null);
//   const [toggleDropdown, setToggleDropdown] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const res = await getProviders();
//       setProviders(res);
//     })();
//   }, []);

//   return (
//     <nav className='flex-between w-full mb-16 pt-3'>
//       <Link href='/' className='flex gap-2 flex-center'>
//         <Image
//           src='/assets/images/velox.svg'
//           alt='logo'
//           width={100}
//           height={30}
//           className='object-contain'
//         />
//       </Link>

//       {/* Mobile Navigation */}
//       <div className='flex relative'>
//         {session?.user ? (
//           <div className='flex'>
//             <Image
//               src={session?.user.image}
//               width={37}
//               height={37}
//               className='rounded-full'
//               alt='profile'
//               onClick={() => setToggleDropdown(!toggleDropdown)}
//             />

//             {toggleDropdown && (
//               <div className='dropdown'>
//                 <button
//                   type='button'
//                   onClick={() => {
//                     setToggleDropdown(false);
//                     signOut();
//                   }}
//                   className=' w-full black_btn'
//                 >
//                   Sign Out
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <>
//             {providers &&
//               Object.values(providers).map((provider) => (
//                 <button
//                   type='button'
//                   key={provider.name}
//                   onClick={() => {
//                     signIn(provider.id);
//                   }}
//                   className='black_btn'
//                 >
//                   Sign in
//                 </button>
//               ))}
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Nav;
