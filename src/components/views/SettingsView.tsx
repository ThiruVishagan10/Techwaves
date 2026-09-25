'use client';

import React, { useState } from 'react';
import {
  User,
  Shield,
  KeyRound,
  Bell,
  Smartphone,
  Laptop,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Save,
  Lock,
  LogOut,
  Mail,
  ShieldAlert,
  Sliders,
  Eye,
  EyeOff,
  Briefcase,
  GraduationCap,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const SettingsView: React.FC = () => {
  const {
    currentUser,
    user,
    logout,
    navigateTo,
    backendStatus,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'trust' | 'sessions'>('profile');
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  // Profile Form state
  const [fullName, setFullName] = useState(currentUser?.fullName || user.name);
  const [email, setEmail] = useState(currentUser?.email || user.email);
  const [university, setUniversity] = useState(user.university);
  const [degree, setDegree] = useState(user.degree);
  const [targetRole, setTargetRole] = useState('AI/ML Research & Engineering Intern');

  // Security Form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  // Trust & Scam alerts state
  const [scamAlertNotification, setScamAlertNotification] = useState(true);
  const [suspiciousJobWarning, setSuspiciousJobWarning] = useState(true);
  const [autoVerifyDomains, setAutoVerifyDomains] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  // Sessions mock
  const [sessions, setSessions] = useState([
    {
      id: 'sess-current',
      device: 'Chrome on Windows 11',
      location: 'Bengaluru, India (Local Dev)',
      ip: '127.0.0.1',
      lastActive: 'Active now',
      isCurrent: true,
      type: 'laptop',
    },
    {
      id: 'sess-mobile',
      device: 'Mobile Safari on iPhone 15',
      location: 'Hyderabad, India',
      ip: '103.21.144.92',
      lastActive: '2 days ago',
      isCurrent: false,
      type: 'phone',
    },
  ]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess('Profile settings successfully saved!');
    setTimeout(() => setSaveSuccess(null), 3500);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      alert('Passwords do not match or are blank.');
      return;
    }
    setSaveSuccess('Password successfully updated!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setSaveSuccess(null), 3500);
  };

  const revokeSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    setSaveSuccess('Session revoked successfully.');
    setTimeout(() => setSaveSuccess(null), 3500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-white tracking-tight">Account & Security Settings</h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Verified User
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Manage your credentials, two-factor authentication, sessions, and scam protection alert preferences.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => logout()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-500/30 text-xs font-medium text-slate-300 hover:text-rose-400 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Success banner */}
      {saveSuccess && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{saveSuccess}</span>
        </div>
      )}

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Settings Navigation Tabs */}
        <div className="lg:col-span-3 space-y-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'profile'
                ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Account Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'security'
                ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Password & 2FA</span>
          </button>

          <button
            onClick={() => setActiveTab('trust')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'trust'
                ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Trust & Scam Alerts</span>
          </button>

          <button
            onClick={() => setActiveTab('sessions')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'sessions'
                ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Active Sessions</span>
          </button>

          <div className="pt-4 mt-4 border-t border-slate-800/80 px-3">
            <div className="text-[11px] text-slate-400 font-medium mb-1">Current Role</div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
              {currentUser?.role === 'recruiter' ? (
                <>
                  <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                  <span>Recruiter Account</span>
                </>
              ) : (
                <>
                  <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
                  <span>Student / Job Seeker</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Content Pane */}
        <div className="lg:col-span-9 bg-[#0D1322] border border-slate-800 rounded-2xl p-6 sm:p-8">
          {/* TAB 1: Profile Details */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white mb-1">Account Information</h3>
                <p className="text-xs text-slate-400">
                  Update your identity information visible to verified corporate recruiters.
                </p>
              </div>

              {/* Avatar section */}
              <div className="flex items-center gap-4 pb-4 border-b border-slate-800">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-lg border-2 border-slate-700 shadow-md">
                  {fullName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{fullName}</div>
                  <div className="text-xs text-slate-400">{email}</div>
                  <div className="mt-1 flex items-center gap-1.5 text-[10px] text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Identity Verified with Institutional Email</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-xs text-white px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full bg-slate-900/50 border border-slate-800 text-xs text-slate-400 px-3.5 py-2.5 rounded-xl cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Institution / University
                  </label>
                  <input
                    type="text"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-xs text-white px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Degree / Branch
                  </label>
                  <input
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-xs text-white px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Primary Target Role
                  </label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-xs text-white px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: Security & Password */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white mb-1">Password & Authentication</h3>
                <p className="text-xs text-slate-400">
                  Ensure your account is protected with strong cryptographic authentication.
                </p>
              </div>

              {/* Two-Factor Authentication Toggle */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Two-Factor Authentication (2FA)</div>
                    <div className="text-[11px] text-slate-400">
                      Require security code confirmation on login from unrecognized devices.
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                    twoFactorEnabled ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Update Password Form */}
              <form onSubmit={handleUpdatePassword} className="space-y-4 pt-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Change Password
                </h4>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full bg-slate-900 border border-slate-800 text-xs text-white px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      New Password
                    </label>
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full bg-slate-900 border border-slate-800 text-xs text-white px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Confirm New Password
                    </label>
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-type new password"
                      className="w-full bg-slate-900 border border-slate-800 text-xs text-white px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5"
                  >
                    {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{showPass ? 'Hide Passwords' : 'Show Passwords'}</span>
                  </button>

                  <button
                    type="submit"
                    className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: Trust & Scam Alerts */}
          {activeTab === 'trust' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white mb-1">Trust Engine & Scam Alerts</h3>
                <p className="text-xs text-slate-400">
                  Configure real-time automated fraud detection and security notification triggers.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-white">Instant Scam & Risk Alerts</div>
                    <div className="text-[11px] text-slate-400">
                      Receive an immediate browser alert if a saved or applied opportunity is flagged as suspicious.
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setScamAlertNotification(!scamAlertNotification)}
                    className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                      scamAlertNotification ? 'bg-blue-600' : 'bg-slate-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        scamAlertNotification ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-white">Pre-Application Domain Verification</div>
                    <div className="text-[11px] text-slate-400">
                      Warn before visiting external application links that lack corporate TLS matching certificates.
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAutoVerifyDomains(!autoVerifyDomains)}
                    className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                      autoVerifyDomains ? 'bg-blue-600' : 'bg-slate-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        autoVerifyDomains ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-white">Weekly High-Match Digest</div>
                    <div className="text-[11px] text-slate-400">
                      Receive an email digest of 90%+ match verified opportunities.
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setWeeklyDigest(!weeklyDigest)}
                    className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                      weeklyDigest ? 'bg-blue-600' : 'bg-slate-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        weeklyDigest ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Active Sessions */}
          {activeTab === 'sessions' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white mb-1">Active Login Sessions</h3>
                <p className="text-xs text-slate-400">
                  Manage devices and browsers currently signed in to your PathBridge account.
                </p>
              </div>

              <div className="space-y-3">
                {sessions.map((sess) => (
                  <div
                    key={sess.id}
                    className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300">
                        {sess.type === 'laptop' ? (
                          <Laptop className="w-5 h-5 text-blue-400" />
                        ) : (
                          <Smartphone className="w-5 h-5 text-purple-400" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-white">{sess.device}</span>
                          {sess.isCurrent && (
                            <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              Current Device
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {sess.location} · IP: {sess.ip} · {sess.lastActive}
                        </div>
                      </div>
                    </div>

                    {!sess.isCurrent && (
                      <button
                        type="button"
                        onClick={() => revokeSession(sess.id)}
                        className="text-xs text-rose-400 hover:text-rose-300 hover:underline"
                      >
                        Revoke Access
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
