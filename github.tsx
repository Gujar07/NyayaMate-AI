import React, { useState, useEffect, useRef } from 'react';
import {
  Scale, Shield, MessageSquare, FileText, FileCode, BookOpen, Bookmark, Settings,
  Sun, Moon, Menu, X, ChevronRight, Search, Plus, Send, Paperclip, Copy, ThumbsUp,
  ThumbsDown, AlertTriangle, CheckCircle2, ExternalLink, Trash2, Edit2, Download,
  RefreshCw, Lock, Globe, User, Bell, ChevronDown, Sparkles, Filter, Info, ArrowRight,
  UploadCloud, FileCheck, HelpCircle, Building, Users, Eye, HelpCircle as QuestionIcon
} from 'lucide-react';

// --- DISCLAIMER NOTICE COMPONENT ---
const DisclaimerBanner = () => (
  <div className="bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-800/50 px-4 py-2 text-xs md:text-sm text-amber-800 dark:text-amber-300 flex items-center justify-between gap-2">
    <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
      <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
      <span>
        <strong>Legal Disclaimer:</strong> NyayaMate AI provides general legal information for educational purposes only and does not constitute formal legal advice. Consult a qualified advocate for specific legal issues.
      </span>
    </div>
  </div>
);

// --- MAIN APPLICATION COMPONENT ---
export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Settings State
  const [settings, setSettings] = useState({
    language: 'English',
    theme: 'light',
    autoSave: true,
    citationsVisible: true
  });

  // Dark Mode Toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // --- MOCK DATA STORES ---
  const [savedItems, setSavedItems] = useState([
    { id: '1', type: 'conversation', title: 'Landlord Deposit Dispute Notice', date: '2026-10-12', category: 'Tenancy' },
    { id: '2', type: 'resource', title: 'National Consumer Helpline Portal', url: 'https://consumerhelpline.gov.in/', category: 'Consumer Rights' },
    { id: '3', type: 'draft', title: 'Security Deposit Refund Demand Letter', date: '2026-10-15', category: 'Notice' }
  ]);

  const [conversations, setConversations] = useState([
    { id: 'c1', title: 'Security Deposit Refund Process', date: 'Today', preview: 'What are my rights if my landlord in Bengaluru delays returning my security deposit?' },
    { id: 'c2', title: 'Cyber Fraud Reporting Steps', date: 'Yesterday', preview: 'I lost money through a UPI phishing scam. What immediate steps should I take?' },
    { id: 'c3', title: 'Defective Laptop Warranty Claim', date: 'Oct 18, 2026', preview: 'Drafting a legal notice to the manufacturer under Consumer Protection Act.' }
  ]);

  // Render view handler
  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingView setCurrentView={setCurrentView} showToast={showToast} />;
      case 'dashboard':
        return <DashboardView setCurrentView={setCurrentView} conversations={conversations} showToast={showToast} />;
      case 'chat':
        return <AIChatView showToast={showToast} savedItems={savedItems} setSavedItems={setSavedItems} />;
      case 'conversations':
        return <ConversationsView conversations={conversations} setConversations={setConversations} setCurrentView={setCurrentView} showToast={showToast} />;
      case 'documents':
        return <DocumentAssistantView showToast={showToast} />;
      case 'drafts':
        return <DraftGeneratorView showToast={showToast} savedItems={savedItems} setSavedItems={setSavedItems} />;
      case 'resources':
        return <LegalResourcesView showToast={showToast} savedItems={savedItems} setSavedItems={setSavedItems} />;
      case 'saved':
        return <SavedItemsView savedItems={savedItems} setSavedItems={setSavedItems} showToast={showToast} />;
      case 'settings':
        return <SettingsView settings={settings} setSettings={setSettings} darkMode={darkMode} setDarkMode={setDarkMode} showToast={showToast} />;
      default:
        return <LandingView setCurrentView={setCurrentView} showToast={showToast} />;
    }
  };

  return (
    <div className={`min-h-screen font-sans bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 flex flex-col transition-colors duration-200`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-4 py-3 rounded-lg shadow-xl text-sm flex items-center gap-2 border border-slate-700 dark:border-slate-300 animate-bounce">
          <Sparkles className="w-4 h-4 text-teal-400 dark:text-teal-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Disclaimer */}
      <DisclaimerBanner />

      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-600 dark:text-slate-300 hidden md:block"
            title="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-600 dark:text-slate-300 md:hidden"
            title="Toggle Mobile Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo Brand */}
          <div 
            onClick={() => setCurrentView('landing')} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="bg-gradient-to-tr from-slate-900 to-teal-700 dark:from-teal-600 dark:to-cyan-500 p-2 rounded-xl text-white shadow-md group-hover:scale-105 transition-transform">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                NyayaMate <span className="text-teal-600 dark:text-teal-400 font-extrabold text-sm px-1.5 py-0.5 bg-teal-50 dark:bg-teal-950/60 rounded border border-teal-200 dark:border-teal-800">AI</span>
              </span>
            </div>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2">
          {/* Landing vs App Switcher button */}
          {currentView === 'landing' ? (
            <button
              onClick={() => setCurrentView('dashboard')}
              className="px-3.5 py-1.5 text-xs md:text-sm font-medium bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow-sm transition flex items-center gap-1.5"
            >
              <span>Launch App</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentView('landing')}
              className="hidden sm:flex px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </button>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
            title="Toggle Theme"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-72 md:w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50 text-xs md:text-sm">
                <div className="px-4 py-2 font-semibold border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                  <span>Notifications</span>
                  <span className="text-xs text-teal-600 dark:text-teal-400">1 New</span>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                  <div className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer">
                    <p className="font-medium text-slate-800 dark:text-slate-200">New Template Added</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Consumer Protection complaint form updated with 2026 guidelines.</p>
                  </div>
                  <div className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer opacity-75">
                    <p className="font-medium text-slate-800 dark:text-slate-200">System Update</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Bharatiya Nyaya Sanhita (BNS) citation indexing complete.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setUserProfileOpen(!userProfileOpen)}
              className="flex items-center gap-2 p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
            >
              <div className="w-8 h-8 rounded-full bg-slate-800 dark:bg-slate-700 text-white flex items-center justify-center font-bold text-xs border border-teal-500/50">
                NM
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {userProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50 text-sm">
                <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-700">
                  <p className="font-semibold text-slate-900 dark:text-white">Citizen User</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">demo@nyayamate.in</p>
                </div>
                <button
                  onClick={() => { setCurrentView('settings'); setUserProfileOpen(false); }}
                  className="w-full text-left px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2"
                >
                  <Settings className="w-4 h-4 text-slate-400" /> Preferences
                </button>
                <div className="border-t border-slate-100 dark:border-slate-700 my-1"></div>
                <div className="px-4 py-2 text-xs text-slate-400">
                  Mode: Demo Workspace (No Server Backend)
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* App Body Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <aside
          className={`bg-white dark:bg-slate-800/90 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-all duration-300 z-30
            ${sidebarOpen ? 'w-64' : 'w-16'} 
            ${mobileMenuOpen ? 'fixed inset-y-0 left-0 z-50 w-64 block' : 'hidden md:flex'}
          `}
        >
          <div className="p-3 flex flex-col gap-1 flex-1 overflow-y-auto">
            <SidebarItem
              icon={<Shield />}
              label="Dashboard"
              active={currentView === 'dashboard'}
              onClick={() => { setCurrentView('dashboard'); setMobileMenuOpen(false); }}
              collapsed={!sidebarOpen}
            />
            <SidebarItem
              icon={<MessageSquare />}
              label="AI Legal Assistant"
              active={currentView === 'chat'}
              onClick={() => { setCurrentView('chat'); setMobileMenuOpen(false); }}
              collapsed={!sidebarOpen}
              badge="AI"
            />
            <SidebarItem
              icon={<Sparkles />}
              label="My Conversations"
              active={currentView === 'conversations'}
              onClick={() => { setCurrentView('conversations'); setMobileMenuOpen(false); }}
              collapsed={!sidebarOpen}
            />
            <SidebarItem
              icon={<FileText />}
              label="Document Assistant"
              active={currentView === 'documents'}
              onClick={() => { setCurrentView('documents'); setMobileMenuOpen(false); }}
              collapsed={!sidebarOpen}
            />
            <SidebarItem
              icon={<FileCode />}
              label="Draft Generator"
              active={currentView === 'drafts'}
              onClick={() => { setCurrentView('drafts'); setMobileMenuOpen(false); }}
              collapsed={!sidebarOpen}
            />
            <SidebarItem
              icon={<BookOpen />}
              label="Legal Resources"
              active={currentView === 'resources'}
              onClick={() => { setCurrentView('resources'); setMobileMenuOpen(false); }}
              collapsed={!sidebarOpen}
            />
            <SidebarItem
              icon={<Bookmark />}
              label="Saved Items"
              active={currentView === 'saved'}
              onClick={() => { setCurrentView('saved'); setMobileMenuOpen(false); }}
              collapsed={!sidebarOpen}
            />
            <div className="my-2 border-t border-slate-200 dark:border-slate-700/60"></div>
            <SidebarItem
              icon={<Settings />}
              label="Settings"
              active={currentView === 'settings'}
              onClick={() => { setCurrentView('settings'); setMobileMenuOpen(false); }}
              collapsed={!sidebarOpen}
            />
          </div>

          {/* Quick Info Box at bottom of sidebar */}
          {sidebarOpen && (
            <div className="p-3 m-3 bg-slate-100 dark:bg-slate-700/40 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
              <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-teal-600" /> NyayaMate Safety
              </p>
              <p className="text-[11px] leading-relaxed">
                Information is verified against Indian Codes (BNS, IT Act, Consumer Protection).
              </p>
            </div>
          )}
        </aside>

        {/* Mobile backdrop */}
        {mobileMenuOpen && (
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto relative bg-slate-50 dark:bg-slate-900 flex flex-col">
          {renderView()}
        </main>
      </div>
    </div>
  );
}

// --- SIDEBAR ITEM HELPER COMPONENT ---
function SidebarItem({ icon, label, active, onClick, collapsed, badge }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 relative group
        ${active
          ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800/60 shadow-sm'
          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
        }
      `}
      title={collapsed ? label : undefined}
    >
      <div className={`${active ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`}>
        {React.cloneElement(icon, { className: 'w-5 h-5' })}
      </div>
      {!collapsed && <span className="truncate flex-1 text-left">{label}</span>}
      {!collapsed && badge && (
        <span className="text-[10px] bg-teal-600 text-white font-bold px-1.5 py-0.2 rounded-full">
          {badge}
        </span>
      )}
    </button>
  );
}

// ==========================================
// 1. LANDING PAGE VIEW
// ==========================================
function LandingView({ setCurrentView, showToast }) {
  return (
    <div className="flex-1 overflow-y-auto">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-slate-100 via-slate-50 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 dark:bg-teal-950/80 border border-teal-300 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-xs font-semibold mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>Built for Indian Citizens, Legal Learners & Small Businesses</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Legal Clarity Starts Here.
          </h1>

          <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Understand Indian legal information in simple language, explore trusted statutory resources, and prepare your next steps with confidence.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setCurrentView('chat')}
              className="w-full sm:w-auto px-7 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-teal-500/25 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Ask a Legal Question</span>
            </button>
            <button
              onClick={() => setCurrentView('resources')}
              className="w-full sm:w-auto px-7 py-3.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-xl border border-slate-300 dark:border-slate-700 transition-all text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm"
            >
              <BookOpen className="w-5 h-5 text-teal-600" />
              <span>Explore Legal Resources</span>
            </button>
          </div>

          {/* Visual Interactive Preview Box */}
          <div className="mt-12 max-w-4xl mx-auto bg-white dark:bg-slate-800/90 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden text-left">
            <div className="bg-slate-100 dark:bg-slate-900/80 px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 ml-2">NyayaMate AI — Interactive Prompt Preview</span>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  You
                </div>
                <div className="bg-slate-100 dark:bg-slate-700/60 p-3.5 rounded-2xl text-sm max-w-2xl text-slate-800 dark:text-slate-200">
                  What are my statutory remedies under Indian consumer law if a brand refuses to repair a defective television during the warranty period?
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  AI
                </div>
                <div className="bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-800/60 p-4 rounded-2xl text-sm max-w-2xl text-slate-800 dark:text-slate-200 space-y-2">
                  <p className="font-semibold text-teal-900 dark:text-teal-300">Consumer Protection Act, 2019 Overview:</p>
                  <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                    Under Section 2(7) and Section 35 of the Consumer Protection Act 2019, you have the right to file a legal notice and subsequently lodge a formal complaint via the <strong>e-Daakhil portal</strong> or National Consumer Helpline.
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-xs text-teal-700 dark:text-teal-400 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    <span>Includes citation to Consumer Disputes Redressal Commission norms.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Designed for Clarity, Accessibility & Accuracy</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm sm:text-base">Comprehensive features tailored for Indian citizens, tenants, employees, and business owners.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<MessageSquare className="w-6 h-6 text-teal-600" />}
            title="AI Legal Assistant"
            description="Ask legal questions in plain language and receive structured explanations with reference to relevant Acts."
          />
          <FeatureCard
            icon={<FileText className="w-6 h-6 text-teal-600" />}
            title="Document Assistant"
            description="Upload rental agreements, employment contracts, or notices to receive plain-language summaries and key clause highlights."
          />
          <FeatureCard
            icon={<FileCode className="w-6 h-6 text-teal-600" />}
            title="Legal Draft Generator"
            description="Create formal draft notices for security deposit refund, salary claims, or consumer complaint letters quickly."
          />
          <FeatureCard
            icon={<BookOpen className="w-6 h-6 text-teal-600" />}
            title="Trusted Legal Resources"
            description="Direct links to official portals including India Code, Supreme Court of India, eCourts, NALSA, and Cybercrime."
          />
          <FeatureCard
            icon={<Shield className="w-6 h-6 text-teal-600" />}
            title="Privacy & Data Control"
            description="Designed with a privacy-first approach. Local-session storage keeps your queries safe without persistent tracking."
          />
          <FeatureCard
            icon={<Globe className="w-6 h-6 text-teal-600" />}
            title="Multilingual Support"
            description="Access legal guidance and resources in English, Hindi, Tamil, Kannada, and other Indian languages."
          />
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-slate-100 dark:bg-slate-800/50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10">How NyayaMate AI Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Ask Your Question"
              description="Enter your query about tenancy, consumer disputes, cyber claims, or labor issues in conversational language."
            />
            <StepCard
              number="2"
              title="Explore Relevant Information"
              description="Get simplified legal explanations grounded in relevant Indian statutory frameworks and acts."
            />
            <StepCard
              number="3"
              title="Review Sources & Take Action"
              description="Access official links, generate structured notices, or save steps to share with your legal advocate."
            />
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-10">Empowering Individuals & Businesses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-teal-100 dark:bg-teal-950/60 rounded-xl text-teal-700 dark:text-teal-400">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">For Individuals</h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>Tenant rights regarding security deposit withholding and eviction notices.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>Reporting online banking fraud and financial cybercrimes via official portals.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>Drafting formal consumer grievance letters for defective products.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-teal-100 dark:bg-teal-950/60 rounded-xl text-teal-700 dark:text-teal-400">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">For Small Businesses & Startups</h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>Drafting basic payment reminder letters and service contract notices.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>Understanding MSME Samadhaan delayed payment rules and procedures.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>Summarizing non-disclosure agreements (NDAs) and vendor terms.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-100 dark:bg-slate-800/40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FaqItem
              question="Does NyayaMate AI replace an advocate or lawyer?"
              answer="No. NyayaMate AI provides general legal information and document drafting assistance based on Indian law. It is designed to help you prepare and understand your situation, but it is not a substitute for formal legal advice from a qualified advocate."
            />
            <FaqItem
              question="Are the statutory laws updated with the new Bharatiya Nyaya Sanhita (BNS)?"
              answer="Yes, information reference models are trained and aligned with recent statutory updates including the Bharatiya Nyaya Sanhita (BNS), Bharatiya Nagarik Suraksha Sanhita (BNSS), Consumer Protection Act 2019, and IT Act 2000."
            />
            <FaqItem
              question="Is my uploaded document private?"
              answer="Yes. All document analysis in this demo workspace occurs entirely within your browser state. No document data is stored permanently or shared with third parties."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800 text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
              <Scale className="w-5 h-5 text-teal-400" />
              <span>NyayaMate AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Understand Your Rights. Take Your Next Step. Empowering Indian citizens with plain-language legal clarity.
            </p>
          </div>
          <div>
            <p className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">Quick Navigation</p>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setCurrentView('dashboard')} className="hover:text-teal-400">Dashboard</button></li>
              <li><button onClick={() => setCurrentView('chat')} className="hover:text-teal-400">AI Legal Assistant</button></li>
              <li><button onClick={() => setCurrentView('drafts')} className="hover:text-teal-400">Draft Generator</button></li>
              <li><button onClick={() => setCurrentView('resources')} className="hover:text-teal-400">Official Links</button></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">Official Portals</p>
            <ul className="space-y-2 text-xs">
              <li><a href="https://www.indiacode.nic.in/" target="_blank" rel="noreferrer" className="hover:text-teal-400 flex items-center gap-1">India Code <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="https://ecourts.gov.in/" target="_blank" rel="noreferrer" className="hover:text-teal-400 flex items-center gap-1">eCourts Services <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="https://cybercrime.gov.in/" target="_blank" rel="noreferrer" className="hover:text-teal-400 flex items-center gap-1">Cyber Crime Portal <ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">Safety & Legal</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              All information provided is for general educational use in India. Please consult an advocate registered with the Bar Council of India for legal representation.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          © 2026 NyayaMate AI. Frontend Preview Version. Designed for Indian Law Educational Reference.
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition">
      <div className="p-3 bg-teal-50 dark:bg-teal-950/60 rounded-xl w-fit mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }) {
  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm text-center">
      <div className="w-10 h-10 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center mx-auto mb-4 text-lg">
        {number}
      </div>
      <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{description}</p>
    </div>
  );
}

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-4 text-left font-semibold text-slate-900 dark:text-white flex justify-between items-center text-sm sm:text-base"
      >
        <span>{question}</span>
        <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-700/50 pt-3 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. DASHBOARD VIEW
// ==========================================
function DashboardView({ setCurrentView, conversations, showToast }) {
  const [queryInput, setQueryInput] = useState('');

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    if (!queryInput.trim()) return;
    setCurrentView('chat');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 w-full">
      {/* Welcome & Search Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-400 bg-teal-950/80 px-2.5 py-1 rounded-md border border-teal-800">
            Welcome to NyayaMate AI
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-3">
            What legal question can we help you understand today?
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
            Get instant answers referenced with Indian acts, draft legal notices, or analyze agreements.
          </p>

          <form onSubmit={handleQuickSubmit} className="mt-6 flex gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Describe your legal question... (e.g. My landlord refuses to return my deposit)"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-md text-white placeholder-slate-400 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl text-sm transition flex items-center gap-1 shrink-0 shadow-md"
            >
              <span>Ask</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick Tools & Workflows</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardShortcut
            icon={<MessageSquare className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
            title="AI Legal Chat"
            subtitle="Ask questions in natural language"
            onClick={() => setCurrentView('chat')}
          />
          <DashboardShortcut
            icon={<FileCode className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
            title="Draft Generator"
            subtitle="Create formal legal notices"
            onClick={() => setCurrentView('drafts')}
          />
          <DashboardShortcut
            icon={<FileText className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
            title="Document Assistant"
            subtitle="Summarize & analyze contracts"
            onClick={() => setCurrentView('documents')}
          />
          <DashboardShortcut
            icon={<BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
            title="Official Portals"
            subtitle="India Code & Govt Legal services"
            onClick={() => setCurrentView('resources')}
          />
        </div>
      </div>

      {/* Recent Conversations & Saved Items Dual Column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Conversations */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              Recent Conversations (Demo Data)
            </h2>
            <button
              onClick={() => setCurrentView('conversations')}
              className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {conversations.map((c) => (
              <div
                key={c.id}
                onClick={() => setCurrentView('chat')}
                className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-700/60 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">{c.title}</h3>
                  <span className="text-[11px] text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">{c.date}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{c.preview}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Resource Categories Shortcut */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-3">Popular Legal Categories</h2>
            <div className="space-y-2">
              <CategoryBadge label="Tenancy & Rent Control" count="12 guides" onClick={() => setCurrentView('resources')} />
              <CategoryBadge label="Consumer Protection 2019" count="8 guides" onClick={() => setCurrentView('resources')} />
              <CategoryBadge label="Cyber Fraud & IT Act" count="15 guides" onClick={() => setCurrentView('resources')} />
              <CategoryBadge label="Labour & Salary Claims" count="9 guides" onClick={() => setCurrentView('resources')} />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60 text-xs text-slate-500">
            <p className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
              <Shield className="w-3.5 h-3.5 text-teal-600" /> Statutory Compliance
            </p>
            <p className="mt-0.5">Updated to reflect the 2024–2026 Indian legal framework standards.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardShortcut({ icon, title, subtitle, onClick }) {
  return (
    <div
      onClick={onClick}
      className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-teal-500/50 cursor-pointer transition flex items-start gap-3"
    >
      <div className="p-2.5 bg-teal-50 dark:bg-teal-950/60 rounded-xl shrink-0">{icon}</div>
      <div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">{title}</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

function CategoryBadge({ label, count, onClick }) {
  return (
    <div
      onClick={onClick}
      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/40 hover:bg-teal-50 dark:hover:bg-teal-950/40 border border-slate-200/60 dark:border-slate-700 flex justify-between items-center cursor-pointer transition text-xs"
    >
      <span className="font-medium text-slate-700 dark:text-slate-200">{label}</span>
      <span className="text-[10px] text-slate-400 font-mono">{count}</span>
    </div>
  );
}

// ==========================================
// 3. AI LEGAL ASSISTANT VIEW (CHAT INTERFACE)
// ==========================================
function AIChatView({ showToast, savedItems, setSavedItems }) {
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'assistant',
      text: 'Namaste! I am NyayaMate AI. Ask me any legal information question regarding Indian laws, tenancy disputes, consumer rights, or cyber fraud reporting.',
      time: '10:00 AM',
      citations: []
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    // Simulate AI response stream
    setTimeout(() => {
      let botResponse = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: getSimulatedResponse(currentInput),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: [
          { title: 'Bharatiya Nyaya Sanhita (BNS) 2023', code: 'Section 318 - Cheating / Fraud' },
          { title: 'Consumer Protection Act 2019', code: 'Section 35 - Filing Complaints' },
          { title: 'National Cyber Crime Portal', url: 'https://cybercrime.gov.in/' }
        ]
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 1200);
  };

  const handleExampleClick = (promptText) => {
    setInput(promptText);
  };

  const saveMessage = (msg) => {
    setSavedItems([
      ...savedItems,
      { id: Date.now().toString(), type: 'conversation', title: msg.text.substring(0, 30) + '...', date: new Date().toISOString().split('T')[0], category: 'Saved Answer' }
    ]);
    showToast('Saved response to Saved Items');
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-900 overflow-hidden">
      {/* Top Chat Info Header */}
      <div className="bg-white dark:bg-slate-800 px-6 py-3 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
          <span className="font-bold text-slate-800 dark:text-slate-200">NyayaMate Legal Assistant Active</span>
          <span className="hidden sm:inline text-slate-400">| Session Encrypted</span>
        </div>
        <button
          onClick={() => {
            setMessages([{
              id: Date.now().toString(),
              sender: 'assistant',
              text: 'New conversation started. How may I assist you with Indian legal information?',
              time: 'Now',
              citations: []
            }]);
            showToast('New conversation initialized');
          }}
          className="px-3 py-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-lg font-medium transition flex items-center gap-1 text-xs"
        >
          <Plus className="w-3.5 h-3.5" /> New Chat
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-3 max-w-4xl mx-auto ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-sm
                ${m.sender === 'user'
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                  : 'bg-teal-600 text-white'
                }`}
            >
              {m.sender === 'user' ? 'You' : 'AI'}
            </div>

            <div className={`space-y-2 max-w-[85%] sm:max-w-[75%]`}>
              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm
                  ${m.sender === 'user'
                    ? 'bg-slate-800 text-white dark:bg-teal-700 dark:text-white rounded-tr-none'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-tl-none'
                  }`}
              >
                <div className="whitespace-pre-line">{m.text}</div>

                {/* Citation Cards below Assistant Message */}
                {m.citations && m.citations.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700/60 space-y-2">
                    <p className="text-[11px] font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider flex items-center gap-1">
                      <BookOpen className="w-3 h-3" /> Relevant Legal Citations:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {m.citations.map((cit, idx) => (
                        <div key={idx} className="p-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200/80 dark:border-slate-700 text-[11px]">
                          <p className="font-semibold text-slate-800 dark:text-slate-200">{cit.title}</p>
                          <p className="text-slate-500 dark:text-slate-400">{cit.code || cit.url}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Message Footer / Controls */}
              <div className={`flex items-center gap-3 text-[11px] text-slate-400 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <span>{m.time}</span>
                {m.sender === 'assistant' && (
                  <>
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(m.text);
                        showToast('Copied to clipboard');
                      }}
                      className="hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-0.5"
                    >
                      <Copy className="w-3 h-3" /> Copy
                    </button>
                    <button
                      onClick={() => saveMessage(m)}
                      className="hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-0.5"
                    >
                      <Bookmark className="w-3 h-3" /> Save
                    </button>
                    <button onClick={() => showToast('Feedback recorded')} className="hover:text-teal-600">
                      <ThumbsUp className="w-3 h-3" />
                    </button>
                    <button onClick={() => showToast('Feedback recorded')} className="hover:text-amber-600">
                      <ThumbsDown className="w-3 h-3" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-center gap-3 max-w-4xl mx-auto">
            <div className="w-8 h-8 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center">AI</div>
            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs text-slate-500 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-teal-600" />
              <span>Analyzing Indian legal acts & precedents...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Example Prompt Chips (If short message count) */}
      {messages.length <= 2 && (
        <div className="px-4 py-2 max-w-4xl mx-auto w-full">
          <p className="text-[11px] text-slate-500 font-semibold mb-2">Example Indian Legal Queries:</p>
          <div className="flex flex-wrap gap-2">
            <PromptChip
              label="My landlord is refusing to return my security deposit."
              onClick={() => handleExampleClick("My landlord in Bengaluru is withholding my security deposit without valid reason. What legal notice can I send under Tenancy law?")}
            />
            <PromptChip
              label="How can I report online UPI fraud in India?"
              onClick={() => handleExampleClick("I was scammed via UPI transaction. How do I report it on the National Cyber Crime Reporting Portal within 24 hours?")}
            />
            <PromptChip
              label="What can I do if a product I purchased is defective?"
              onClick={() => handleExampleClick("I bought a defective appliance online and seller refuses refund. How to file complaint on National Consumer Helpline?")}
            />
            <PromptChip
              label="Help me draft a salary payment request."
              onClick={() => handleExampleClick("My employer has withheld my salary for 2 months. How can I draft a formal request notice under Indian labor rules?")}
            />
          </div>
        </div>
      )}

      {/* Input Composer */}
      <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto space-y-2">
          <div className="relative flex items-center">
            <textarea
              rows="2"
              placeholder="Ask a legal question in plain English or Hindi..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="w-full pl-4 pr-24 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
            <div className="absolute right-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => showToast('Attachment capability ready for Document Assistant')}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                title="Attach Document"
              >
                <Paperclip className="w-4 h-4" />
              </button>
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-[10px] text-center text-slate-400">
            NyayaMate AI outputs are general information, not advocate representation. Review statutory terms carefully.
          </p>
        </form>
      </div>
    </div>
  );
}

function PromptChip({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/60 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-700 dark:text-slate-300 transition text-left"
    >
      {label}
    </button>
  );
}

function getSimulatedResponse(query) {
  const q = query.toLowerCase();
  if (q.includes('deposit') || q.includes('landlord') || q.includes('rent')) {
    return `Regarding Landlord Security Deposit Recovery in India:

1. **Tenancy Terms Review:** Review the lock-in period and deduction clauses in your registered or un-registered Lease Agreement.
2. **Legal Notice Procedure:** You can send a formal "Legal Notice for Refund of Security Deposit" giving the landlord 15 days to refund the amount with interest.
3. **Small Claims / Rent Tribunal:** If unfulfilled, claims can be submitted to the local Rent Authority under applicable State Tenancy Acts.`;
  }
  if (q.includes('cyber') || q.includes('fraud') || q.includes('upi') || q.includes('scam')) {
    return `Immediate Steps for Online Financial Fraud in India:

1. **Golden Hour Reporting:** Call national cybercrime helpline **1930** immediately to freeze funds in transit.
2. **National Portal:** File an official incident report at **https://cybercrime.gov.in/** (Cyber Crime Portal).
3. **Bank Dispute:** Submit a written dispute letter to your bank branch within 3 days for zero-liability protection under RBI fraud guidelines.`;
  }
  return `Indian Legal Information Summary:

Based on statutory principles under Indian Law:
1. **Rights & Remedies:** You hold rights to issue formal demand communications before initiating statutory litigation.
2. **Documentation:** Ensure all receipts, written WhatsApp/Email exchanges, and agreements are preserved as evidentiary records.
3. **Next Action Step:** Consider utilizing our **Draft Generator** tab to prepare a formal notice template tailored to this situation.`;
}

// ==========================================
// 4. MY CONVERSATIONS VIEW
// ==========================================
function ConversationsView({ conversations, setConversations, setCurrentView, showToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const filtered = conversations.filter(c =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    setConversations(conversations.filter(c => c.id !== id));
    showToast('Conversation deleted');
  };

  const handleSaveEdit = (id) => {
    setConversations(conversations.map(c => c.id === id ? { ...c, title: editTitle } : c));
    setEditingId(null);
    showToast('Title updated');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Conversations</h1>
          <p className="text-xs sm:text-sm text-slate-500">Access your historical AI legal consultations</p>
        </div>
        <button
          onClick={() => setCurrentView('chat')}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Start New Chat
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search saved conversations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-500 text-sm">
            No matching conversations found.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-start justify-between gap-4"
            >
              <div className="flex-1">
                {editingId === item.id ? (
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="px-2 py-1 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded text-xs text-slate-900 dark:text-white"
                    />
                    <button onClick={() => handleSaveEdit(item.id)} className="px-2 py-1 bg-teal-600 text-white text-xs rounded">Save</button>
                    <button onClick={() => setEditingId(null)} className="px-2 py-1 bg-slate-200 dark:bg-slate-700 text-xs rounded">Cancel</button>
                  </div>
                ) : (
                  <h3
                    onClick={() => setCurrentView('chat')}
                    className="font-bold text-sm text-slate-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer"
                  >
                    {item.title}
                  </h3>
                )}
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{item.preview}</p>
                <span className="inline-block mt-2 text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-700/60 px-2 py-0.5 rounded">
                  {item.date}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => { setEditingId(item.id); setEditTitle(item.title); }}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                  title="Rename"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ==========================================
// 5. DOCUMENT ASSISTANT VIEW
// ==========================================
function DocumentAssistantView({ showToast }) {
  const [selectedDoc, setSelectedDoc] = useState(null);

  const sampleDocs = [
    {
      name: 'Residential_Lease_Agreement_Bengaluru.pdf',
      size: '1.2 MB',
      type: 'PDF',
      summary: 'Standard 11-month residential rental agreement with 10% annual escalation and 2-month notice clause.',
      clauses: [
        'Security Deposit Refund: Clause 4 states deposit must be returned within 30 days of vacation.',
        'Maintenance Responsibility: Tenant covers routine minor repairs under ₹1,000.',
        'Termination Notice: 2 months written notice required by either party.'
      ]
    },
    {
      name: 'Software_Vendor_Service_Agreement.pdf',
      size: '840 KB',
      type: 'PDF',
      summary: 'B2B software development & maintenance contract with indemnity limit capped at total invoice value.',
      clauses: [
        'Payment Terms: Net 30 days upon invoice issuance.',
        'Jurisdiction: Governed by the courts of New Delhi, India.'
      ]
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Document Assistant</h1>
        <p className="text-xs sm:text-sm text-slate-500">Upload legal agreements, contracts, or notices for plain-language clause breakdown.</p>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div className="p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl bg-white dark:bg-slate-800 text-center hover:border-teal-500 transition cursor-pointer">
        <div className="w-12 h-12 bg-teal-50 dark:bg-teal-950/60 rounded-full flex items-center justify-center mx-auto text-teal-600 dark:text-teal-400 mb-3">
          <UploadCloud className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm sm:text-base">Drag & drop your legal document here</h3>
        <p className="text-xs text-slate-400 mt-1">Supports PDF, DOCX, and scanned images up to 10MB</p>
        <button
          onClick={() => {
            setSelectedDoc(sampleDocs[0]);
            showToast('Sample agreement loaded into workspace');
          }}
          className="mt-4 px-4 py-2 bg-slate-900 dark:bg-teal-600 text-white font-semibold rounded-xl text-xs hover:bg-slate-800 transition"
        >
          Load Demo Rental Agreement
        </button>
      </div>

      {/* Document Analysis Result Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sample Uploaded File List */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">Sample Analyzed Files</h2>
          {sampleDocs.map((doc, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedDoc(doc)}
              className={`p-4 rounded-2xl border cursor-pointer transition ${selectedDoc?.name === doc.name
                  ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 text-teal-900 dark:text-teal-200'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-teal-600 shrink-0" />
                <div className="truncate">
                  <p className="font-bold text-xs truncate">{doc.name}</p>
                  <p className="text-[10px] text-slate-400">{doc.size} • {doc.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Breakdown View */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          {selectedDoc ? (
            <div className="space-y-6">
              <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded">
                  AI Summary Preview
                </span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">{selectedDoc.name}</h2>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {selectedDoc.summary}
                </p>
              </div>

              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">Key Clauses Extracted</h3>
                <div className="space-y-3">
                  {selectedDoc.clauses.map((clause, i) => (
                    <div key={i} className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-700/80 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{clause}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => showToast('Exported summary to text file')}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Export Key Terms
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Select a sample document on the left or upload a file to preview AI extraction.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. LEGAL DRAFT GENERATOR VIEW
// ==========================================
function DraftGeneratorView({ showToast, savedItems, setSavedItems }) {
  const [selectedTemplate, setSelectedTemplate] = useState('deposit');
  const [formData, setFormData] = useState({
    senderName: 'Aarav Sharma',
    recipientName: 'Ramesh Kumar (Landlord)',
    propertyAddress: 'Flat 302, Green Residence, Indiranagar, Bengaluru',
    depositAmount: '₹80,000',
    noticeDays: '15'
  });

  const generateDraftText = () => {
    if (selectedTemplate === 'deposit') {
      return `LEGAL NOTICE FOR REFUND OF SECURITY DEPOSIT

Date: ${new Date().toLocaleDateString('en-IN')}

To,
${formData.recipientName}
Property Address: ${formData.propertyAddress}

From,
${formData.senderName}

Subject: Demand Notice for Return of Security Deposit Amounting to ${formData.depositAmount}.

Sir/Madam,

This notice serves as a formal communication regarding the residential tenancy agreement for the premises situated at ${formData.propertyAddress}.

1. That I have duly handed over vacant possession of the premises to you on time in good condition.
2. That as per agreement terms, the security deposit of ${formData.depositAmount} was to be refunded immediately upon handover.
3. You are hereby called upon to refund the full security deposit of ${formData.depositAmount} within ${formData.noticeDays} days of receiving this notice, failing which I shall be constrained to initiate appropriate legal proceedings under applicable laws.

Yours sincerely,
${formData.senderName}`;
    }

    return `CONSUMER COMPLAINT FORMAL DEMAND NOTICE

Date: ${new Date().toLocaleDateString('en-IN')}

To,
Customer Support Manager,
Authorized Brand Service Center

From: ${formData.senderName}

Subject: Final Opportunity to Rectify Defective Product / Service Failure.

Sir/Madam,

Take notice that despite multiple requests, the product/service issues remain unaddressed under warranty terms. Kindly fulfill repair/replacement within 7 business days, failing which an online complaint on the National Consumer Helpline (e-Daakhil) will be initiated.

Sincerely,
${formData.senderName}`;
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(generateDraftText());
    showToast('Draft copied to clipboard');
  };

  const handleSaveDraft = () => {
    setSavedItems([
      ...savedItems,
      { id: Date.now().toString(), type: 'draft', title: `${selectedTemplate.toUpperCase()} Notice Draft`, date: new Date().toISOString().split('T')[0], category: 'Legal Draft' }
    ]);
    showToast('Draft saved to Saved Items');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Legal Draft Generator</h1>
        <p className="text-xs sm:text-sm text-slate-500">Select a legal notice template, fill in basic details, and generate editable text.</p>
      </div>

      {/* Template Selector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <TemplateCard
          title="Security Deposit Refund"
          description="Demand notice for landlords withholding security deposits."
          selected={selectedTemplate === 'deposit'}
          onClick={() => setSelectedTemplate('deposit')}
        />
        <TemplateCard
          title="Consumer Complaint Notice"
          description="Formal notice for defective goods or service failures."
          selected={selectedTemplate === 'consumer'}
          onClick={() => setSelectedTemplate('consumer')}
        />
        <TemplateCard
          title="Unpaid Salary Request"
          description="Demand letter for delayed salary payments."
          selected={selectedTemplate === 'salary'}
          onClick={() => setSelectedTemplate('salary')}
        />
        <TemplateCard
          title="Business Payment Reminder"
          description="Overdue invoice reminder for MSME & B2B claims."
          selected={selectedTemplate === 'business'}
          onClick={() => setSelectedTemplate('business')}
        />
      </div>

      {/* Form + Live Draft Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Inputs */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-3">
            Enter Notice Details
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Your Full Name (Sender)</label>
            <input
              type="text"
              value={formData.senderName}
              onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Recipient Name / Opposite Party</label>
            <input
              type="text"
              value={formData.recipientName}
              onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Property or Transaction Address</label>
            <input
              type="text"
              value={formData.propertyAddress}
              onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Amount Claimed</label>
              <input
                type="text"
                value={formData.depositAmount}
                onChange={(e) => setFormData({ ...formData, depositAmount: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Notice Days</label>
              <input
                type="text"
                value={formData.noticeDays}
                onChange={(e) => setFormData({ ...formData, noticeDays: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>
        </div>

        {/* Live Preview Text Area */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 pb-3 mb-3">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Generated Draft Preview</h2>
              <span className="text-[10px] text-teal-600 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded font-mono">
                Live Preview
              </span>
            </div>

            <textarea
              rows="12"
              value={generateDraftText()}
              readOnly
              className="w-full p-4 bg-slate-50 dark:bg-slate-900 font-mono text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl leading-relaxed focus:outline-none resize-none"
            />
          </div>

          <div className="flex gap-2 pt-3">
            <button
              onClick={handleCopy}
              className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Copy className="w-3.5 h-3.5" /> Copy Draft
            </button>
            <button
              onClick={handleSaveDraft}
              className="px-4 py-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-semibold rounded-xl text-xs transition flex items-center gap-1"
            >
              <Bookmark className="w-3.5 h-3.5" /> Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TemplateCard({ title, description, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-2xl border cursor-pointer transition ${selected
          ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 text-teal-900 dark:text-teal-200 shadow-sm'
          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300'
        }`}
    >
      <h3 className="font-bold text-xs sm:text-sm">{title}</h3>
      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{description}</p>
    </div>
  );
}

// ==========================================
// 7. LEGAL RESOURCES PAGE
// ==========================================
function LegalResourcesView({ showToast, savedItems, setSavedItems }) {
  const [filterCategory, setFilterCategory] = useState('All');

  const resources = [
    {
      title: 'India Code - Official Repository of Central & State Acts',
      url: 'https://www.indiacode.nic.in/',
      category: 'Acts & Code',
      description: 'Official digital repository containing updated Indian legislation, acts, and statutory rules.'
    },
    {
      title: 'Supreme Court of India Official Portal',
      url: 'https://www.sci.gov.in/',
      category: 'Courts',
      description: 'Official cause lists, judgments, orders, and case status search for the Supreme Court.'
    },
    {
      title: 'eCourts Services Portal',
      url: 'https://ecourts.gov.in/',
      category: 'Courts',
      description: 'Unified judicial services portal for District and High Courts across Indian states.'
    },
    {
      title: 'National Legal Services Authority (NALSA)',
      url: 'https://nalsa.gov.in/',
      category: 'Legal Aid',
      description: 'Free legal aid services and Lok Adalat information for eligible citizens.'
    },
    {
      title: 'National Cyber Crime Reporting Portal',
      url: 'https://cybercrime.gov.in/',
      category: 'Cyber Crime',
      description: 'Government helpline portal to report online financial fraud, cyberstalking, and digital crimes.'
    },
    {
      title: 'National Consumer Helpline (NCH)',
      url: 'https://consumerhelpline.gov.in/',
      category: 'Consumer Rights',
      description: 'Lodge consumer complaints and track grievance resolution with registered brands.'
    }
  ];

  const filtered = filterCategory === 'All' ? resources : resources.filter(r => r.category === filterCategory);

  const handleBookmarkResource = (res) => {
    setSavedItems([
      ...savedItems,
      { id: Date.now().toString(), type: 'resource', title: res.title, url: res.url, category: res.category }
    ]);
    showToast('Resource bookmarked');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Official Legal Resources & Portals</h1>
        <p className="text-xs sm:text-sm text-slate-500">Verified links to official Government of India judicial and statutory portals.</p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {['All', 'Acts & Code', 'Courts', 'Legal Aid', 'Cyber Crime', 'Consumer Rights'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${filterCategory === cat
                ? 'bg-teal-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Resources Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between hover:shadow-md transition"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded">
                  {item.category}
                </span>
                <button
                  onClick={() => handleBookmarkResource(item)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  title="Bookmark"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">{item.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{item.description}</p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex justify-between items-center">
              <span className="text-[11px] font-mono text-slate-400 truncate max-w-[200px]">{item.url}</span>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-slate-900 dark:bg-teal-600 hover:bg-slate-800 text-white rounded-lg text-xs font-medium transition flex items-center gap-1 shrink-0"
              >
                <span>Visit Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 8. SAVED ITEMS PAGE
// ==========================================
function SavedItemsView({ savedItems, setSavedItems, showToast }) {
  const [activeTab, setActiveTab] = useState('all');

  const handleDelete = (id) => {
    setSavedItems(savedItems.filter(item => item.id !== id));
    showToast('Saved item removed');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Saved Items</h1>
        <p className="text-xs sm:text-sm text-slate-500">Your bookmarked AI responses, notice drafts, and legal resources.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-700 gap-6 text-xs sm:text-sm font-semibold">
        <button
          onClick={() => setActiveTab('all')}
          className={`pb-2 transition border-b-2 ${activeTab === 'all' ? 'border-teal-600 text-teal-600 dark:text-teal-400' : 'border-transparent text-slate-500'}`}
        >
          All Items ({savedItems.length})
        </button>
      </div>

      {/* Items List */}
      <div className="space-y-3">
        {savedItems.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-500 text-sm">
            No saved items yet.
          </div>
        ) : (
          savedItems.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase font-bold text-teal-600 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded">
                    {item.type}
                  </span>
                  {item.category && <span className="text-[10px] text-slate-400">{item.category}</span>}
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">{item.title}</h3>
                {item.url && <p className="text-xs text-teal-600 dark:text-teal-400 mt-1 font-mono">{item.url}</p>}
              </div>

              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 text-slate-400 hover:text-red-600 rounded-lg transition"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ==========================================
// 9. SETTINGS PAGE
// ==========================================
function SettingsView({ settings, setSettings, darkMode, setDarkMode, showToast }) {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Preferences & Settings</h1>
        <p className="text-xs sm:text-sm text-slate-500">Configure interface preferences, default language, and session display.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-6 shadow-sm">
        {/* Appearance Mode */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Dark Theme Mode</h3>
            <p className="text-xs text-slate-500">Toggle dark color palette for late night reading.</p>
          </div>
          <button
            onClick={() => {
              setDarkMode(!darkMode);
              showToast(`Switched to ${!darkMode ? 'Dark' : 'Light'} mode`);
            }}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${darkMode ? 'bg-teal-600' : 'bg-slate-300'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : ''}`} />
          </button>
        </div>

        {/* Preferred Language */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Preferred Legal Language</h3>
            <p className="text-xs text-slate-500">Language for statutory definitions & notice drafts.</p>
          </div>
          <select
            value={settings.language}
            onChange={(e) => {
              setSettings({ ...settings, language: e.target.value });
              showToast(`Language set to ${e.target.value}`);
            }}
            className="px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none"
          >
            <option>English</option>
            <option>Hindi (हिंदी)</option>
            <option>Kannada (ಕನ್ನಡ)</option>
            <option>Tamil (தமிழ்)</option>
            <option>Marathi (मराठी)</option>
          </select>
        </div>

        {/* Citations Visibility */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Show Statutory Citations</h3>
            <p className="text-xs text-slate-500">Display references to Acts beneath AI responses.</p>
          </div>
          <button
            onClick={() => {
              setSettings({ ...settings, citationsVisible: !settings.citationsVisible });
              showToast('Citation preferences saved');
            }}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.citationsVisible ? 'bg-teal-600' : 'bg-slate-300'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.citationsVisible ? 'translate-x-6' : ''}`} />
          </button>
        </div>

        {/* Data Reset */}
        <div className="pt-2">
          <button
            onClick={() => showToast('Demo session state reset successfully')}
            className="px-4 py-2 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl text-xs font-semibold transition"
          >
            Clear Local Session Workspace
          </button>
        </div>
      </div>
    </div>
  );
}