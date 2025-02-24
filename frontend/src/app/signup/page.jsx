"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess('Account created successfully! Redirecting to login...');
        // Redirect to login page after successful registration
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setError(data.message || 'Registration failed. Please try again.');
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
        <div className="absolute -top-20 -right-10 h-36 w-36 rounded-full bg-white/10 backdrop-blur-lg"></div>
        <div className="absolute top-40 -left-16 h-28 w-28 rounded-full bg-white/10 backdrop-blur-lg"></div>
        <div className="absolute -bottom-20 right-12 h-44 w-44 rounded-full bg-white/10 backdrop-blur-lg"></div>
        
        {/* Card with glassmorphism effect */}
        <div className="relative overflow-hidden rounded-2xl bg-white/20 p-8 backdrop-blur-xl">
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-purple-300/30"></div>
          
          <div className="relative z-10">
            <h1 className="mb-6 text-center text-3xl font-bold text-white">Create Account</h1>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-white">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg bg-white/10 p-3 pl-4 text-white placeholder-white/60 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
              
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
                <label htmlFor="password" className="text-sm font-medium text-white">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg bg-white/10 p-3 pl-4 text-white placeholder-white/60 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="••••••••"
                    required
                    minLength="6"
                  />
                </div>
                <p className="text-xs text-white/70">Password must be at least 6 characters</p>
              </div>
              
              {error && (
                <div className="rounded-md bg-red-500/20 p-3 text-center text-sm text-white">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="rounded-md bg-green-500/20 p-3 text-center text-sm text-white">
                  {success}
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
                    Creating account...
                  </span>
                ) : (
                  'Sign up'
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-white/70">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-white hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}