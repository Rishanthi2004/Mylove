import React, { useState, useRef, useEffect } from 'react';
import { Lock, Unlock, Heart, Sparkles, X, Check, Eye, EyeOff } from 'lucide-react';

export const SecretLoveLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const letterRef = useRef<HTMLDivElement | null>(null);

  const SECRET_PASSWORD = '1420';

  const handleOpenEnvelopeClick = () => {
    if (isUnlocked) {
      setIsOpen(true);
      setTimeout(() => {
        letterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      setPin('');
      setErrorMsg('');
      setIsPasswordModalOpen(true);
    }
  };

  const handlePinDigit = (digit: string) => {
    if (pin.length >= 4) return;
    const newPin = pin + digit;
    setPin(newPin);
    setErrorMsg('');

    if (newPin.length === 4) {
      if (newPin === SECRET_PASSWORD) {
        setIsUnlocked(true);
        setTimeout(() => {
          setIsPasswordModalOpen(false);
          setIsOpen(true);
          setTimeout(() => {
            letterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 200);
        }, 400);
      } else {
        setTimeout(() => {
          setErrorMsg('Wrong password! Only my Rahman knows our code 🥺💜');
          setPin('');
        }, 300);
      }
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
    setErrorMsg('');
  };

  const handleCloseLetter = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative mt-8 pt-5 pb-6 px-4 rounded-3xl bg-gradient-to-b from-[#18092f]/90 via-[#1f0a3d]/95 to-[#100320] border border-purple-500/30 shadow-[0_4px_30px_rgba(168,85,247,0.22)] overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-purple-600/15 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-pink-600/15 rounded-full filter blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center relative z-10 mb-4">
        <div className="inline-flex items-center justify-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-300 text-[11px] font-medium backdrop-blur-sm mb-1.5">
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span>Secret Love Note</span>
          <span className="text-xs">💌</span>
        </div>
        <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight drop-shadow-[0_0_15px_rgba(233,213,255,0.7)]">
          A Letter For Rahman
        </h3>
        <p className="text-xs text-purple-300/70 font-sans mt-0.5">
          From your Karavachi with endless love ❤️
        </p>
      </div>

      {/* Sealed Envelope (Closed State) */}
      {!isOpen && (
        <div className="relative z-10 flex flex-col items-center">
          <button
            onClick={handleOpenEnvelopeClick}
            className="group relative w-full max-w-sm rounded-2xl p-6 bg-gradient-to-br from-[#2a114f] via-[#1e0b38] to-[#120524] border-2 border-purple-400/40 hover:border-purple-300 shadow-[0_10px_35px_rgba(147,51,234,0.35)] active:scale-[0.98] transition-all text-center flex flex-col items-center justify-center cursor-pointer"
          >
            {/* Envelope Flap Accent */}
            <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-purple-500/20 to-transparent rounded-t-2xl pointer-events-none" />

            {/* Glowing Wax Seal */}
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-pink-600 via-purple-600 to-indigo-600 p-0.5 shadow-[0_0_20px_rgba(236,72,153,0.6)] group-hover:scale-110 transition-transform mb-3 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#1b0733] flex items-center justify-center">
                <Lock className="w-7 h-7 text-pink-300 group-hover:text-pink-200 transition-colors" />
              </div>
              <span className="absolute -top-1 -right-1 text-xs">✨</span>
            </div>

            <span className="font-display text-base font-semibold text-white mb-1">
              Secret Locked Letter
            </span>

            <span className="text-xs text-purple-300/80 font-sans flex items-center gap-1.5">
              <span>Touch to open</span>
              <span className="text-purple-400 font-bold">•</span>
              <span className="text-pink-300">Password required 🔒</span>
            </span>
          </button>
        </div>
      )}

      {/* Opened Love Letter Content */}
      {isOpen && (
        <div
          ref={letterRef}
          className="relative z-10 animate-fade-in max-w-md mx-auto rounded-2xl bg-[#fffefc] text-slate-800 p-5 sm:p-6 shadow-[0_0_40px_rgba(168,85,247,0.4)] border border-purple-300/60 transition-all selection:bg-pink-100"
          style={{
            backgroundImage:
              'radial-gradient(#f3e8ff 1px, transparent 1px), linear-gradient(to bottom, #ffffff, #faf5ff)',
            backgroundSize: '20px 20px, 100% 100%',
          }}
        >
          {/* Top Letter Header Banner */}
          <div className="flex items-start justify-between border-b border-purple-200/70 pb-3 mb-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-700 tracking-wide uppercase">
                <span>💌 Special Love Letter</span>
              </div>
              <h4 className="font-display text-xl sm:text-2xl font-bold text-purple-950 mt-1 leading-snug">
                Hey Rahman, This Is Your Baby
              </h4>
              <p className="font-script text-base text-pink-600 mt-0.5">
                To my Rahman, from your Karavachi… ❤️
              </p>
            </div>

            <button
              onClick={handleCloseLetter}
              className="p-1.5 rounded-full bg-purple-100/80 hover:bg-purple-200 text-purple-700 transition-colors"
              title="Close Letter"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Letter Body Text */}
          <div className="space-y-4 font-sans text-sm text-slate-700 leading-relaxed">
            <p>
              Hey Rahman, this is your baby,<br />
              The one who loves you more than words can say.<br />
              The one who dreams of holding your hand,<br />
              And walking beside you every single day. 💗
            </p>

            <p>
              Thank you for coming into my life,<br />
              For making ordinary moments feel so beautiful.<br />
              You became a part of my little world,<br />
              And made my days feel a little more meaningful. 🥹💜
            </p>

            <p>
              Can you believe it, my love?<br />
              I think we've completed one beautiful year.<br />
              A year of memories, smiles, and little moments<br />
              That I'll always hold so dear. ♾️
            </p>

            <p>
              But baby, this is only the beginning.<br />
              We have so many years left to go.<br />
              So many places we haven't visited,<br />
              So many beautiful memories left to grow. 🌍💕
            </p>

            <p>
              I have so many dreams with you, Rahman.<br />
              Little dreams and dreams that reach the sky.<br />
              A beautiful home, a thousand adventures,<br />
              And a lifetime of standing side by side. 🏡✨
            </p>

            <p>
              I want to see your dreams come true,<br />
              And celebrate every little victory with you.<br />
              I want us to grow, to learn, and to shine,<br />
              While building a future that's yours and mine. 💫
            </p>

            <p>
              And my Karavachi heart has one little wish—<br />
              That no matter where life takes us,<br />
              We never stop choosing kindness, understanding,<br />
              And making beautiful memories together. 💜
            </p>

            <p>
              Thank you for being a part of my story.<br />
              Thank you for every moment we've shared.<br />
              Thank you for coming into my life, Rahman,<br />
              And for all the dreams we have yet to dare. 🥹❤️
            </p>

            <div className="pt-2 border-t border-purple-200/80">
              <p className="font-semibold text-purple-900">
                One year down, a lifetime of dreams to go. ♾️
              </p>
            </div>

            <p>
              Here's to our next chapter,<br />
              To all the places we'll see,<br />
              To all the dreams we'll make come true,<br />
              And to the future of you and me. 💍✨
            </p>

            <div className="pt-3 text-right">
              <p className="font-script text-xl text-pink-700">
                Forever your Karavachi,
              </p>
              <p className="font-display font-bold text-sm text-purple-950 mt-0.5">
                Your Baby loves you so much, Rahman. ❤️🫂
              </p>
            </div>
          </div>

          {/* Letter Footer Actions */}
          <div className="mt-6 pt-3 border-t border-purple-200/70 flex items-center justify-between">
            <span className="text-[11px] text-purple-600 font-sans">
              Completed 1 Beautiful Year ♾️
            </span>
            <button
              onClick={handleCloseLetter}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-900 text-white text-xs font-semibold shadow hover:bg-purple-800 transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Seal Letter</span>
            </button>
          </div>
        </div>
      )}

      {/* Password Modal (PIN: 1420) */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#190730] border-2 border-purple-500/50 rounded-3xl p-6 max-w-xs w-full shadow-2xl relative text-center">
            <button
              onClick={() => setIsPasswordModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-black/40 text-purple-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lock Icon */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 mx-auto flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.5)] mb-3">
              <Lock className="w-7 h-7 text-white" />
            </div>

            <h4 className="font-display text-lg font-bold text-white mb-1">
              Enter Secret Code 🔒
            </h4>
            <p className="text-xs text-purple-200/70 font-sans mb-4">
              Enter the 4-digit password to unlock your baby's letter
            </p>

            {/* PIN Code Dots Display */}
            <div className="flex items-center justify-center gap-3 mb-4">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                    pin.length > idx
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 border-pink-400 shadow-[0_0_10px_#ec4899] scale-110'
                      : 'border-purple-500/40 bg-purple-950/40'
                  }`}
                />
              ))}
            </div>

            {/* Error Message */}
            {errorMsg && (
              <p className="text-xs text-pink-400 font-medium mb-3 animate-shake">
                {errorMsg}
              </p>
            )}

            {/* Numeric Keypad for Mobile Convenience */}
            <div className="grid grid-cols-3 gap-2.5 max-w-[220px] mx-auto mb-2">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handlePinDigit(num)}
                  className="h-11 rounded-xl bg-purple-950/70 border border-purple-500/30 text-white font-bold text-lg hover:bg-purple-900 active:scale-95 transition-all shadow-sm flex items-center justify-center"
                >
                  {num}
                </button>
              ))}
              <div />
              <button
                type="button"
                onClick={() => handlePinDigit('0')}
                className="h-11 rounded-xl bg-purple-950/70 border border-purple-500/30 text-white font-bold text-lg hover:bg-purple-900 active:scale-95 transition-all shadow-sm flex items-center justify-center"
              >
                0
              </button>
              <button
                type="button"
                onClick={handleBackspace}
                className="h-11 rounded-xl bg-purple-950/40 border border-purple-500/20 text-purple-300 font-medium text-xs hover:bg-purple-900 active:scale-95 transition-all flex items-center justify-center"
              >
                Del
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
