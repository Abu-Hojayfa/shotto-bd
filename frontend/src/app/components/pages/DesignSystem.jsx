import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';
import { GlassCard } from '../shared/GlassCard';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Shield, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export function DesignSystem() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Shotto BD Design System
            </h1>
            <p className="text-lg text-muted-foreground">
              Design tokens, components, and patterns for the platform
            </p>
          </div>

          {/* Colors */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Color Palette</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="h-24 bg-primary rounded-lg mb-3 shadow-lg" />
                <h4 className="font-semibold text-foreground">Primary</h4>
                <p className="text-sm text-muted-foreground">#00C853</p>
                <p className="text-xs text-muted-foreground">Justice & Hope</p>
              </div>
              <div>
                <div className="h-24 bg-destructive rounded-lg mb-3 shadow-lg" />
                <h4 className="font-semibold text-foreground">Destructive</h4>
                <p className="text-sm text-muted-foreground">#ef4444</p>
                <p className="text-xs text-muted-foreground">Alerts & Warnings</p>
              </div>
              <div>
                <div className="h-24 bg-background rounded-lg mb-3 shadow-lg border border-border" />
                <h4 className="font-semibold text-foreground">Background</h4>
                <p className="text-sm text-muted-foreground">#0a1628</p>
                <p className="text-xs text-muted-foreground">Deep Navy</p>
              </div>
              <div>
                <div className="h-24 bg-card rounded-lg mb-3 shadow-lg border border-border" />
                <h4 className="font-semibold text-foreground">Card</h4>
                <p className="text-sm text-muted-foreground">rgba(15,28,48,0.6)</p>
                <p className="text-xs text-muted-foreground">Glassmorphism</p>
              </div>
            </div>
          </section>

          {/* Typography */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Typography</h2>
            <GlassCard className="p-8 space-y-6">
              <div>
                <h1 className="mb-2">Heading 1 - The quick brown fox</h1>
                <p className="text-sm text-muted-foreground">Poppins, 2.5rem (40px), Medium</p>
              </div>
              <div>
                <h2 className="mb-2">Heading 2 - The quick brown fox</h2>
                <p className="text-sm text-muted-foreground">Poppins, 2rem (32px), Medium</p>
              </div>
              <div>
                <h3 className="mb-2">Heading 3 - The quick brown fox</h3>
                <p className="text-sm text-muted-foreground">Poppins, 1.5rem (24px), Medium</p>
              </div>
              <div>
                <p className="mb-2">Body Text - The quick brown fox jumps over the lazy dog</p>
                <p className="text-sm text-muted-foreground">Poppins, 1rem (16px), Normal</p>
              </div>
              <div>
                <p className="text-sm mb-2">Small Text - The quick brown fox jumps over the lazy dog</p>
                <p className="text-sm text-muted-foreground">Poppins, 0.875rem (14px), Normal</p>
              </div>
            </GlassCard>
          </section>

          {/* Buttons */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Buttons</h2>
            <GlassCard className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Button className="w-full mb-2 bg-primary hover:bg-primary/90">
                    Primary Button
                  </Button>
                  <p className="text-xs text-muted-foreground">Main actions</p>
                </div>
                <div>
                  <Button variant="outline" className="w-full mb-2">
                    Secondary Button
                  </Button>
                  <p className="text-xs text-muted-foreground">Secondary actions</p>
                </div>
                <div>
                  <Button variant="destructive" className="w-full mb-2">
                    Destructive Button
                  </Button>
                  <p className="text-xs text-muted-foreground">Dangerous actions</p>
                </div>
                <div>
                  <Button size="lg" className="w-full mb-2 bg-primary hover:bg-primary/90">
                    Large Button
                  </Button>
                  <p className="text-xs text-muted-foreground">Hero CTAs</p>
                </div>
                <div>
                  <Button size="sm" className="w-full mb-2">
                    Small Button
                  </Button>
                  <p className="text-xs text-muted-foreground">Compact spaces</p>
                </div>
                <div>
                  <Button disabled className="w-full mb-2">
                    Disabled Button
                  </Button>
                  <p className="text-xs text-muted-foreground">Disabled state</p>
                </div>
              </div>
            </GlassCard>
          </section>

          {/* Cards */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassCard className="p-6">
                <h3 className="font-bold text-foreground mb-2">Glass Card</h3>
                <p className="text-sm text-muted-foreground">
                  Backdrop blur with semi-transparent background for modern glassmorphism effect.
                </p>
              </GlassCard>
              <GlassCard hover glow className="p-6">
                <h3 className="font-bold text-foreground mb-2">Interactive Card</h3>
                <p className="text-sm text-muted-foreground">
                  Hover effect with glow for interactive elements like stats and metrics.
                </p>
              </GlassCard>
            </div>
          </section>

          {/* Form Elements */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Form Elements</h2>
            <GlassCard className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-foreground mb-2 block">Input Field</label>
                  <Input type="text" placeholder="Enter text..." className="bg-input border-border" />
                </div>
                <div>
                  <label className="text-sm text-foreground mb-2 block">Disabled Input</label>
                  <Input type="text" placeholder="Disabled" disabled className="bg-input border-border" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-foreground mb-2 block">Textarea</label>
                  <textarea
                    placeholder="Enter description..."
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px] resize-none"
                  />
                </div>
              </div>
            </GlassCard>
          </section>

          {/* Icons & Badges */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Icons & Badges</h2>
            <GlassCard className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="inline-flex p-4 bg-primary/10 rounded-xl mb-3">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Shield Icon</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex p-4 bg-destructive/10 rounded-xl mb-3">
                    <AlertTriangle className="w-8 h-8 text-destructive" />
                  </div>
                  <p className="text-sm text-muted-foreground">Alert Icon</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex p-4 bg-primary/10 rounded-xl mb-3">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Success Icon</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex p-4 bg-blue-500/10 rounded-xl mb-3">
                    <Info className="w-8 h-8 text-blue-400" />
                  </div>
                  <p className="text-sm text-muted-foreground">Info Icon</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm text-primary">
                  Primary Badge
                </span>
                <span className="px-4 py-2 bg-destructive/10 border border-destructive/30 rounded-full text-sm text-destructive">
                  Destructive Badge
                </span>
                <span className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-sm text-yellow-500">
                  Warning Badge
                </span>
                <span className="px-4 py-2 bg-card/60 border border-border rounded-full text-sm text-muted-foreground">
                  Neutral Badge
                </span>
              </div>
            </GlassCard>
          </section>

          {/* Spacing System */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Spacing System (8px Grid)</h2>
            <GlassCard className="p-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-32 text-sm text-muted-foreground">8px (0.5rem)</div>
                  <div className="h-8 bg-primary/20 rounded" style={{ width: '8px' }} />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 text-sm text-muted-foreground">16px (1rem)</div>
                  <div className="h-8 bg-primary/20 rounded" style={{ width: '16px' }} />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 text-sm text-muted-foreground">24px (1.5rem)</div>
                  <div className="h-8 bg-primary/20 rounded" style={{ width: '24px' }} />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 text-sm text-muted-foreground">32px (2rem)</div>
                  <div className="h-8 bg-primary/20 rounded" style={{ width: '32px' }} />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 text-sm text-muted-foreground">48px (3rem)</div>
                  <div className="h-8 bg-primary/20 rounded" style={{ width: '48px' }} />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 text-sm text-muted-foreground">64px (4rem)</div>
                  <div className="h-8 bg-primary/20 rounded" style={{ width: '64px' }} />
                </div>
              </div>
            </GlassCard>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
