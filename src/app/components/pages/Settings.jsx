import { useState } from 'react';
import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';
import { GlassCard } from '../shared/GlassCard';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Bell,
  Shield,
  Eye,
  Globe,
  Trash2,
  Save,
  Camera,
  AlertTriangle,
  CheckCircle,
  LogOut
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

export function Settings() {
  const [userData, setUserData] = useState({
    name: 'Ahmed Rahman',
    email: 'ahmed.rahman@email.com',
    phone: '+880 1712-345678',
    location: 'Dhaka, Bangladesh',
    joinedDate: '2025-11-15',
    reportsSubmitted: 12,
    reportsResolved: 8
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    smsAlerts: false,
    reportStatus: true,
    weeklyDigest: true,
    emergencyAlerts: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'private',
    showActivity: false,
    allowAnalytics: true,
    dataSharing: false
  });

  const [language, setLanguage] = useState('en');
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = () => {
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Account Settings</h1>
            <p className="text-muted-foreground">সেটিংস - Manage your account and preferences</p>
          </motion.div>

          {/* Settings Tabs */}
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 bg-card/40 border border-border">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <GlassCard className="p-6 sm:p-8">
                  {/* Avatar Section */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
                    <div className="relative">
                      <Avatar className="w-24 h-24">
                        <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                          {userData.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
                        <Camera className="w-4 h-4 text-primary-foreground" />
                      </button>
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h2 className="text-2xl font-bold text-foreground mb-1">{userData.name}</h2>
                      <p className="text-muted-foreground mb-3">{userData.email}</p>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <Badge className="bg-primary/10 text-primary border-primary/30">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified User
                        </Badge>
                        <Badge variant="outline">
                          Member since {new Date(userData.joinedDate).toLocaleDateString()}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <Separator className="mb-8" />

                  {/* Activity Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    <div className="p-4 bg-card/40 border border-border rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary mb-1">{userData.reportsSubmitted}</div>
                      <div className="text-xs text-muted-foreground">Reports Filed</div>
                    </div>
                    <div className="p-4 bg-card/40 border border-border rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary mb-1">{userData.reportsResolved}</div>
                      <div className="text-xs text-muted-foreground">Resolved</div>
                    </div>
                    <div className="p-4 bg-card/40 border border-border rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {Math.round((userData.reportsResolved / userData.reportsSubmitted) * 100)}%
                      </div>
                      <div className="text-xs text-muted-foreground">Success Rate</div>
                    </div>
                    <div className="p-4 bg-card/40 border border-border rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary mb-1">4</div>
                      <div className="text-xs text-muted-foreground">Pending</div>
                    </div>
                  </div>

                  {/* Profile Form */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-foreground">Personal Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="name"
                            value={userData.name}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                            className="pl-10 bg-input border-border text-foreground"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            className="pl-10 bg-input border-border text-foreground"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            value={userData.phone}
                            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                            className="pl-10 bg-input border-border text-foreground"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="location"
                            value={userData.location}
                            onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                            className="pl-10 bg-input border-border text-foreground"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                      <Button variant="outline" className="border-border">
                        Cancel
                      </Button>
                      <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </GlassCard>

                {savedMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed bottom-6 right-6 p-4 bg-primary text-primary-foreground rounded-lg shadow-lg flex items-center space-x-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Settings saved successfully!</span>
                  </motion.div>
                )}
              </motion.div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <GlassCard className="p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-foreground mb-6">Security Settings</h3>

                  {/* Change Password */}
                  <div className="space-y-6 mb-8">
                    <h4 className="text-md font-semibold text-foreground">Change Password</h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="currentPassword"
                            type="password"
                            placeholder="Enter current password"
                            className="pl-10 bg-input border-border text-foreground"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            placeholder="Enter new password"
                            className="bg-input border-border text-foreground"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm Password</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Re-enter new password"
                            className="bg-input border-border text-foreground"
                          />
                        </div>
                      </div>
                      <Button className="bg-primary hover:bg-primary/90">
                        Update Password
                      </Button>
                    </div>
                  </div>

                  <Separator className="my-8" />

                  {/* Two-Factor Authentication */}
                  <div className="space-y-6 mb-8">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-md font-semibold text-foreground mb-1">
                          Two-Factor Authentication
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Button variant="outline" className="border-border">
                        Enable 2FA
                      </Button>
                    </div>
                  </div>

                  <Separator className="my-8" />

                  {/* Active Sessions */}
                  <div className="space-y-6">
                    <h4 className="text-md font-semibold text-foreground">Active Sessions</h4>
                    <div className="space-y-3">
                      {[
                        { device: 'Chrome on Windows', location: 'Dhaka, Bangladesh', lastActive: '2 minutes ago', current: true },
                        { device: 'Mobile App on Android', location: 'Dhaka, Bangladesh', lastActive: '2 hours ago', current: false }
                      ].map((session, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-4 bg-card/40 border border-border rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Shield className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-semibold text-foreground flex items-center space-x-2">
                                <span>{session.device}</span>
                                {session.current && (
                                  <Badge className="text-xs bg-primary/10 text-primary border-primary/30">
                                    Current
                                  </Badge>
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {session.location} • {session.lastActive}
                              </div>
                            </div>
                          </div>
                          {!session.current && (
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/80">
                              Revoke
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full border-destructive text-destructive hover:bg-destructive/10">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out All Devices
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <GlassCard className="p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-foreground mb-6">Notification Preferences</h3>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Bell className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <Label htmlFor="emailUpdates" className="cursor-pointer">Email Updates</Label>
                          <p className="text-sm text-muted-foreground">Receive updates via email</p>
                        </div>
                      </div>
                      <Switch
                        id="emailUpdates"
                        checked={notifications.emailUpdates}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, emailUpdates: checked })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <Label htmlFor="smsAlerts" className="cursor-pointer">SMS Alerts</Label>
                          <p className="text-sm text-muted-foreground">Get text message notifications</p>
                        </div>
                      </div>
                      <Switch
                        id="smsAlerts"
                        checked={notifications.smsAlerts}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, smsAlerts: checked })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Eye className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <Label htmlFor="reportStatus" className="cursor-pointer">Report Status Updates</Label>
                          <p className="text-sm text-muted-foreground">Notify when report status changes</p>
                        </div>
                      </div>
                      <Switch
                        id="reportStatus"
                        checked={notifications.reportStatus}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, reportStatus: checked })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <Label htmlFor="weeklyDigest" className="cursor-pointer">Weekly Digest</Label>
                          <p className="text-sm text-muted-foreground">Summary of platform activity</p>
                        </div>
                      </div>
                      <Switch
                        id="weeklyDigest"
                        checked={notifications.weeklyDigest}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, weeklyDigest: checked })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="w-5 h-5 text-destructive" />
                        <div>
                          <Label htmlFor="emergencyAlerts" className="cursor-pointer">Emergency Alerts</Label>
                          <p className="text-sm text-muted-foreground">Critical notifications (recommended)</p>
                        </div>
                      </div>
                      <Switch
                        id="emergencyAlerts"
                        checked={notifications.emergencyAlerts}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, emergencyAlerts: checked })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 mt-8">
                    <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                      <Save className="w-4 h-4 mr-2" />
                      Save Preferences
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            </TabsContent>

            {/* Privacy Tab */}
            <TabsContent value="privacy" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <GlassCard className="p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-foreground mb-6">Privacy & Data</h3>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <Label className="text-base">Profile Visibility</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Control who can see your profile information
                        </p>
                      </div>
                      <select
                        value={privacy.profileVisibility}
                        onChange={(e) => setPrivacy({ ...privacy, profileVisibility: e.target.value })}
                        className="px-4 py-2 bg-input border border-border rounded-lg text-foreground"
                      >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="contacts">Contacts Only</option>
                      </select>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="showActivity" className="cursor-pointer">Show Activity</Label>
                        <p className="text-sm text-muted-foreground">Display your report history publicly</p>
                      </div>
                      <Switch
                        id="showActivity"
                        checked={privacy.showActivity}
                        onCheckedChange={(checked) =>
                          setPrivacy({ ...privacy, showActivity: checked })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="allowAnalytics" className="cursor-pointer">Analytics & Performance</Label>
                        <p className="text-sm text-muted-foreground">Help improve the platform</p>
                      </div>
                      <Switch
                        id="allowAnalytics"
                        checked={privacy.allowAnalytics}
                        onCheckedChange={(checked) =>
                          setPrivacy({ ...privacy, allowAnalytics: checked })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="dataSharing" className="cursor-pointer">Third-Party Data Sharing</Label>
                        <p className="text-sm text-muted-foreground">Share anonymized data for research</p>
                      </div>
                      <Switch
                        id="dataSharing"
                        checked={privacy.dataSharing}
                        onCheckedChange={(checked) =>
                          setPrivacy({ ...privacy, dataSharing: checked })
                        }
                      />
                    </div>

                    <Separator />

                    {/* Data Management */}
                    <div className="space-y-4 pt-4">
                      <h4 className="text-md font-semibold text-foreground">Data Management</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Button variant="outline" className="border-border">
                          <Download className="w-4 h-4 mr-2" />
                          Download My Data
                        </Button>
                        <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 mt-8">
                    <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                      <Save className="w-4 h-4 mr-2" />
                      Save Privacy Settings
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <GlassCard className="p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-foreground mb-6">App Preferences</h3>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <Label className="text-base flex items-center space-x-2">
                          <Globe className="w-5 h-5 text-muted-foreground" />
                          <span>Language / ভাষা</span>
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Select your preferred language
                        </p>
                      </div>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="px-4 py-2 bg-input border border-border rounded-lg text-foreground min-w-40"
                      >
                        <option value="en">English</option>
                        <option value="bn">বাংলা (Bangla)</option>
                        <option value="both">Both / উভয়</option>
                      </select>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Theme</Label>
                        <p className="text-sm text-muted-foreground">Choose your display mode</p>
                      </div>
                      <select className="px-4 py-2 bg-input border border-border rounded-lg text-foreground">
                        <option>Dark (Current)</option>
                        <option>Light</option>
                        <option>Auto</option>
                      </select>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Default District</Label>
                        <p className="text-sm text-muted-foreground">For faster report filing</p>
                      </div>
                      <select className="px-4 py-2 bg-input border border-border rounded-lg text-foreground">
                        <option>Dhaka</option>
                        <option>Chittagong</option>
                        <option>Rajshahi</option>
                        <option>Khulna</option>
                        <option>Sylhet</option>
                      </select>
                    </div>

                    <Separator />

                    <div className="space-y-4 pt-4">
                      <h4 className="text-md font-semibold text-foreground">Accessibility</h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="highContrast" className="cursor-pointer">High Contrast Mode</Label>
                          <p className="text-sm text-muted-foreground">Improve visibility</p>
                        </div>
                        <Switch id="highContrast" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="reducedMotion" className="cursor-pointer">Reduce Motion</Label>
                          <p className="text-sm text-muted-foreground">Minimize animations</p>
                        </div>
                        <Switch id="reducedMotion" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 mt-8">
                    <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                      <Save className="w-4 h-4 mr-2" />
                      Save Preferences
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
