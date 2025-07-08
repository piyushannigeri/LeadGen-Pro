'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Video, Copy, Check } from 'lucide-react';

export default function VideoCallTab() {
  const [meetingTopic, setMeetingTopic] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [hasCopied, setHasCopied] = useState(false);
  const { toast } = useToast();

  const handleGenerateLink = () => {
    if (!meetingTopic.trim()) {
      toast({
        variant: 'destructive',
        title: 'Meeting Topic Required',
        description: 'Please enter a topic for your meeting.',
      });
      return;
    }
    const roomName = `LeadGenPro-${meetingTopic.replace(/\s+/g, '-')}-${crypto.randomUUID().slice(0, 8)}`;
    const link = `https://meet.jit.si/${roomName}`;
    setGeneratedLink(link);
    toast({
      title: 'Link Generated!',
      description: 'Your video call link is ready.',
    });
  };

  const handleCopy = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Generate Video Call Link</CardTitle>
        <CardDescription>Create a unique and shareable video call link for your meetings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="meetingTopic" className="block text-sm font-medium text-muted-foreground mb-2">
            Meeting Topic
          </label>
          <Input
            id="meetingTopic"
            placeholder="e.g., Product Demo with Alex"
            value={meetingTopic}
            onChange={(e) => setMeetingTopic(e.target.value)}
          />
        </div>
        <Button onClick={handleGenerateLink} className="w-full md:w-auto">
          <Video className="mr-2 h-4 w-4" />
          Generate Link
        </Button>
      </CardContent>
      {generatedLink && (
        <CardFooter className="flex-col items-start space-y-2 bg-muted/50 p-4 rounded-b-lg border-t">
          <p className="text-sm font-semibold">Your meeting link is ready:</p>
          <div className="flex w-full items-center space-x-2">
            <Input readOnly value={generatedLink} className="bg-background" />
            <Button variant="outline" size="icon" onClick={handleCopy}>
              {hasCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <a href={generatedLink} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
            Open link in new tab &rarr;
          </a>
        </CardFooter>
      )}
    </Card>
  );
}
