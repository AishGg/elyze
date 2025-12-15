import React, { useState, useEffect } from 'react';
import { TrendingUp, Shield, Zap, ArrowRight, Menu, X, Lock, BarChart3, Globe, Sparkles, Crown, Users, Vote, Gift, Coins, Calendar, ExternalLink, MessageCircle } from 'lucide-react';

export default function ElyzeFinance() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const targetDate = new Date('2026-01-14T14:00:00Z').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToWhitelist = () => {
    document.getElementById('community')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Montserrat', sans-serif;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        
        @keyframes glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        
        .gold-gradient {
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
        }
        
        .gold-text {
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.3), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>

      {/* Animated Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-600/20 rounded-full filter blur-3xl animate-glow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-glow" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-500/10 rounded-full filter blur-3xl animate-glow" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Floating Whitelist Button */}
      <button 
        onClick={scrollToWhitelist}
        className="fixed bottom-8 right-8 z-50 px-6 py-3 gold-gradient text-black font-bold rounded-2xl shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2"
      >
        <Sparkles className="w-5 h-5" />
        Join Whitelist
      </button>

      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'glass-effect' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <div className="text-2xl font-extrabold tracking-tight gold-text">ELYZE</div>
                <div className="text-xs text-gray-400 font-medium">FINANCE</div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-gray-300 hover:text-yellow-500 transition font-medium">About</a>
              <a href="#genesis" className="text-gray-300 hover:text-yellow-500 transition font-medium">Genesis Pass</a>
              <a href="#investment" className="text-gray-300 hover:text-yellow-500 transition font-medium">Invest</a>
              <a href="#roadmap" className="text-gray-300 hover:text-yellow-500 transition font-medium">Roadmap</a>
              <button onClick={scrollToWhitelist} className="px-6 py-2.5 gold-gradient text-black font-bold rounded-xl hover:shadow-lg hover:shadow-yellow-500/50 transition-all hover:scale-105">
                Join Whitelist
              </button>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden glass-effect border-t border-gray-800">
            <div className="px-6 py-4 space-y-4">
              <a href="#about" className="block text-gray-300 hover:text-yellow-500 transition font-medium">About</a>
              <a href="#genesis" className="block text-gray-300 hover:text-yellow-500 transition font-medium">Genesis Pass</a>
              <a href="#investment" className="block text-gray-300 hover:text-yellow-500 transition font-medium">Invest</a>
              <a href="#roadmap" className="block text-gray-300 hover:text-yellow-500 transition font-medium">Roadmap</a>
              <button onClick={scrollToWhitelist} className="w-full px-6 py-2.5 gold-gradient text-black font-bold rounded-xl">
                Join Whitelist
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-2 glass-effect rounded-full text-sm font-semibold text-yellow-500 border border-yellow-500/30">
            <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></span>
            Built on Ethereum
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Reinventing Crypto Investing<br />
            <span className="gold-text">One Smart Pool at a Time 💸</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light">
            Smart, transparent, and community-powered investing — powered by Ethereum and enhanced by AI.
          </p>

          {/* Genesis Pass Mockup */}
          <div className="mb-12 relative">
            <div className="w-80 h-80 mx-auto relative animate-float">
              <div className="absolute inset-0 gold-gradient rounded-3xl blur-2xl opacity-30"></div>
              <div className="relative glass-effect rounded-3xl p-8 border-2 border-yellow-500/50">
                <div className="text-yellow-500 mb-4">
                  <Crown className="w-16 h-16 mx-auto" />
                </div>
                <div className="text-3xl font-extrabold mb-2 gold-text">GENESIS PASS</div>
                <div className="text-6xl font-extrabold text-white mb-4">555</div>
                <div className="text-sm text-gray-400 uppercase tracking-widest">Limited Supply</div>
              </div>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="mb-8">
            <div className="text-sm text-gray-400 mb-4 uppercase tracking-widest">Mint Starts In</div>
            <div className="flex justify-center gap-4 md:gap-6 mb-4">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds }
              ].map((item, i) => (
                <div key={i} className="glass-effect rounded-2xl p-4 md:p-6 min-w-20 border border-yellow-500/30">
                  <div className="text-3xl md:text-4xl font-extrabold gold-text">{String(item.value).padStart(2, '0')}</div>
                  <div className="text-xs text-gray-400 uppercase mt-1">{item.label}</div>
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-400">
              Mint Goes Live • <span className="text-yellow-500 font-semibold">14 JAN. 2026 • 2PM UTC</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onClick={scrollToWhitelist} className="px-8 py-4 gold-gradient text-black font-bold rounded-2xl text-lg hover:shadow-2xl hover:shadow-yellow-500/50 transition-all hover:scale-105 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Join Whitelist
              <ArrowRight className="w-5 h-5" />
            </button>
            <a href="#about" className="px-8 py-4 glass-effect border-2 border-yellow-500/50 text-yellow-500 font-bold rounded-2xl text-lg hover:bg-yellow-500/10 transition-all">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              What Is <span className="gold-text">Elyze Finance</span>?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Elyze Finance is an AI-powered, community-based investment ecosystem designed to make crypto investing simple, consistent, and transparent. Built on Ethereum, Elyze allows anyone to start investing with as little as $5 per week, combining automated DeFi strategies and AI-driven optimization for smarter long-term growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '💠', title: 'Built on Ethereum', desc: 'Secure, decentralized infrastructure' },
              { icon: '🧠', title: 'AI-Powered Optimization', desc: 'Intelligent financial strategies' },
              { icon: '💸', title: 'Start from $5/week', desc: 'Accessible to everyone' },
              { icon: '🔒', title: 'Transparent Contracts', desc: 'Fully audited and secure' },
              { icon: '🤝', title: 'Community-First', desc: 'Governed by token holders' },
              { icon: '📈', title: 'Consistent Growth', desc: 'Long-term value creation' }
            ].map((item, i) => (
              <div key={i} className="glass-effect rounded-2xl p-6 hover:border-yellow-500/50 transition-all hover:scale-105 border border-gray-800">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Genesis Pass Section */}
      <section id="genesis" className="relative py-24 px-6 bg-gradient-to-b from-black via-yellow-950/5 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              <span className="gold-text">Elyze Finance Genesis Pass</span> 🎟️
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Your key to the Elyze ecosystem — a limited edition NFT granting exclusive access, rewards, and governance rights.<br />
              <span className="text-yellow-500 font-bold">Only 555 Passes will ever exist.</span>
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Details Table */}
            <div className="glass-effect rounded-3xl p-8 border border-yellow-500/30">
              <div className="space-y-4">
                {[
                  { label: 'Total Supply', value: '555 NFTs' },
                  { label: 'Network', value: 'Ethereum' },
                  { label: 'WL Mint Price', value: '0.0066Ξ' },
                  { label: 'Public Mint Price', value: '0.0088Ξ' },
                  { label: 'Mint Date', value: '14 JAN. 2026 • 2 PM UTC' },
                  { label: 'Transferable', value: 'Yes' },
                  { label: 'Utility Activation', value: 'On platform launch' }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-gray-800 last:border-0">
                    <span className="text-gray-400 font-medium">{item.label}</span>
                    <span className="text-white font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Utility List */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-6 gold-text">Pass Holder Benefits</h3>
              {[
                { icon: Crown, text: 'Lifetime platform access' },
                { icon: Coins, text: '30% reward share from ecosystem profits' },
                { icon: Gift, text: 'Early airdrops & token utilities' },
                { icon: TrendingUp, text: 'Exclusive investment tiers ($5/week → $100/month)' },
                { icon: Vote, text: 'DAO governance & voting rights' }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 glass-effect rounded-xl p-4 hover:border-yellow-500/50 transition-all border border-gray-800">
                  <div className="w-12 h-12 gold-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-black" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Investment Model Section */}
      <section id="investment" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Smarter Investing for <span className="gold-text">Everyone</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Elyze Finance introduces on-chain investment pools powered by smart contracts — blending the security of mutual funds with the flexibility of DeFi.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { plan: 'Starter Plan', contribution: '$5/week', duration: 'Flexible', reward: 'Entry-level returns', gradient: 'from-blue-500 to-blue-600' },
              { plan: 'Growth Plan', contribution: '$25/month', duration: '3–6 months', reward: 'Balanced ROI', gradient: 'from-yellow-500 to-yellow-600' },
              { plan: 'Pro Plan', contribution: '$100/month', duration: '6–12 months', reward: 'Premium returns', gradient: 'from-purple-500 to-purple-600' }
            ].map((item, i) => (
              <div key={i} className="glass-effect rounded-2xl p-8 border border-gray-800 hover:border-yellow-500/50 transition-all hover:scale-105">
                <div className={`inline-block px-4 py-2 bg-gradient-to-r ${item.gradient} rounded-full text-sm font-bold mb-6`}>
                  {item.plan}
                </div>
                <div className="text-4xl font-extrabold mb-2 gold-text">{item.contribution}</div>
                <div className="text-gray-400 mb-6">{item.duration}</div>
                <div className="text-white font-semibold">{item.reward}</div>
              </div>
            ))}
          </div>

          <div className="glass-effect rounded-3xl p-8 md:p-12 border border-yellow-500/30 text-center">
            <h3 className="text-2xl font-bold mb-6 gold-text">Reward Distribution</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div>
                <div className="text-5xl font-extrabold gold-text mb-2">30%</div>
                <div className="text-gray-300">Genesis Pass Holders</div>
              </div>
              <div>
                <div className="text-5xl font-extrabold text-white mb-2">70%</div>
                <div className="text-gray-300">Pool Investors</div>
              </div>
            </div>
            <p className="text-gray-400 mt-8">All on-chain, automated, and transparent.</p>
          </div>
        </div>
      </section>

      {/* Token Utility Section */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-black via-blue-950/5 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <div className="w-24 h-24 mx-auto gold-gradient rounded-full flex items-center justify-center mb-4 animate-float">
                <Coins className="w-12 h-12 text-black" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              <span className="gold-text">$ELZ Token</span> — The Core of Elyze
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              $ELZ is the native token that powers the entire Elyze Finance ecosystem. It connects staking, governance, and yield systems across all Elyze products.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, title: 'Staking & Yield Boosting', desc: 'Earn enhanced returns' },
              { icon: Vote, title: 'Governance Voting', desc: 'Shape the ecosystem' },
              { icon: Lock, title: 'Exclusive Access', desc: 'New pools & features' },
              { icon: Gift, title: 'Fee Discounts', desc: 'Early airdrops & perks' }
            ].map((item, i) => (
              <div key={i} className="glass-effect rounded-2xl p-6 border border-gray-800 hover:border-yellow-500/50 transition-all hover:scale-105 text-center">
                <div className="w-16 h-16 mx-auto mb-4 gold-gradient rounded-full flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Roadmap to <span className="gold-text">Decentralized Wealth</span>
            </h2>
          </div>

          <div className="space-y-6">
            {[
              { phase: 'Phase 1', status: '✅ Completed', timeline: 'Completed', focus: 'Elyze AI → Elyze Finance Rebrand', color: 'border-green-500/50' },
              { phase: 'Phase 2', status: '🔜 Coming Soon', timeline: 'JAN. 2026', focus: 'Genesis Pass Mint (WL + Public)', color: 'border-yellow-500/50' },
              { phase: 'Phase 3', status: '📅 Planned', timeline: 'Q1 2026', focus: 'Launch of first investment pools', color: 'border-blue-500/50' },
              { phase: 'Phase 4', status: '📅 Planned', timeline: 'Q2 2026', focus: 'Smart Auto-Investment System', color: 'border-purple-500/50' },
              { phase: 'Phase 5', status: '📅 Planned', timeline: 'Q3 2026', focus: 'DAO Governance & $ELZ Expansion', color: 'border-pink-500/50' }
            ].map((item, i) => (
              <div key={i} className={`glass-effect rounded-2xl p-6 md:p-8 border-2 ${item.color} hover:scale-105 transition-all`}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl font-extrabold gold-text">{item.phase}</span>
                      <span className="text-sm">{item.status}</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-2">{item.focus}</div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-5 h-5" />
                    <span className="font-semibold">{item.timeline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Quote Section */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-black via-yellow-950/10 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-effect rounded-3xl p-12 md:p-16 border-2 border-yellow-500/30">
            <div className="text-6xl mb-8">"</div>
            <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed mb-8">
              Elyze Finance is built for those who believe in <span className="gold-text">consistent growth</span> — not hype. Not speculation. Just real investing power.
            </p>
            <div className="text-6xl rotate-180">"</div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Join the <span className="gold-text">Movement</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-12">
            Become part of a global community shaping the future of AI-powered decentralized finance.<br />
            <span className="text-yellow-500 font-semibold">Whitelist spots are limited</span> — early believers will define the next phase of crypto investing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="px-8 py-4 gold-gradient text-black font-bold rounded-2xl text-lg hover:shadow-2xl hover:shadow-yellow-500/50 transition-all hover:scale-105 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Join Whitelist
              <ArrowRight className="w-5 h-5" />
            </button>
            <a href="https://t.me/elyzefinance" target="_blank" rel="noopener noreferrer" className="px-8 py-4 glass-effect border-2 border-blue-500/50 text-blue-400 font-bold rounded-2xl text-lg hover:bg-blue-500/10 transition-all flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Join Telegram
            </a>
            <a href="https://twitter.com/ElyzeFinance" target="_blank" rel="noopener noreferrer" className="px-8 py-4 glass-effect border-2 border-blue-400/50 text-blue-300 font-bold rounded-2xl text-lg hover:bg-blue-400/10 transition-all flex items-center gap-2">
              <ExternalLink className="w-5 h-5" />
              Follow on X
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div>
                  <div className="text-2xl font-extrabold gold-text">ELYZE</div>
                  <div className="text-xs text-gray-400 font-medium">FINANCE</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Built with transparency. Powered by Ethereum.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold mb-4 gold-text">Links</h4>
                <div className="space-y-2 text-sm">
                  <a href="https://elyze.xyz" className="block text-gray-400 hover:text-yellow-500 transition">🌐 Website</a>
                  <a href="https://twitter.com/ElyzeFinance" className="block text-gray-400 hover:text-yellow-500 transition">🐦 Twitter</a>
                  <a href="https://t.me/elyzefinance" className="block text-gray-400 hover:text-yellow-500 transition">💬 Telegram</a>
                  <a href="#" className="block text-gray-400 hover:text-yellow-500 transition">📜 Whitepaper (Soon)</a>
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-4 gold-text">Quick Links</h4>
                <div className="space-y-2 text-sm">
                  <a href="#about" className="block text-gray-400 hover:text-yellow-500 transition">About</a>
                  <a href="#genesis" className="block text-gray-400 hover:text-yellow-500 transition">Genesis Pass</a>
                  <a href="#investment" className="block text-gray-400 hover:text-yellow-500 transition">Investment Plans</a>
                  <a href="#roadmap" className="block text-gray-400 hover:text-yellow-500 transition">Roadmap</a>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-gray-800">
            <p className="text-gray-500 text-sm">
              © 2025 Elyze Finance. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}