// Component-related types
// Props interfaces and component-specific types

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
  };
}
