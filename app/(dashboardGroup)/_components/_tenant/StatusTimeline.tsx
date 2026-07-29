'use client';

import { CheckCircle, Clock } from 'lucide-react';

interface TimelineStep {
    status: string;
    label: string;
    completed: boolean;
    current?: boolean;
}

interface StatusTimelineProps {
    steps: TimelineStep[];
}

export function StatusTimeline({ steps }: StatusTimelineProps) {
    const getIcon = (step: TimelineStep) => {
        if (step.completed) {
            return <CheckCircle className="w-5 h-5 text-emerald-500" />;
        }
        if (step.current) {
            return <Clock className="w-5 h-5 text-blue-500 animate-spin" />;
        }
        return <Circle className="w-5 h-5 text-muted-foreground" />;
    };

    return (
        <div className="space-y-4">
            {steps.map((step, index) => (
                <div key={step.status} className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <div className={`p-2 rounded-full ${step.completed ? 'bg-emerald-100 dark:bg-emerald-950' :
                                step.current ? 'bg-blue-100 dark:bg-blue-950' :
                                    'bg-muted'
                            }`}>
                            {getIcon(step)}
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`w-1 h-12 mt-2 ${step.completed ? 'bg-emerald-200 dark:bg-emerald-800' : 'bg-muted-foreground/20'
                                }`} />
                        )}
                    </div>
                    <div className="pt-2 pb-4">
                        <p className={`font-semibold ${step.completed ? 'text-emerald-700 dark:text-emerald-300' :
                                step.current ? 'text-blue-700 dark:text-blue-300' :
                                    'text-muted-foreground'
                            }`}>
                            {step.label}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

function Circle({ className }: { className?: string }) {
    return (
        <div className={`w-5 h-5 border-2 border-current rounded-full ${className}`} />
    );
}
