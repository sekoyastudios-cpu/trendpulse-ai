import React, { useState, useEffect, useRef } from 'react';

// ===================== STYLES =====================
const styles = {
  bg: '#0a0a0a', fg: '#ffffff', cyan: '#00d4ff', green: '#00ff88',
  orange: '#ff6b35', purple: '#a855f7', pink: '#ec4899', yellow: '#fbbf24',
  card: '#111111', border: '#1a1a2e', muted: '#888888'
};

// ===================== DATA =====================
const CATEGORIES = [
  { id: 'all', label: 'All Trends', icon: '🌍', color: styles.cyan },
  { id: 'news', label: 'News', icon: '📰', color: styles.orange },
  { id: 'tech', label: 'Tech', icon: '💻', color: styles.cyan },
  { id: 'finance', label: 'Finance', icon: '💰', color: styles.green },
  { id: 'health', label: 'Health', icon: '❤️', color: styles.pink },
  { id: 'entertainment', label: 'Entertainment', icon: '🎬', color: styles.purple },
  { id: 'sports', label: 'Sports', icon: '⚽', color: styles.yellow },
  { id: 'ai', label: 'AI & Tech', icon: '🤖', color: '#60a5fa' },
];

const TRENDING_DATA = [
  { id: 1, keyword: 'ChatGPT-5 release date', searches: '2.4M', change: '+340%', category: 'ai', source: 'Google', hot: true, desc: 'OpenAI newest model announcement drives massive search interest worldwide.', related: ['GPT-5 features', 'AI chatbot 2025', 'OpenAI news'] },
  { id: 2, keyword: 'Bitcoin price today', searches: '1.8M', change: '+180%', category: 'finance', source: 'Google', hot: true, desc: 'Cryptocurrency markets surge as institutional investors increase holdings.', related: ['BTC USD', 'crypto news', 'Ethereum price'] },
  { id: 3, keyword: 'Climate summit 2025', searches: '950K', change: '+220%', category: 'news', source: 'X/Twitter', hot: true, desc: 'World leaders gather for emergency climate policy discussions.', related: ['global warming news', 'Paris agreement', 'carbon tax'] },
  { id: 4, keyword: 'iPhone 17 leaks', searches: '1.2M', change: '+95%', category: 'tech', source: 'YouTube', hot: false, desc: 'Latest leaked specs and design renders go viral across social media.', related: ['Apple 2025', 'iPhone 17 specs', 'iOS 19'] },
  { id: 5, keyword: 'Weight loss tips fast', searches: '880K', change: '+67%', category: 'health', source: 'Google', hot: false, desc: 'Seasonal fitness goals drive surge in diet and exercise searches.', related: ['keto diet', 'intermittent fasting', 'best workout 2025'] },
  { id: 6, keyword: 'Netflix new series 2025', searches: '760K', change: '+125%', category: 'entertainment', source: 'Google', hot: false, desc: 'Highly anticipated new originals generate massive viewer anticipation.', related: ['best shows 2025', 'what to watch', 'Netflix recommendations'] },
  { id: 7, keyword: 'Champions League final', searches: '3.2M', change: '+560%', category: 'sports', source: 'Google', hot: true, desc: 'Europe biggest football match draws record global search interest.', related: ['UEFA 2025', 'football scores', 'sports betting'] },
  { id: 8, keyword: 'AI image generator free', searches: '1.1M', change: '+280%', category: 'ai', source: 'Google', hot: true, desc: 'New free AI art tools launch, sparking massive user adoption.', related: ['Midjourney free', 'DALL-E 4', 'AI art tools'] },
  { id: 9, keyword: 'Remote jobs hiring now', searches: '690K', change: '+44%', category: 'finance', source: 'LinkedIn', hot: false, desc: 'Work from home opportunities remain top priority for job seekers.', related: ['work from home jobs', 'online jobs 2025', 'freelance work'] },
  { id: 10, keyword: 'Taylor Swift new album', searches: '2.1M', change: '+400%', category: 'entertainment', source: 'X/Twitter', hot: true, desc: 'Surprise album announcement breaks streaming records overnight.', related: ['Taylor Swift tour', 'Swifties', 'pop music 2025'] },
  { id: 11, keyword: 'Stock market crash 2025', searches: '540K', change: '+320%', category: 'finance', source: 'Google', hot: true, desc: 'Market volatility fears drive massive financial news searches.', related: ['S&P 500 today', 'recession 2025', 'best stocks to buy'] },
  { id: 12, keyword: 'Quantum computing breakthrough', searches: '420K', change: '+190%', category: 'tech', source: 'Reddit', hot: false, desc: 'Scientists announce major milestone in quantum processing speed.', related: ['IBM quantum', 'Google quantum AI', 'future of computing'] },
  { id: 13, keyword: 'Ozempic side effects', searches: '780K', change: '+85%', category: 'health', source: 'Google', hot: false, desc: 'Weight loss drug continues to dominate health conversations globally.', related: ['Wegovy', 'GLP-1', 'diabetes medication'] },
  { id: 14, keyword: 'SpaceX Starship launch', searches: '1.6M', change: '+230%', category: 'news', source: 'YouTube', hot: true, desc: 'Elon Musk Mars mission latest test flight livestream draws millions.', related: ['Elon Musk space', 'NASA 2025', 'Mars colonization'] },
  { id: 15, keyword: 'How to make money online', searches: '1.3M', change: '+55%', category: 'finance', source: 'Google', hot: false, desc: 'Evergreen search term shows continued rise in side hustle interest.', related: ['passive income ideas', 'dropshipping 2025', 'affiliate marketing'] },
  { id: 16, keyword: 'Llama 4 vs GPT-5', searches: '620K', change: '+445%', category: 'ai', source: 'Hacker News', hot: true, desc: 'Meta new open-source model benchmark comparisons go viral in tech circles.', related: ['open source AI', 'Meta AI', 'LLM comparison'] },
];

