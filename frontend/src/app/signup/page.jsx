"use client";
import { useState ,useEffect} from 'react';
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

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => console.log("Razorpay script loaded");
    document.body.appendChild(script);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await fetch('https://render-backend-r4ng.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess('Account created successfully! Redirecting to payment...');
        initiatePayment(data.userId);
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

  const initiatePayment = async (userId) => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currency: 'INR', userId }),
      });
      if (!window.Razorpay) {
        console.error("Razorpay SDK not loaded");
        return;
      }
      

      const orderData = await response.json();

      if (response.ok) {
        const options = {
          key: 'rzp_test_HPzBzMtZuoJe2A', // Replace with your Razorpay Key ID
          amount: 2000 * 100, // Convert amount to paise
          currency: 'INR',
          name: 'AI 360',
          description: 'Signup Payment',
          order_id:  orderData.order.id,
          callback_url: "http://localhost:3001/api/auth/paymentverification",
          handler: async function (response) {
            // Handle the success case (e.g., verify payment)
            await verifyPayment(response, userId);
          },
          prefill: {
            name: name,
            email: email,
          },
          theme: { color: '#3399cc' },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        setError(orderData.message || 'Payment initiation failed.');
      }
    } catch (err) {
      setError('Error initiating payment.');
      console.error(err);
    }
  };

  const verifyPayment = async (paymentResponse, userId) => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/paymentverification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  razorpay_payment_id: paymentResponse.razorpay_payment_id,
          razorpay_order_id: paymentResponse.razorpay_order_id, // ✅ Include this
          razorpay_signature: paymentResponse.razorpay_signature,}),
      });
    
      const data = await response.json();
      if (response.ok) {
        setSuccess('Payment successful! Redirecting...');
        setTimeout(() => {
          router.push(`/login`);
        }, 2000);
      } else {
        setError(data.message|| 'Payment verification failed.');
      }
    } catch (err) {
      setError('Error verifying payment.');
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-b from-[rgb(201,222,244)] via-[rgb(245,204,212)] to-[rgb(184,164,201)]">
      <div className="relative w-full max-w-md px-6">
        <div className="relative overflow-hidden rounded-2xl bg-white/20 p-8 backdrop-blur-xl">
          <h1 className="mb-6 text-center text-3xl font-bold text-white">Create Account</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-white">Full Name</label>
              <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg bg-white/10 p-3 pl-4 text-white placeholder-white/60 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/50" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-white">Email</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg bg-white/10 p-3 pl-4 text-white placeholder-white/60 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/50" placeholder="you@example.com" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-white">Password</label>
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg bg-white/10 p-3 pl-4 text-white placeholder-white/60 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/50" placeholder="••••••••" required minLength="6" />
            </div>
            {error && <div className="rounded-md bg-red-500/20 p-3 text-center text-sm text-white">{error}</div>}
            {success && <div className="rounded-md bg-green-500/20 p-3 text-center text-sm text-white">{success}</div>}
            <button type="submit" disabled={isLoading} className="w-full rounded-lg bg-white p-3 text-center font-medium text-purple-600 shadow-lg transition-all hover:bg-opacity-90 disabled:opacity-70">
              {isLoading ? "Processing..." : "Sign up & Pay"}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-white/70">
              Already have an account? <Link href="/login" className="font-medium text-white hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
