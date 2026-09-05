"use client";

import React, { useState, useRef } from "react";
import { Volume2, VolumeX, Send, ChevronLeft, ChevronRight } from "lucide-react";

// Section 3: Live Deployments Data
const LIVE_LINKS = [
  { 
    id: 1, 
    title: 'Meshpoint Core', 
    category: 'Infrastructure', 
    url: 'https://meshpointsystems.com', 
    tag: 'Live',
    image: '/meshpoint-core.jpeg'
  },
  { 
    id: 2, 
    title: 'Data Pipeline', 
    category: 'Analytics', 
    url: 'https://meshpointsystems.com', 
    tag: 'Active',
    image: '/data-pipeline.jpeg'
  },
  { 
    id: 3, 
    title: 'Cloud Console', 
    category: 'Management', 
    url: 'https://meshpointsystems.com', 
    tag: 'Production',
    image: '/cloud-console.jpeg'
  },
  { 
    id: 4, 
    title: 'Edge Node', 
    category: 'Networking', 
    url: 'https://meshpointsystems.com', 
    tag: 'Live',
    image: '/edge-node.jpeg'
  },
  { 
    id: 5, 
    title: 'Auth Portal', 
    category: 'Security', 
    url: 'https://meshpointsystems.com', 
    tag: 'Active',
    image: '/auth-portal.jpeg'
  },
];

// Section 2: GitHub Repositories tied to Video Streams
const GITHUB_REPOS = [
  {
    id: 'jason-os',
    name: 'jason-os',
    label: 'jason-os',
    desc: 'Privacy-first OS featuring emotional telemetry, volatile memory Ghost Tier, and coercion-resistant duress lockdowns.',
    url: 'https://github.com/jasethepeople/jason-os',
    youtubeUrl: 'https://www.youtube.com/shorts/F21gVQbQwzQ',
    video: '/videos/stream-surfer.mp4'
  },
  {
    id: 'lispmind',
    name: 'lispmind',
    label: 'lispmind',
    desc: 'Zero-downtime resilience platform utilizing agent isolation and Condition Restart Protocols for live code repair.',
    url: 'https://github.com/jasethepeople/lispmind',
    youtubeUrl: 'https://www.youtube.com/shorts/7l13vO82CYc',
    video: '/videos/stream-cyber.mp4'
  },
  {
    id: 'aetherstate-v2',
    name: 'aetherstate_v2',
    label: 'aetherstate_v2',
    desc: 'Decentralized human-AI co-editing framework powered by CRDT sync, WebRTC full-mesh P2P, and Redis/Postgres split storage.',
    url: 'https://github.com/jasethepeople/aetherstate_v2',
    youtubeUrl: 'https://www.youtube.com/shorts/sJLUGgCedmg',
    video: '/videos/stream-matrix.mp4'
  }
];

// Duplicate list for infinite loop/scroll feel
const CAROUSEL_ITEMS = [...LIVE_LINKS, ...LIVE_LINKS];

