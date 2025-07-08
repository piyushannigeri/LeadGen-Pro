import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, Zap, Mail, MessageSquare } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'AI-Powered Lead Generation',
    description: 'Instantly discover high-quality leads tailored to your ideal customer profile. No more manual prospecting.',
  },
  {
    icon: Mail,
    title: 'Automated Email Crafting',
    description: 'Generate persuasive, personalized cold emails that get responses. Our AI understands context and tone.',
  },
  {
    icon: MessageSquare,
    title: 'LinkedIn Outreach Perfected',
    description: 'Create engaging LinkedIn connection requests and messages that build relationships and open doors.',
  },
    {
    icon: CheckCircle,
    title: 'Intelligent Lead Scoring',
    description: 'Automatically prioritize your best leads based on their likelihood to convert, so you can focus on what matters.',
  },
]

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative text-center py-20 lg:py-32 overflow-hidden isolate">
        <div className="absolute top-0 -left-1/4 w-96 h-96 bg-primary rounded-full filter blur-2xl opacity-20 animate-blob dark:opacity-30"></div>
        <div style={{ animationDelay: '2000ms' }} className="absolute bottom-0 -right-1/4 w-96 h-96 bg-accent rounded-full filter blur-2xl opacity-20 animate-blob dark:opacity-30"></div>
        
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-foreground">
            Outreach on Autopilot.
          </h1>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Powered by AI.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            LeadGen Pro finds your ideal customers, writes personalized emails and LinkedIn messages, and scores your leads, so you can focus on closing deals.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild className="bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 transition-opacity">
              <Link href="/signup">Get Started for Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Image Section */}
      <section className="container mx-auto px-4 pb-16">
         <div className="relative w-full max-w-5xl mx-auto">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-primary rounded-full filter blur-xl opacity-20 animate-blob dark:opacity-30"></div>
            <div style={{ animationDelay: '2000ms' }} className="absolute top-0 -right-4 w-72 h-72 bg-accent rounded-full filter blur-xl opacity-20 animate-blob dark:opacity-30"></div>
            <div style={{ animationDelay: '4000ms' }} className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-400 rounded-full filter blur-xl opacity-10 animate-blob dark:opacity-20"></div>
            <Image 
              src="https://placehold.co/1200x675.png"
              alt="LeadGen Pro Dashboard" 
              width={1200} 
              height={675} 
              className="rounded-xl shadow-2xl object-cover relative z-10 border-4 border-card"
              data-ai-hint="dashboard analytics"
            />
          </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">The Ultimate Sales Toolkit</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Stop juggling tools. Get everything you need to find, engage, and convert leads in one place.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-card p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="text-center py-20 lg:py-24">
        <div className="container mx-auto px-4">
           <h2 className="text-3xl md:text-4xl font-bold">Ready to Crush Your Quota?</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Spend less time prospecting and more time selling.
              Join hundreds of reps who are automating their outreach with LeadGen Pro.
            </p>
           <div className="mt-8">
              <Button size="lg" asChild className="bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 transition-opacity">
                <Link href="/signup">Start Your Free Trial</Link>
              </Button>
            </div>
        </div>
      </section>
    </div>
  );
}
