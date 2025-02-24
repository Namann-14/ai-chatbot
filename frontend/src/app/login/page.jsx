// "use client";
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');
    
//     try {
//       const response = await fetch('http://localhost:5000/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });
      
//       const data = await response.json();
      
//       if (response.ok) {
//         // If login is successful, redirect to Google
//         window.location.href = 'https://chat-chat-production-2cfa.up.railway.app/';
//       } else {
//         setError(data.message || 'Login failed. Please try again.');
//       }
//     } catch (err) {
//       setError('Connection error. Please try again later.');
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-screen w-full items-center justify-center bg-gradient-to-b from-[rgb(201,222,244)] via-[rgb(245,204,212)] to-[rgb(184,164,201)]">
//       <div className="relative w-full max-w-md px-6">
//         {/* Floating elements for visual interest */}
//         <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-white/10 backdrop-blur-lg"></div>
//         <div className="absolute top-40 -right-12 h-24 w-24 rounded-full bg-white/10 backdrop-blur-lg"></div>
//         <div className="absolute -bottom-16 left-20 h-40 w-40 rounded-full bg-white/10 backdrop-blur-lg"></div>
        
//         {/* Card with glassmorphism effect */}
//         <div className="relative overflow-hidden rounded-2xl bg-white/20 p-8 backdrop-blur-xl">
//           <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-pink-300/30"></div>
          
//           <div className="relative z-10">
//             <h1 className="mb-6 text-center text-3xl font-bold text-white">Welcome Back</h1>
            
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="space-y-2">
//                 <label htmlFor="email" className="text-sm font-medium text-white">
//                   Email
//                 </label>
//                 <div className="relative">
//                   <input
//                     id="email"
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full rounded-lg bg-white/10 p-3 pl-4 text-white placeholder-white/60 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/50"
//                     placeholder="you@example.com"
//                     required
//                   />
//                 </div>
//               </div>
              
//               <div className="space-y-2">
//                 <div className="flex justify-between">
//                   <label htmlFor="password" className="text-sm font-medium text-white">
//                     Password
//                   </label>
//                   <a href="#" className="text-sm text-white/80 hover:text-white">
//                     Forgot password?
//                   </a>
//                 </div>
//                 <div className="relative">
//                   <input
//                     id="password"
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full rounded-lg bg-white/10 p-3 pl-4 text-white placeholder-white/60 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/50"
//                     placeholder="••••••••"
//                     required
//                   />
//                 </div>
//               </div>
              
//               {error && (
//                 <div className="rounded-md bg-red-500/20 p-3 text-center text-sm text-white">
//                   {error}
//                 </div>
//               )}
              
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full rounded-lg bg-white p-3 text-center font-medium text-purple-600 shadow-lg transition-all hover:bg-opacity-90 disabled:opacity-70"
//               >
//                 {isLoading ? (
//                   <span className="flex items-center justify-center">
//                     <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                     </svg>
//                     Processing...
//                   </span>
//                 ) : (
//                   'Sign in'
//                 )}
//               </button>
//             </form>
            
//             <div className="mt-6 text-center">
//               <p className="text-sm text-white/70">
//                 Don't have an account?{' '}
//                 <a href="#" className="font-medium text-white hover:underline">
//                   Sign up
//                 </a>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://render-backend-r4ng.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // If login is successful, redirect to Google
        window.location.href = 'https://chit-chat-git-master-jatin-l1s-projects.vercel.app/';
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-b from-[rgb(201,222,244)] via-[rgb(245,204,212)] to-[rgb(184,164,201)]">
      <div className="relative w-full max-w-md px-6">
        {/* Floating elements for visual interest */}
        <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-white/10 backdrop-blur-lg"></div>
        <div className="absolute top-40 -right-12 h-24 w-24 rounded-full bg-white/10 backdrop-blur-lg"></div>
        <div className="absolute -bottom-16 left-20 h-40 w-40 rounded-full bg-white/10 backdrop-blur-lg"></div>
        
        {/* Card with glassmorphism effect */}
        <div className="relative overflow-hidden rounded-2xl bg-white/20 p-8 backdrop-blur-xl">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-pink-300/30"></div>
          
          <div className="relative z-10">
            <h1 className="mb-6 text-center text-3xl font-bold text-white">Welcome Back</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-white">
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg bg-white/10 p-3 pl-4 text-white placeholder-white/60 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-white">
                    Password
                  </label>
                  <a href="#" className="text-sm text-white/80 hover:text-white">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg bg-white/10 p-3 pl-4 text-white placeholder-white/60 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              
              {error && (
                <div className="rounded-md bg-red-500/20 p-3 text-center text-sm text-white">
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-white p-3 text-center font-medium text-purple-600 shadow-lg transition-all hover:bg-opacity-90 disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-white/70">
                Don't have an account?{' '}
                <a href="#" className="font-medium text-white hover:underline">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}