export default function Home() {
  const [selectedRepoId, setSelectedRepoId] = useState(GITHUB_REPOS[0].id);
  const [isFrogAudioOn, setIsFrogAudioOn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const frogVideoRef = useRef<HTMLVideoElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const currentRepo = GITHUB_REPOS.find((r) => r.id === selectedRepoId) || GITHUB_REPOS[0];

  const toggleFrogAudio = async (forceState?: boolean) => {
    if (frogVideoRef.current) {
      const nextState = forceState !== undefined ? forceState : !isFrogAudioOn;
      
      try {
        frogVideoRef.current.muted = !nextState;
        setIsFrogAudioOn(nextState);
        
        // Ensure continuous play state after unmuting/muting
        const playPromise = frogVideoRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
        }
      } catch (err) {
        // Fallback: If browser blocks unmuting on focus, revert gracefully without breaking video playback
        frogVideoRef.current.muted = true;
        setIsFrogAudioOn(false);
        frogVideoRef.current.play();
      }
    }
  };

  const handleContactFocus = () => {
    if (!isFrogAudioOn) {
      toggleFrogAudio(true);
    }
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Form Submission Handler utilizing Web3Forms API
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Immediately mute sound upon send button click
    toggleFrogAudio(false);

    setIsSubmitting(true);

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        alert("Message sent successfully!");
        formElement.reset();
      } else {
        alert(data.message || "Failed to send message. Please try again.");
      }
    } catch (err) {
      alert("An error occurred while submitting the form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] text-[#f7f5f0] font-sans selection:bg-white selection:text-black">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6 bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="text-xl font-bold tracking-widest text-white">MESHPOINT</div>
        <nav className="flex gap-6 text-sm tracking-wide text-gray-300">
          <a href="#hero" className="hover:text-white transition">About</a>
          <a href="#repos" className="hover:text-white transition">Repositories</a>
          <a href="#links" className="hover:text-white transition">Deployments</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </nav>
      </header>

      <main className="pt-16">
        {/* SECTION 1: Squirrel Hero */}
        <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/squirrel.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 text-center max-w-3xl px-4">
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4 uppercase drop-shadow-lg">
              Chaos Controlled
            </h1>
            <p className="text-2xl md:text-3xl text-gray-100 font-bold mb-3 drop-shadow-md">
              Building systems so fast you won't lose your nuts.
            </p>
            <p className="text-base md:text-lg text-gray-300 font-medium drop-shadow-md">
              It's like having a squirrel on your keyboard—minus the chaos.
            </p>
          </div>
        </section>

        {/* SECTION 2: GitHub Repositories tied to Video Streams */}
        <section id="repos" className="relative h-screen w-full overflow-hidden flex flex-col justify-between py-16 px-8 bg-black">
          <video
            key={currentRepo.video}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-85"
          >
            <source src={currentRepo.video} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />

          {/* Section Heading */}
          <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white drop-shadow-md">Featured Repositories</h2>
            <p className="text-gray-200 text-sm mt-1 drop-shadow-md">Core open-source projects and system architecture demos</p>
          </div>

          {/* Superimposed Ultra-Translucent Repository Card */}
          <div className="relative z-10 max-w-lg mx-auto w-full my-auto">
            <div className="bg-black/25 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 flex flex-col justify-between shadow-2xl transition-all duration-300">
              <div>
                <span className="text-xs text-gray-300 tracking-widest uppercase font-mono drop-shadow">Active Project</span>
                <h3 className="text-3xl font-bold text-white mt-1 mb-3 drop-shadow-lg">{currentRepo.name}</h3>
                <p className="text-base text-gray-100 leading-relaxed mb-8 drop-shadow-md">{currentRepo.desc}</p>
              </div>
              <div className="flex gap-4 pt-4 border-t border-white/20">
                <a
                  href={currentRepo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-white text-black text-xs font-bold rounded-full hover:bg-gray-200 transition shadow-lg"
                >
                  GitHub ↗
                </a>
                {currentRepo.youtubeUrl && (
                  <a
                    href={currentRepo.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 bg-red-600/90 hover:bg-red-600 text-white text-xs font-bold rounded-full backdrop-blur-sm transition shadow-lg"
                  >
                    Watch Demo ▶
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Video Switcher Controls */}
          <div className="relative z-10 flex justify-center">
            <div className="flex gap-3 bg-black/40 backdrop-blur-xl p-2 rounded-full border border-white/20 shadow-2xl">
              {GITHUB_REPOS.map((repo) => (
                <button
                  key={repo.id}
                  onClick={() => setSelectedRepoId(repo.id)}
                  className={`px-5 py-2 rounded-full text-xs font-medium tracking-wider transition ${
                    selectedRepoId === repo.id ? 'bg-white text-black font-semibold' : 'text-gray-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {repo.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: Live Deployments Carousel */}
        <section id="links" className="py-24 relative overflow-hidden bg-gradient-to-b from-black via-[#0a0a0f] to-black border-y border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent pointer-events-none" />

          <div className="max-w-6xl mx-auto px-8 mb-10 flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white select-none">Live Deployments</h2>
              <p className="text-gray-400 text-sm mt-1 select-none">Interactive node showcase and active services</p>
            </div>
            
            {/* Arrow Controls */}
            <div className="flex gap-3">
              <button
                onClick={() => scrollCarousel('left')}
                className="p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-all backdrop-blur-md active:scale-95"
                aria-label="Scroll Left"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                className="p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-all backdrop-blur-md active:scale-95"
                aria-label="Scroll Right"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Smooth Scroll Container */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto px-8 pb-8 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth cursor-grab active:cursor-grabbing max-w-7xl mx-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {CAROUSEL_ITEMS.map((link, idx) => (
              <a
                key={`${link.id}-${idx}`}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="snap-center relative shrink-0 w-[300px] h-[380px] rounded-2xl p-6 flex flex-col justify-between border border-white/10 hover:border-cyan-400/50 transition-all duration-500 group overflow-hidden shadow-2xl bg-black/40 backdrop-blur-xl select-none"
              >
                {/* Image Background */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 opacity-70 group-hover:opacity-90"
                  style={{ backgroundImage: `url(${link.image})` }}
                />
                
                {/* Gradient Mask to replace black boxes */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-300" />

                {/* Top Badge */}
                <div className="relative z-10 flex justify-between items-start">
                  <span className="text-xs px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-400/30 backdrop-blur-md font-mono tracking-wider font-semibold">
                    {link.tag}
                  </span>
                  <span className="text-white/70 group-hover:text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </div>

                {/* Bottom Card Title */}
                <div className="relative z-10">
                  <span className="text-[11px] text-cyan-400/90 tracking-widest uppercase font-mono block mb-1">
                    {link.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white tracking-tight leading-snug">
                    {link.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* SECTION 4: Frog Video Contact Form */}
        <section id="contact" className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
          <video
            ref={frogVideoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-[center_30%] opacity-100"
          >
            <source src="/videos/frog.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/10" />

          {/* Sheer Glassmorphic Contact Form Card */}
          <div className="relative z-10 w-full max-w-md mx-4 bg-black/10 backdrop-blur-md p-8 rounded-3xl border border-white/15 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white drop-shadow-lg">Get in Touch</h3>
                <p className="text-xs text-gray-100 mt-1 drop-shadow">Send a message directly to Meshpoint</p>
              </div>
              <button
                type="button"
                onClick={() => toggleFrogAudio()}
                className="p-2 bg-black/20 hover:bg-black/40 border border-white/20 rounded-full text-white transition shadow-lg"
                title={isFrogAudioOn ? "Mute audio" : "Enable audio"}
              >
                {isFrogAudioOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Web3Forms Access Key */}
              <input type="hidden" name="access_key" value="6f55d35e-4f12-47a4-a5d4-d022060790cf" />

              <div>
                <label className="block text-xs font-medium text-gray-100 mb-1 drop-shadow">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  onFocus={handleContactFocus}
                  className="w-full px-4 py-2.5 bg-black/20 border border-white/20 rounded-xl text-sm text-white placeholder-gray-300 focus:outline-none focus:border-white focus:bg-black/30 transition backdrop-blur-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-100 mb-1 drop-shadow">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@example.com"
                  onFocus={handleContactFocus}
                  className="w-full px-4 py-2.5 bg-black/20 border border-white/20 rounded-xl text-sm text-white placeholder-gray-300 focus:outline-none focus:border-white focus:bg-black/30 transition backdrop-blur-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-100 mb-1 drop-shadow">Message</label>
                <textarea
                  rows={3}
                  name="message"
                  required
                  placeholder="What are we building?"
                  onFocus={handleContactFocus}
                  className="w-full px-4 py-2.5 bg-black/20 border border-white/20 rounded-xl text-sm text-white placeholder-gray-300 focus:outline-none focus:border-white focus:bg-black/30 transition backdrop-blur-sm resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition flex items-center justify-center gap-2 text-sm shadow-xl disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"} <Send size={14} />
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-gray-500 border-t border-white/10 bg-[#050507]">
        © {new Date().getFullYear()} Meshpoint Systems. All rights reserved.
      </footer>
    </div>
  );
}
