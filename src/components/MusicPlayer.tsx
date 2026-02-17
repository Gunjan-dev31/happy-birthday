import React, { useEffect, useImperativeHandle, useRef, useState, forwardRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export interface MusicPlayerHandle {
  play: () => Promise<void>;
}

const MusicPlayer = forwardRef<MusicPlayerHandle, {}>((_, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  // Placeholder song. REPLACE with "Tere Hawale" direct link.
  const SONG_URL = "https://jumpshare.com/s/rppzJaCNKrSfq0fRjgYc"; 

  useImperativeHandle(ref, () => ({
    play: async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
        } catch (error) {
          console.error("Audio playback failed:", error);
        }
      }
    }
  }));

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio ref={audioRef} src={SONG_URL} loop preload="auto" />
      <button
        onClick={toggleMute}
        className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-full text-white hover:bg-white/20 transition-all shadow-lg hover:shadow-purple-500/50 group"
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6" />
        ) : (
          <div className="relative">
            <Volume2 className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
            </span>
          </div>
        )}
      </button>
    </div>
  );
});

MusicPlayer.displayName = 'MusicPlayer';

export default MusicPlayer;