const STATS = [
  { label: 'Daily Searches Tracked', value: '2.1B+', icon: '🔍' },
  { label: 'Topics Updated/Hour', value: '1,240', icon: '⚡' },
  { label: 'Countries Monitored', value: '195', icon: '🌍' },
  { label: 'Platforms Tracked', value: '20+', icon: '📊' },
];

const LANGS = [
  { code: 'EN', label: '🇺🇸 English' }, { code: 'FR', label: '🇫🇷 Français' },
  { code: 'ES', label: '🇪🇸 Español' }, { code: 'ZH', label: '🇨🇳 中文' },
  { code: 'JA', label: '🇯🇵 日本語' }, { code: 'KO', label: '🇰🇷 한국어' },
  { code: 'PT', label: '🇧🇷 Português' }, { code: 'AR', label: '🇸🇦 العربية' },
];

const PLATFORMS = ['Google Search', 'Google Trends', 'X/Twitter', 'Reddit', 'TikTok', 'YouTube', 'Instagram', 'LinkedIn', 'Amazon', 'Hacker News', 'Product Hunt', 'GitHub', 'App Store', 'Crunchbase', 'News API', 'Bing', 'Baidu', 'Naver', 'Weibo', 'Pinterest'];

// ===================== ADSENSE COMPONENT =====================
function AdUnit({ slot, format }) {
  useEffect(() => {
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch(e) {}
  }, []);
  return (
    React.createElement('div', { style: { textAlign: 'center', margin: '16px 0', minHeight: '90px', background: '#111', borderRadius: '8px', border: '1px solid #1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
      React.createElement('ins', { className: 'adsbygoogle', style: { display: 'block' }, 'data-ad-client': 'ca-pub-2708762381072327', 'data-ad-slot': slot || '1234567890', 'data-ad-format': format || 'auto', 'data-full-width-responsive': 'true' })
    )
  );
}

// ===================== TICKER =====================
function Ticker() {
  const tickerItems = TRENDING_DATA.slice(0, 8).map(t => t.keyword + ' ' + t.change);
  return React.createElement('div', {
    style: { background: '#050510', borderTop: '1px solid #1a1a2e', borderBottom: '1px solid #1a1a2e', overflow: 'hidden', padding: '8px 0' }
  },
    React.createElement('div', {
      style: { display: 'flex', gap: '60px', animation: 'ticker 30s linear infinite', whiteSpace: 'nowrap', fontSize: '13px', color: styles.muted }
    },
      [...tickerItems, ...tickerItems].map((item, i) =>
        React.createElement('span', { key: i, style: { color: i % 3 === 0 ? styles.cyan : i % 3 === 1 ? styles.green : styles.orange } },
          '🔥 ' + item
        )
      )
    )
  );
}

// ===================== TREND CARD =====================
function TrendCard({ trend, onClick }) {
  const cat = CATEGORIES.find(c => c.id === trend.category);
  return React.createElement('div', {
    onClick: () => onClick(trend),
    style: {
      background: styles.card, border: '1px solid #1a1a2e', borderRadius: '12px',
      padding: '20px', cursor: 'pointer', transition: 'all 0.2s',
      position: 'relative', overflow: 'hidden'
    },
    onMouseEnter: e => { e.currentTarget.style.borderColor = cat ? cat.color : styles.cyan; e.currentTarget.style.transform = 'translateY(-2px)'; },
    onMouseLeave: e => { e.currentTarget.style.borderColor = '#1a1a2e'; e.currentTarget.style.transform = 'translateY(0)'; }
  },
    trend.hot && React.createElement('div', {
      style: { position: 'absolute', top: '12px', right: '12px', background: styles.orange, color: '#fff', fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '20px', letterSpacing: '1px' }
    }, '🔥 HOT'),
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' } },
      React.createElement('span', { style: { fontSize: '18px' } }, cat ? cat.icon : '📈'),
      React.createElement('span', { style: { fontSize: '11px', color: cat ? cat.color : styles.cyan, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' } }, cat ? cat.label : 'Trend'),
      React.createElement('span', { style: { fontSize: '11px', color: styles.muted, marginLeft: 'auto' } }, trend.source)
    ),
    React.createElement('h3', { style: { color: styles.fg, fontSize: '15px', fontWeight: '700', marginBottom: '8px', lineHeight: '1.3' } }, trend.keyword),
    React.createElement('p', { style: { color: styles.muted, fontSize: '13px', lineHeight: '1.5', marginBottom: '12px' } }, trend.desc),
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
      React.createElement('span', { style: { color: styles.green, fontSize: '13px', fontWeight: '700' } }, trend.change + ' searches'),
      React.createElement('span', { style: { color: styles.muted, fontSize: '12px', background: '#1a1a2e', padding: '4px 10px', borderRadius: '20px' } }, trend.searches + '/day')
    )
  );
}

// ===================== MODAL =====================
function TrendModal({ trend, onClose }) {
  if (!trend) return null;
  const cat = CATEGORIES.find(c => c.id === trend.category);
  return React.createElement('div', {
    style: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
    onClick: onClose
  },
    React.createElement('div', {
      style: { background: '#111', border: '1px solid #1a1a2e', borderRadius: '16px', padding: '32px', maxWidth: '600px', width: '100%', position: 'relative' },
      onClick: e => e.stopPropagation()
    },
      React.createElement('button', { onClick: onClose, style: { position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: styles.muted, cursor: 'pointer', fontSize: '20px' } }, '✕'),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' } },
        React.createElement('span', { style: { fontSize: '32px' } }, cat ? cat.icon : '📈'),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: '11px', color: cat ? cat.color : styles.cyan, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' } }, cat ? cat.label : 'Trend'),
          React.createElement('h2', { style: { color: styles.fg, fontSize: '22px', fontWeight: '800' } }, trend.keyword)
        )
      ),
      React.createElement('p', { style: { color: '#aaa', fontSize: '15px', lineHeight: '1.6', marginBottom: '20px' } }, trend.desc),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' } },
        React.createElement('div', { style: { background: '#0a0a0a', borderRadius: '8px', padding: '16px', textAlign: 'center' } },
          React.createElement('div', { style: { color: styles.green, fontSize: '22px', fontWeight: '800' } }, trend.change),
          React.createElement('div', { style: { color: styles.muted, fontSize: '12px' } }, 'Search Growth')
        ),
        React.createElement('div', { style: { background: '#0a0a0a', borderRadius: '8px', padding: '16px', textAlign: 'center' } },
          React.createElement('div', { style: { color: styles.cyan, fontSize: '22px', fontWeight: '800' } }, trend.searches),
          React.createElement('div', { style: { color: styles.muted, fontSize: '12px' } }, 'Daily Searches')
        )
      ),
      React.createElement('div', { style: { marginBottom: '20px' } },
        React.createElement('div', { style: { color: styles.muted, fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' } }, 'Related Searches'),
        React.createElement('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' } },
          trend.related.map((r, i) => React.createElement('span', { key: i, style: { background: '#1a1a2e', color: styles.cyan, fontSize: '12px', padding: '4px 12px', borderRadius: '20px', cursor: 'pointer' } }, r))
        )
      ),
      React.createElement('a', {
        href: 'https://trends.google.com/trends/explore?q=' + encodeURIComponent(trend.keyword),
        target: '_blank', rel: 'noopener noreferrer',
        style: { display: 'block', background: 'linear-gradient(135deg, #00d4ff, #00ff88)', color: '#000', textDecoration: 'none', padding: '12px', borderRadius: '8px', textAlign: 'center', fontWeight: '700', fontSize: '14px' }
      }, '📊 View on Google Trends →')
    )
  );
}

// ===================== NEWSLETTER =====================
function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  return React.createElement('div', {
    style: { background: 'linear-gradient(135deg, #0a0a2e 0%, #0a1a0a 100%)', border: '1px solid #1a1a2e', borderRadius: '16px', padding: '48px 32px', textAlign: 'center', margin: '40px 0' }
  },
    React.createElement('div', { style: { fontSize: '40px', marginBottom: '16px' } }, '📬'),
    React.createElement('h2', { style: { color: styles.fg, fontSize: '28px', fontWeight: '800', marginBottom: '8px' } }, 'Daily Trend Report'),
    React.createElement('p', { style: { color: styles.muted, fontSize: '16px', marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px' } }, 'Get the top 10 trending searches delivered to your inbox every morning at 7 AM. Free forever.'),
    !submitted ?
      React.createElement('div', { style: { display: 'flex', gap: '12px', maxWidth: '420px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' } },
        React.createElement('input', {
          type: 'email', placeholder: 'your@email.com', value: email,
          onChange: e => setEmail(e.target.value),
          style: { flex: '1', minWidth: '200px', background: '#111', border: '1px solid #1a1a2e', borderRadius: '8px', padding: '12px 16px', color: styles.fg, fontSize: '14px', outline: 'none' }
        }),
        React.createElement('button', {
          onClick: () => { if(email) setSubmitted(true); },
          style: { background: 'linear-gradient(135deg, #00d4ff, #00ff88)', color: '#000', border: 'none', borderRadius: '8px', padding: '12px 24px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }
        }, 'Subscribe Free')
      ) :
      React.createElement('div', { style: { color: styles.green, fontSize: '18px', fontWeight: '700' } }, '✅ You are subscribed! Check your inbox.')
  );
}

// ===================== MAIN APP =====================
export default function App() {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedTrend, setSelectedTrend] = useState(null);
  const [lang, setLang] = useState('EN');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const filtered = TRENDING_DATA.filter(t => {
    const matchCat = category === 'all' || t.category === category;
    const matchSearch = !search || t.keyword.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return React.createElement('div', { style: { background: styles.bg, minHeight: '100vh', color: styles.fg, fontFamily: "'Inter', sans-serif" } },
    // Keyframes
    React.createElement('style', null, '@keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } } @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } } @keyframes spin { to { transform:rotate(360deg); } }'),

    // NAVBAR
    React.createElement('nav', { style: { position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #1a1a2e', padding: '0 24px' } },
      React.createElement('div', { style: { maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
          React.createElement('span', { style: { fontSize: '28px' } }, '📡'),
          React.createElement('div', null,
            React.createElement('span', { style: { fontFamily: 'Orbitron, sans-serif', fontSize: '18px', fontWeight: '900', color: styles.cyan } }, 'TREND'),
            React.createElement('span', { style: { fontFamily: 'Orbitron, sans-serif', fontSize: '18px', fontWeight: '900', color: styles.fg } }, 'PULSE'),
            React.createElement('span', { style: { fontFamily: 'Orbitron, sans-serif', fontSize: '18px', fontWeight: '900', color: styles.green } }, ' AI')
          )
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', color: styles.muted, fontSize: '13px' } },
          React.createElement('span', { style: { width: '8px', height: '8px', borderRadius: '50%', background: styles.green, display: 'inline-block', animation: 'pulse 2s infinite' } }),
          React.createElement('span', null, 'LIVE — Updated: ' + currentTime.toLocaleTimeString())
        ),
        React.createElement('div', { style: { position: 'relative' } },
          React.createElement('button', {
            onClick: () => setShowLangMenu(!showLangMenu),
            style: { background: '#111', border: '1px solid #1a1a2e', color: styles.fg, padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }
          }, lang + ' ▾'),
          showLangMenu && React.createElement('div', { style: { position: 'absolute', right: 0, top: '110%', background: '#111', border: '1px solid #1a1a2e', borderRadius: '8px', overflow: 'hidden', zIndex: 200, minWidth: '160px' } },
            LANGS.map(l => React.createElement('div', { key: l.code, onClick: () => { setLang(l.code); setShowLangMenu(false); }, style: { padding: '10px 16px', cursor: 'pointer', fontSize: '13px', color: l.code === lang ? styles.cyan : styles.fg, background: l.code === lang ? '#1a1a2e' : 'transparent' } }, l.label))
          )
        )
      )
    ),

    // TICKER
    React.createElement(Ticker, null),

    // HERO
    React.createElement('section', { style: { padding: '80px 24px 60px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' } },
      React.createElement('div', { style: { display: 'inline-block', background: '#0a1a0a', border: '1px solid ' + styles.green, color: styles.green, fontSize: '12px', fontWeight: '700', padding: '6px 16px', borderRadius: '20px', marginBottom: '24px', letterSpacing: '2px' } }, '⚡ REAL-TIME SEARCH INTELLIGENCE'),
      React.createElement('h1', { style: { fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: '900', lineHeight: '1.1', marginBottom: '20px' } },
        React.createElement('span', { style: { color: styles.fg } }, 'What the World is '),
        React.createElement('span', { style: { color: styles.cyan } }, 'Searching'),
        React.createElement('br', null),
        React.createElement('span', { style: { color: styles.fg } }, 'Right '),
        React.createElement('span', { style: { background: 'linear-gradient(135deg, ' + styles.cyan + ', ' + styles.green + ')', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' } }, 'Now')
      ),
      React.createElement('p', { style: { color: styles.muted, fontSize: '18px', maxWidth: '600px', margin: '0 auto 32px', lineHeight: '1.6' } }, 'Track trending topics, viral searches, and breaking insights across 20+ global platforms. Updated every 60 minutes.'),

      // SEARCH BAR
      React.createElement('div', { style: { display: 'flex', gap: '12px', maxWidth: '600px', margin: '0 auto 48px', flexWrap: 'wrap' } },
        React.createElement('input', {
          type: 'text', placeholder: '🔍 Search any topic, keyword, trend...',
          value: search, onChange: e => setSearch(e.target.value),
          style: { flex: '1', minWidth: '200px', background: '#111', border: '1px solid #1a1a2e', borderRadius: '12px', padding: '16px 20px', color: styles.fg, fontSize: '16px', outline: 'none' }
        }),
        React.createElement('button', {
          onClick: () => {},
          style: { background: 'linear-gradient(135deg, ' + styles.cyan + ', ' + styles.green + ')', color: '#000', border: 'none', borderRadius: '12px', padding: '16px 28px', fontWeight: '800', fontSize: '15px', cursor: 'pointer', whiteSpace: 'nowrap' }
        }, 'Explore Trends')
      ),

      // STATS ROW
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', maxWidth: '700px', margin: '0 auto' } },
        STATS.map((s, i) => React.createElement('div', { key: i, style: { textAlign: 'center' } },
          React.createElement('div', { style: { fontSize: '22px', marginBottom: '4px' } }, s.icon),
          React.createElement('div', { style: { color: [styles.cyan, styles.green, styles.orange, styles.purple][i], fontSize: '20px', fontWeight: '800' } }, s.value),
          React.createElement('div', { style: { color: styles.muted, fontSize: '11px' } }, s.label)
        ))
      )
    ),

    // AD UNIT - LEADERBOARD
    React.createElement('div', { style: { maxWidth: '1280px', margin: '0 auto', padding: '0 24px' } },
      React.createElement(AdUnit, { slot: '1234567890', format: 'horizontal' })
    ),

    // PLATFORM TICKER
    React.createElement('div', { style: { maxWidth: '1280px', margin: '0 auto', padding: '0 24px 32px' } },
      React.createElement('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' } },
        PLATFORMS.map((p, i) => React.createElement('span', { key: i, style: { background: '#111', border: '1px solid #1a1a2e', color: styles.muted, fontSize: '11px', padding: '4px 12px', borderRadius: '20px' } }, p))
      )
    ),

    // MAIN CONTENT
    React.createElement('main', { style: { maxWidth: '1280px', margin: '0 auto', padding: '0 24px 60px' } },

      // CATEGORIES
      React.createElement('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' } },
        CATEGORIES.map(cat => React.createElement('button', {
          key: cat.id,
          onClick: () => setCategory(cat.id),
          style: { background: category === cat.id ? cat.color : '#111', color: category === cat.id ? '#000' : styles.muted, border: '1px solid ' + (category === cat.id ? cat.color : '#1a1a2e'), borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', transition: 'all 0.2s' }
        }, cat.icon + ' ' + cat.label))
      ),

      // RESULTS COUNT
      React.createElement('div', { style: { color: styles.muted, fontSize: '14px', marginBottom: '20px' } },
        'Showing ' + filtered.length + ' trending topics',
        search && ' for "' + search + '"'
      ),

      // GRID
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px', marginBottom: '40px' } },
        filtered.slice(0, 6).map(trend => React.createElement(TrendCard, { key: trend.id, trend, onClick: setSelectedTrend })),

        // Mid-content AD
        React.createElement('div', { style: { gridColumn: '1 / -1' } },
          React.createElement(AdUnit, { slot: '0987654321', format: 'rectangle' })
        ),

        filtered.slice(6).map(trend => React.createElement(TrendCard, { key: trend.id, trend, onClick: setSelectedTrend }))
      ),

      // NEWSLETTER
      React.createElement(Newsletter, null),

      // AD UNIT
      React.createElement(AdUnit, { slot: '1122334455', format: 'auto' }),

      // ABOUT SECTION
      React.createElement('section', { style: { margin: '60px 0', textAlign: 'center' } },
        React.createElement('h2', { style: { color: styles.fg, fontSize: '32px', fontWeight: '800', marginBottom: '16px' } }, 'How TrendPulse AI Works'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px', marginTop: '32px' } },
          [
            { icon: '🔄', title: 'Real-Time Scanning', desc: 'We scan 20+ platforms every hour to detect emerging trends before they go mainstream.' },
            { icon: '🤖', title: 'AI Classification', desc: 'Machine learning categorizes and ranks trends by search volume, growth rate, and virality.' },
            { icon: '📊', title: 'Insight Generation', desc: 'Get deep context, related keywords, and opportunity scores for every trending topic.' },
            { icon: '💰', title: 'Monetization Signals', desc: 'Discover which trends have affiliate programs, ad potential, or product opportunities.' },
          ].map((item, i) => React.createElement('div', { key: i, style: { background: styles.card, border: '1px solid #1a1a2e', borderRadius: '12px', padding: '24px' } },
            React.createElement('div', { style: { fontSize: '36px', marginBottom: '12px' } }, item.icon),
            React.createElement('h3', { style: { color: styles.fg, fontSize: '16px', fontWeight: '700', marginBottom: '8px' } }, item.title),
            React.createElement('p', { style: { color: styles.muted, fontSize: '13px', lineHeight: '1.6' } }, item.desc)
          ))
        )
      )
    ),

    // FOOTER
    React.createElement('footer', { style: { background: '#050505', borderTop: '1px solid #1a1a2e', padding: '40px 24px', textAlign: 'center' } },
      React.createElement('div', { style: { maxWidth: '1280px', margin: '0 auto' } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '16px' } },
          React.createElement('span', { style: { fontSize: '24px' } }, '📡'),
          React.createElement('span', { style: { fontFamily: 'Orbitron, sans-serif', fontSize: '16px', fontWeight: '900', color: styles.cyan } }, 'TREND'),
          React.createElement('span', { style: { fontFamily: 'Orbitron, sans-serif', fontSize: '16px', fontWeight: '900', color: styles.fg } }, 'PULSE'),
          React.createElement('span', { style: { fontFamily: 'Orbitron, sans-serif', fontSize: '16px', fontWeight: '900', color: styles.green } }, ' AI')
        ),
        React.createElement('p', { style: { color: styles.muted, fontSize: '13px', marginBottom: '16px' } }, 'Real-time trending topics & search insights. Updated every 60 minutes.'),
        React.createElement('div', { style: { display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '16px' } },
          ['Privacy Policy', 'Terms of Service', 'Contact', 'Advertise', 'API Access'].map((link, i) =>
            React.createElement('a', { key: i, href: '#', style: { color: styles.muted, textDecoration: 'none', fontSize: '13px' } }, link)
          )
        ),
        React.createElement('p', { style: { color: '#444', fontSize: '12px' } }, '© 2025 TrendPulse AI. All rights reserved. Data updated in real-time from public sources.')
      )
    ),

    // MODAL
    selectedTrend && React.createElement(TrendModal, { trend: selectedTrend, onClose: () => setSelectedTrend(null) })
  );
}
