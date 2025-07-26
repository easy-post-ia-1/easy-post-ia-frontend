import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  IconButton,
  Tooltip
} from '@mui/material';
import { Visibility as VisibilityIcon, Check as CheckIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import type { TemplateCardProps } from '@models/template.model';

const TemplateCard: React.FC<TemplateCardProps & { selected?: boolean }> = ({
  template,
  onSelect,
  onPreview,
  selected = false
}) => {
  const { t } = useTranslation();

  return (
    <Card
      role="button"
      aria-pressed={selected}
      tabIndex={0}
      sx={{
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        border: selected ? '2px solid #1976d2' : '1px solid #e0e0e0',
        '&:hover, &:focus': {
          boxShadow: 3,
          transform: 'translateY(-2px)',
          outline: selected ? '2px solid #1976d2' : '2px solid #90caf9',
        }
      }}
      onClick={() => onSelect(template)}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(template);
        }
      }}
      aria-label={t('templates.card.ariaLabel', { title: template.title })}
      data-testid="template-card"
    >
      <CardContent id={`template-title-${template.title}`} data-testid="template-card-content">
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h6" component="h3" noWrap data-testid="template-title">
            {template.title}
          </Typography>
          <Box>
            <Tooltip title={t('templates.preview')}>
              <IconButton
                size="small"
                aria-label={t('templates.preview')}
                onClick={e => {
                  e.stopPropagation();
                  onPreview(template);
                }}
                tabIndex={0}
              >
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
            {selected && <CheckIcon color="primary" sx={{ ml: 1 }} />}
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: '3em' }}>
          {template.description}
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Chip
            label={`${template.emoji} ${template.category}`}
            size="small"
            variant="outlined"
          />
          <Typography variant="caption" color="text.secondary">
            {template.template_type === 'company' ? t('templates.type.company') : t('templates.type.team')}
          </Typography>
        </Box>
        {template.tags && (
          <Box mt={1}>
            <Typography variant="caption" color="text.secondary">
              {template.tags}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default TemplateCard; 