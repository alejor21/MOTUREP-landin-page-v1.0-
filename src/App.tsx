import { lazy, Suspense } from 'react';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { AnimatedBackground } from './components/AnimatedBackground';
import { ScrollProgress } from './components/ScrollProgress';
import { PageLoader } from './components/PageLoader';

// Lazy load heavy components
const Carousel3D = lazy(() => import('./components/Carousel3D').then(module => ({ default: module.Carousel3D })));
const FeaturesCarousel3D = lazy(() => import('./components/FeaturesCarousel3D').then(module => ({ default: module.FeaturesCarousel3D })));
const BentoGridInteractive = lazy(() => import('./components/BentoGridInteractive').then(module => ({ default: module.BentoGridInteractive })));
const StatsSection = lazy(() => import('./components/StatsSection').then(module => ({ default: module.StatsSection })));
const FeaturesScroll = lazy(() => import('./components/FeaturesScroll').then(module => ({ default: module.FeaturesScroll })));
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection').then(module => ({ default: module.TestimonialsSection })));
const CTASection = lazy(() => import('./components/CTASection').then(module => ({ default: module.CTASection })));
const Footer = lazy(() => import('./components/Footer').then(module => ({ default: module.Footer })));
const CustomCursor = lazy(() => import('./components/CustomCursor').then(module => ({ default: module.CustomCursor })));
const EasterEggs = lazy(() => import('./components/EasterEggs').then(module => ({ default: module.EasterEggs })));
const BackToTop = lazy(() => import('./components/BackToTop').then(module => ({ default: module.BackToTop })));
const SectionIndicators = lazy(() => import('./components/SectionIndicators').then(module => ({ default: module.SectionIndicators })));
const AchievementBadges = lazy(() => import('./components/AchievementBadges').then(module => ({ default: module.AchievementBadges })));

// Loading component optimizado
const LoadingFallback = () => (
  <div className="w-full h-32 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
  </div>
);

export default function App() {
  return (
    <>
      <PageLoader />
      <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
        <AnimatedBackground />

        <Suspense fallback={null}>
          <CustomCursor />
          <EasterEggs />
        </Suspense>

        <ScrollProgress />

        <Suspense fallback={null}>
          <BackToTop />
          <SectionIndicators />
          <AchievementBadges />
        </Suspense>

        <div className="relative z-10">
          <Navbar />
          <HeroSection />

          <Suspense fallback={<LoadingFallback />}>
            <Carousel3D />
          </Suspense>

          <Suspense fallback={<LoadingFallback />}>
            <FeaturesCarousel3D />
          </Suspense>

          <Suspense fallback={<LoadingFallback />}>
            <BentoGridInteractive />
          </Suspense>

          <Suspense fallback={<LoadingFallback />}>
            <StatsSection />
          </Suspense>

          <Suspense fallback={<LoadingFallback />}>
            <TestimonialsSection />
          </Suspense>

          <Suspense fallback={<LoadingFallback />}>
            <FeaturesScroll />
          </Suspense>

          <Suspense fallback={<LoadingFallback />}>
            <CTASection />
          </Suspense>

          <Suspense fallback={<LoadingFallback />}>
            <Footer />
          </Suspense>
        </div>
      </div>
    </>
  );
}