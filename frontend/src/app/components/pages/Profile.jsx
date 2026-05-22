import { useState, useEffect } from 'react';
import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';
import { GlassCard } from '../shared/GlassCard';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Trash2,
  Save,
  Camera,
  CheckCircle,
  Loader2,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

const API = 'http://localhost:5000/api';

// ── reads the key your login page actually uses ───────────────────────────────
const getToken = () => localStorage.getItem('token');

export function Profile() {
  // ── server data ───────────────────────────────────────────────────────────
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    joinedDate: '',
    reportsSubmitted: 0,
    reportsResolved: 0,
    role: '',
    isVerified: false,
    isApproved: false,
  });

  // ── password form — was missing state before ──────────────────────────────
  const [pwForm, setPwForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    smsAlerts: false,
    reportStatus: true,
  });

  const [language, setLanguage] = useState('en');

  // ── UI flags ──────────────────────────────────────────────────────────────
  const [isLoading,    setIsLoading]    = useState(true);
  const [isSaving,     setIsSaving]     = useState(false);
  const [isChangingPw, setIsChangingPw] = useState(false);
  const [toast,        setToast]        = useState(null);

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  // ── fetch profile ─────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API}/users/profile`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        const data = await res.json();

        if (!res.ok) {
          showToast('error', data.message || 'Failed to load profile.');
          return;
        }

        const u = data.data.user;
        setUserData({
          fullName:         u.fullName         || '',
          email:            u.email            || '',
          phone:            u.phone            || '',
          location:         u.location         || '',
          joinedDate:       u.createdAt        || '',
          reportsSubmitted: u.reportsSubmitted || 0,
          reportsResolved:  u.reportsResolved  || 0,
          role:             u.role             || '',
          isVerified:       u.isVerified       || false,
          isApproved:       u.isApproved       || false,
        });
      } catch {
        showToast('error', 'Network error. Could not load profile.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ── save profile ──────────────────────────────────────────────────────────
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`${API}/users/profile`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: userData.fullName,
          phone:    userData.phone,
          location: userData.location,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        showToast('error', data.message || 'Failed to update profile.');
        return;
      }
      showToast('success', 'Profile updated successfully!');
    } catch {
      showToast('error', 'Network error. Could not save profile.');
    } finally {
      setIsSaving(false);
    }
  };

  // ── change password ───────────────────────────────────────────────────────
  const handleChangePassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = pwForm;

    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast('error', 'Please fill in all password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('error', 'New passwords do not match.');
      return;
    }
    if (newPassword.length < 8) {
      showToast('error', 'New password must be at least 8 characters.');
      return;
    }

    setIsChangingPw(true);
    try {
      const res = await fetch(`${API}/users/change-password`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });
      const data = await res.json();

      if (!res.ok) {
        const msg = data.errors?.[0]?.message || data.message || 'Failed to change password.';
        showToast('error', msg);
        return;
      }

      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      showToast('success', 'Password changed successfully!');
    } catch {
      showToast('error', 'Network error. Could not change password.');
    } finally {
      setIsChangingPw(false);
    }
  };

  // ── delete account ────────────────────────────────────────────────────────
  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure? This cannot be undone.')) return;
    try {
      await fetch(`${API}/users/account`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      localStorage.removeItem('token');
      window.location.href = '/';
    } catch {
      showToast('error', 'Could not delete account.');
    }
  };

  // ── loading screen ────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground animate-pulse text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  const initials = userData.fullName
    ? userData.fullName.split(' ').map((n) => n[0]).join('').toUpperCase()
    : '?';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">My Profile</h1>
            <p className="text-sm text-muted-foreground">Manage your personal information and account preferences</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* ── Sidebar ─────────────────────────────────────────────────── */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-4">
              <GlassCard className="p-6 sticky top-24">
                <div className="flex flex-col items-center text-center">

                  <div className="relative mb-4">
                    <Avatar className="w-24 h-24 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors shadow-lg">
                      <Camera className="w-4 h-4 text-primary-foreground" />
                    </button>
                  </div>

                  <h2 className="text-xl font-bold text-foreground mb-1">{userData.fullName}</h2>
                  <p className="text-sm text-muted-foreground mb-3">{userData.email}</p>

                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    <Badge className="bg-primary/10 text-primary border-primary/20 capitalize">
                      {userData.role}
                    </Badge>
                    {userData.isVerified && (
                      <Badge className="bg-green-500/10 text-green-500 border-green-500/20 flex items-center">
                        <CheckCircle className="w-3 h-3 mr-1" />Verified
                      </Badge>
                    )}
                    {!userData.isApproved && (
                      <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                        Pending Approval
                      </Badge>
                    )}
                  </div>

                  <div className="w-full space-y-3 mb-6">
                    <div className="flex justify-between items-center text-sm p-2 bg-card/40 rounded-lg border border-border">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />Joined
                      </div>
                      <span className="font-medium text-green-500">
                        {userData.joinedDate
                          ? new Date(userData.joinedDate).toLocaleDateString()
                          : '—'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 w-full">
                    <div className="p-3 bg-card/30 border border-border rounded-lg">
                      <div className="text-xl font-bold text-foreground">{userData.reportsSubmitted}</div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Reports</div>
                    </div>
                    <div className="p-3 bg-card/30 border border-border rounded-lg">
                      <div className="text-xl font-bold text-foreground">{userData.reportsResolved}</div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Resolved</div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* ── Tabs ────────────────────────────────────────────────────── */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-8">
              <Tabs defaultValue="personal" className="space-y-6">
                <TabsList className="flex bg-card/40 border border-border p-1 gap-1 overflow-x-auto no-scrollbar">
                  <TabsTrigger value="personal"      className="flex-1 text-xs sm:text-sm py-2">Personal Info</TabsTrigger>
                  <TabsTrigger value="security"      className="flex-1 text-xs sm:text-sm py-2">Security</TabsTrigger>
                  <TabsTrigger value="notifications" className="flex-1 text-xs sm:text-sm py-2">Notifications</TabsTrigger>
                  <TabsTrigger value="preferences"   className="flex-1 text-xs sm:text-sm py-2">Preferences</TabsTrigger>
                </TabsList>

                <GlassCard className="p-6">

                  {/* Personal Info */}
                  <TabsContent value="personal" className="mt-0 space-y-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-foreground">Personal Information</h3>
                      <Button onClick={handleSave} disabled={isSaving} size="sm" className="bg-primary hover:bg-primary/90 text-xs h-8">
                        {isSaving
                          ? <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                          : <Save className="w-3 h-3 mr-2" />}
                        {isSaving ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-xs">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="fullName"
                            value={userData.fullName}
                            onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                            className="pl-10 h-10 text-sm bg-input border-border"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs">
                          Email Address <span className="text-muted-foreground">(read-only)</span>
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            value={userData.email}
                            readOnly
                            className="pl-10 h-10 text-sm bg-muted border-border cursor-not-allowed opacity-70"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-xs">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            value={userData.phone}
                            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                            className="pl-10 h-10 text-sm bg-input border-border"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location" className="text-xs">Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="location"
                            value={userData.location}
                            onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                            className="pl-10 h-10 text-sm bg-input border-border"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Security */}
                  <TabsContent value="security" className="mt-0 space-y-6">
                    <h3 className="text-lg font-bold text-foreground">Security Settings</h3>
                    <div className="space-y-4">

                      <div className="space-y-2">
                        <Label htmlFor="currentPassword" className="text-xs">Current Password</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          value={pwForm.currentPassword}
                          onChange={(e) => setPwForm({ ...pwForm, currentPassword: e.target.value })}
                          className="h-10 text-sm bg-input border-border"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="newPassword" className="text-xs">New Password</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            value={pwForm.newPassword}
                            onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })}
                            className="h-10 text-sm bg-input border-border"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword" className="text-xs">Confirm Password</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={pwForm.confirmPassword}
                            onChange={(e) => setPwForm({ ...pwForm, confirmPassword: e.target.value })}
                            className="h-10 text-sm bg-input border-border"
                          />
                        </div>
                      </div>

                      {/* was completely unwired before — onClick + state added */}
                      <Button
                        onClick={handleChangePassword}
                        disabled={isChangingPw}
                        size="sm"
                        className="bg-primary hover:bg-primary/90 text-xs"
                      >
                        {isChangingPw
                          ? <><Loader2 className="w-3 h-3 mr-2 animate-spin" />Updating...</>
                          : 'Update Password'}
                      </Button>
                    </div>

                    <Separator className="bg-border" />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-semibold">Two-Factor Authentication</h4>
                        <p className="text-xs text-muted-foreground">Secure your account with 2FA</p>
                      </div>
                      <Switch />
                    </div>
                  </TabsContent>

                  {/* Notifications */}
                  <TabsContent value="notifications" className="mt-0 space-y-4">
                    <h3 className="text-lg font-bold text-foreground mb-2">Notifications</h3>
                    <div className="space-y-3">
                      {[
                        { id: 'emailUpdates', label: 'Email Updates', desc: 'Receive platform updates via email' },
                        { id: 'smsAlerts',    label: 'SMS Alerts',    desc: 'Get critical text message alerts'  },
                        { id: 'reportStatus', label: 'Report Status', desc: 'Notify when report status changes' },
                      ].map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-card/30 border border-border/50">
                          <div className="space-y-0.5">
                            <Label htmlFor={item.id} className="text-sm font-medium">{item.label}</Label>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                          <Switch
                            id={item.id}
                            checked={notifications[item.id]}
                            onCheckedChange={(v) => setNotifications((p) => ({ ...p, [item.id]: v }))}
                          />
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Preferences */}
                  <TabsContent value="preferences" className="mt-0 space-y-4">
                    <h3 className="text-lg font-bold text-foreground">Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-sm font-medium">Language</Label>
                          <p className="text-xs text-muted-foreground">Select your preferred interface language</p>
                        </div>
                        <select
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="bg-input border border-border rounded px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-primary"
                        >
                          <option value="en">English</option>
                          <option value="bn">Bangla</option>
                        </select>
                      </div>

                      <Separator className="bg-border" />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-sm font-medium text-destructive">Delete Account</Label>
                          <p className="text-xs text-muted-foreground">Permanently remove your account and data</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleDeleteAccount}
                          className="border-destructive text-destructive hover:bg-destructive/10 text-xs"
                        >
                          <Trash2 className="w-3 h-3 mr-2" />Delete
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                </GlassCard>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Toast */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed bottom-6 right-6 p-4 rounded-lg shadow-lg flex items-center gap-2 z-50 ${
            toast.type === 'success'
              ? 'bg-primary text-primary-foreground'
              : 'bg-destructive text-destructive-foreground'
          }`}
        >
          {toast.type === 'success'
            ? <CheckCircle className="w-5 h-5 flex-shrink-0" />
            : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
          <span className="text-sm">{toast.msg}</span>
        </motion.div>
      )}
    </div>
  );
}