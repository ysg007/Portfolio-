'use client';
import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
const LoadingScreen = dynamic(() => import('./components/LoadingScreen'), { ssr: false });
const VideoIntro   = dynamic(() => import('./components/VideoIntro'),    { ssr: false });
const CustomCursor = dynamic(() => import('./components/CustomCursor'),  { ssr: false });
export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const handleDone = useCallback(() => setLoaded(true), []);
  return (
    <>
      <CustomCursor />
      {!loaded && <LoadingScreen onDone={handleDone} />}
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease' }}>
        <VideoIntro />
      </div>
    </>
  );
}
