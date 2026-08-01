
"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, MapPin, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: Building2,
      title: "Premium Properties",
      description: "Handpicked rental properties verified and managed by professionals",
    },
    {
      icon: Users,
      title: "Safe & Secure",
      description: "Verified profiles and secure payment processing for all transactions",
    },
    {
      icon: MapPin,
      title: "Easy Discovery",
      description: "Find properties near your workplace with advanced filtering options",
    },
  ];

  const stats = [
    { label: "Active Properties", value: "1,000+" },
    { label: "Happy Tenants", value: "5,000+" },
    { label: "Trusted Landlords", value: "500+" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <Building2 className="w-6 h-6" />
            RentNest
          </Link>
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/properties" className="text-foreground hover:text-primary transition">
              Properties
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition">
              About
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition">
              Contact
            </Link>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-card to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-foreground leading-tight">
              Find Your Perfect <span className="text-primary">Rental Home</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover premium rental properties, connect with trusted landlords, and manage your rentals effortlessly. Your ideal home is just a click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                <Link href="/properties" className="flex items-center gap-2">
                  Browse Properties <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/register">List Your Property</Link>
              </Button>
            </div>
          </div>

          {/* Search Box */}
          <div className="bg-card rounded-2xl p-8 shadow-lg border border-border max-w-2xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Location</label>
                <input
                  type="text"
                  placeholder="Enter city or area"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Budget</label>
                <select className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Any budget</option>
                  <option>Under $500</option>
                  <option>$500 - $1000</option>
                  <option>$1000 - $2000</option>
                  <option>Above $2000</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button className="w-full bg-primary hover:bg-primary/90">Search</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">Why Choose RentNest?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="bg-background rounded-xl p-8 border border-border hover:border-primary/50 transition">
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Dream Home?</h2>
          <p className="text-lg mb-8 opacity-90">Join thousands of satisfied tenants and landlords on RentNest today.</p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register" className="flex items-center gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition">About</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">For Tenants</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/properties" className="hover:text-primary transition">Browse</Link></li>
                <li><Link href="/login" className="hover:text-primary transition">Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">For Landlords</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/register" className="hover:text-primary transition">List Property</Link></li>
                <li><Link href="/login" className="hover:text-primary transition">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 RentNest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
