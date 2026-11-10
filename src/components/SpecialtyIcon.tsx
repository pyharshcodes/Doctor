import {
  Baby,
  Bone,
  Brain,
  Flower2,
  HeartPulse,
  Smile,
  Sparkles,
  Stethoscope,
} from 'lucide-react';
import type { Specialty } from '../data/clinicData';

interface SpecialtyIconProps {
  name: Specialty['iconName'];
  className?: string;
}

export function SpecialtyIcon({ name, className = 'w-5 h-5' }: SpecialtyIconProps) {
  switch (name) {
    case 'HeartPulse':
      return <HeartPulse className={className} aria-hidden="true" />;
    case 'Brain':
      return <Brain className={className} aria-hidden="true" />;
    case 'Bone':
      return <Bone className={className} aria-hidden="true" />;
    case 'Sparkles':
      return <Sparkles className={className} aria-hidden="true" />;
    case 'Baby':
      return <Baby className={className} aria-hidden="true" />;
    case 'Flower2':
      return <Flower2 className={className} aria-hidden="true" />;
    case 'Smile':
      return <Smile className={className} aria-hidden="true" />;
    case 'Stethoscope':
      return <Stethoscope className={className} aria-hidden="true" />;
  }
}

