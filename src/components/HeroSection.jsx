import React, { useState } from 'react';
import { Mail, Users } from 'lucide-react';
import { validateEmail } from '../types';

const HeroSection = ({ totalUsers, onSignup }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');

    if (!email) {
      setEmailError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onSignup(email);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="min-h-screen gradient-bg flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
            Get Early Access &<br />
            <span className="bg-gradient-to-r from-primary-600 to-success-600 bg-clip-text text-transparent">
              Unlock Daily Rewards
            </span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 mb-8 font-semibold">
            Win up to <span className="text-gold-500">$10,000</span>
          </p>
        </div>

        <div className="card max-w-md mx-auto mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`input-field pl-10 ${emailError ? 'border-red-500' : ''}`}
                  required
                />
              </div>
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Joining...' : 'Join Waitlist'}
            </button>
          </form>
        </div>

        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <Users className="w-5 h-5" />
          <span className="text-lg font-semibold">
            {totalUsers.toLocaleString()} people in line
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;