import React from 'react';
import HeroSection from '../components/HeroSection';
import TokenPerformance from '../components/TokenPerformance';
import StatisticsSection from '../components/StatisticsSection';

const HomePage = () => {
  return (
    <div className="pt-16">
      <HeroSection />
      <TokenPerformance />
      <StatisticsSection />
    </div>
  );
};

export default HomePage;