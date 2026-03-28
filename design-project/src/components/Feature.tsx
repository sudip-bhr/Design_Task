import React from 'react';
import { FeatureCard } from './FeatureCard';

const featuresData = [
  {
    id: 'clarity',
    title: 'Start with Clarity',
    subtitle: 'Step into a better learning path.',
    description: "Overwhelmed by too many learning options? SkillShikshya provides a clear, curated roadmap from the start. Whether you're a beginner or upskilling, we have a path tailored to your growth.",
    bgDefault: '#e8706f',
    bgHover: '#F45B5B',
    alignment: 'right' as const,
    illustrationSrc: '/Group 2.svg',
    hoverText: 'Clarity unlocked— stickers, sips, and skills all in one go!',
    hoverButtonText: 'Check out roadmap',
    hoverImages: ['/image.png'],
    uiType: 'image' as const,
  },
  {
    id: 'learn',
    title: 'Learn by Doing',
    subtitle: 'Practical skills, real projects.',
    description: 'Theory is great, but action is better. At SkillShikshya, you learn by doing. Hands-on projects and real-world scenarios help you build, break, and create—leading to true mastery.',
    bgDefault: '#6ba3af',
    bgHover: '#5492A0',
    alignment: 'left' as const,
    illustrationSrc: '/Group.svg',
    hoverText: 'Laptops, lessons, and a whole lot of growth!',
    hoverButtonText: 'Explore projects',
    hoverImages: ['/image2.png', '/image3.png'],
    uiType: 'image' as const,
  },
  {
    id: 'mentor',
    title: 'Get Mentored & Supported',
    subtitle: "You're not learning alone.",
    description: "Stuck or need feedback? SkillShikshya's community of mentors and learners has your back with live support, interactive discussions, and expert insights. You're never on your own.",
    bgDefault: '#8079b5',
    bgHover: '#6C64A8',
    alignment: 'right' as const,
    illustrationSrc: '/Group 4.svg',
    hoverText: "Stuck or need feedback? SkillShikshya's community of mentors and learners has your back.",
    hoverButtonText: 'Join community',
    hoverImageSrc: '/image3.png',
    uiType: 'avatars' as const,
  },
  {
    id: 'achieve',
    title: 'Achieve & Showcase',
    subtitle: 'Build your portfolio, get job-ready.',
    description: 'Your journey ends with achievement. Each completed project builds a portfolio showcasing your skills and job readiness, bringing you closer to that dream job, promotion, or your own venture.',
    bgDefault: '#b39b74',
    bgHover: '#A68A61',
    alignment: 'left' as const,
    illustrationSrc: '/Group 3.svg',
    hoverText: 'Achieve your goals and showcase your skills with our portfolio-ready projects and certifications.',
    hoverButtonText: 'View alumni work',
    hoverImages: ['/image.png'],
    uiType: 'image' as const,
  },
];

export const Feature: React.FC = () => {
  return (
    <section className="w-full py-12 md:py-16 px-4 md:px-8 lg:px-16 flex justify-center bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-[1300px] w-full">
        {featuresData.map((feature, index) => (
          <FeatureCard key={feature.id} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
};
