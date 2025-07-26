export interface Template {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  tags: string;
  category: string;
  emoji: string;
  is_default: boolean;
  template_type: 'company' | 'team';
  created_at: string;
  updated_at: string;
}

export interface TemplateFormValues {
  id?: number;
  title: string;
  description: string;
  imageUrl?: string;
  tags: string;
  category: string;
  emoji: string;
}

export interface TemplateSearch {
  title?: string;
  category?: string;
  template_type?: 'company' | 'team';
}

export interface TemplateCategory {
  category: string;
  emoji: string;
}

export interface TemplateModalProps {
  open: boolean;
  onClose: () => void;
  onTemplateSelect: (template: Template) => void;
}

export interface TemplateCardProps {
  template: Template;
  onSelect: (template: Template) => void;
  onPreview: (template: Template) => void;
}

export const initialTemplateSearch: TemplateSearch = {
  title: '',
  category: '',
  template_type: undefined
};

export const initialTemplateFormValues: TemplateFormValues = {
  title: '',
  description: '',
  imageUrl: '',
  tags: '',
  category: '',
  emoji: ''
};

// Template categories with emojis
export const TEMPLATE_CATEGORIES = {
  MARKETING: {
    name: 'Marketing',
    emoji: '🚀'
  },
  NEWS: {
    name: 'News',
    emoji: '📰'
  },
  EVENTS: {
    name: 'Events',
    emoji: '🎉'
  },
  SUCCESS: {
    name: 'Success',
    emoji: '🏆'
  },
  INSIGHTS: {
    name: 'Insights',
    emoji: '💡'
  },
  TEAM: {
    name: 'Team',
    emoji: '👥'
  },
  CULTURE: {
    name: 'Culture',
    emoji: '📸'
  },
  EDUCATION: {
    name: 'Education',
    emoji: '��'
  }
} as const; 