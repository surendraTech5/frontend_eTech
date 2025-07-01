import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Edit, Facebook, Twitter, Linkedin, Instagram, Sun, Moon } from 'lucide-react';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { useTheme } from 'next-themes';
import React from 'react';

export default function Profile() {
  const { setTheme, theme } = useTheme();
  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 pt-6 relative">
      {/* Header with theme switcher */}
      <div className="absolute top-0 right-0 flex items-center gap-2 p-4 z-10">
        <ThemeSwitcher />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
      {/* Profile Card */}
      <Card className="mb-6">
        <CardContent className="flex flex-col md:flex-row items-center gap-6 p-6">
          <img
            src="https://i.pravatar.cc/150?u=musharof"
            alt="Musharof Chowdhury"
            className="w-24 h-24 rounded-full border-4 border-primary object-cover"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-primary mb-1">Musharof Chowdhury</h2>
            <div className="text-muted-foreground mb-1">Team Manager</div>
            <div className="text-sm text-muted-foreground">Arizona, United States</div>
          </div>
          <div className="flex flex-row gap-2 mb-4 md:mb-0">
            <Button variant="outline" size="icon" className="border border-white text-white hover:border-primary hover:text-primary bg-transparent">
              <Facebook className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="border border-white text-white hover:border-primary hover:text-primary bg-transparent">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="border border-white text-white hover:border-primary hover:text-primary bg-transparent">
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="border border-white text-white hover:border-primary hover:text-primary bg-transparent">
              <Instagram className="h-5 w-5" />
            </Button>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground"><Edit className="mr-2 h-4 w-4" />Edit</Button>
        </CardContent>
      </Card>
      {/* Personal Information */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-primary">Personal Information</h3>
            <Button variant="outline" size="sm"><Edit className="mr-2 h-4 w-4" />Edit</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-xs text-muted-foreground mb-1">First Name</div>
              <div className="font-medium">Musharof</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Last Name</div>
              <div className="font-medium">Chowdhury</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Email address</div>
              <div className="font-medium">randomuser@pimjo.com</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Phone</div>
              <div className="font-medium">+09 363 398 46</div>
            </div>
            <div className="md:col-span-2">
              <div className="text-xs text-muted-foreground mb-1">Bio</div>
              <div className="font-medium">Team Manager</div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Address */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-primary">Address</h3>
            <Button variant="outline" size="sm"><Edit className="mr-2 h-4 w-4" />Edit</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Country</div>
              <div className="font-medium">United States.</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">City/State</div>
              <div className="font-medium">Phoenix, Arizona, United States.</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Postal Code</div>
              <div className="font-medium">ERT 2489</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">TAX ID</div>
              <div className="font-medium">AS4568384</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 