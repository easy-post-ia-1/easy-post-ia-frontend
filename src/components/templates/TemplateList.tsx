import React, { useState } from 'react';
import { Box, Tabs, Tab, Grid, Pagination, Typography, Skeleton } from '@mui/material';
import { useTemplatesQuery } from '@hooks/queries/templates/useTemplatesQuery';
import type { Template } from '@models/template.model';
import TemplateCard from './TemplateCard';

interface TemplateListProps {
  onSelect: (template: Template) => void;
  selectedTemplateId?: number | null;
  onPreview: (template: Template) => void;
}

const PAGE_SIZE = 5;

const TemplateList: React.FC<TemplateListProps> = ({ onSelect, selectedTemplateId, onPreview }) => {
  const [tab, setTab] = useState<'company' | 'team'>('company');
  const [page, setPage] = useState(1);
  const { data, isLoading } = useTemplatesQuery({
    page,
    page_size: PAGE_SIZE,
    template_type: tab,
  });

  const handleTabChange = (_: React.SyntheticEvent, newValue: 'company' | 'team') => {
    setTab(newValue);
    setPage(1);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        aria-label="template type tabs"
        sx={{ mb: 2 }}
        data-testid="template-tabs"
      >
        <Tab label="Default Templates" value="company" data-testid="tab-company" />
        <Tab label="Team Templates" value="team" data-testid="tab-team" />
      </Tabs>

      {isLoading ? (
        <Grid container spacing={2}>
          {Array.from({ length: PAGE_SIZE }).map((_, idx) => (
            <Grid item xs={12} md={6} key={idx}>
              <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
            </Grid>
          ))}
        </Grid>
      ) : data && data.templates.length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <Typography variant="h6" color="text.secondary" sx={{ opacity: 0.7 }}>
            No templates created
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {data?.templates.map((template) => (
            <Grid item xs={12} md={6} key={template.id}>
              <TemplateCard
                template={template}
                selected={selectedTemplateId === template.id}
                onSelect={onSelect}
                onPreview={onPreview}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {data && data.pagination.pages > 1 && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={data.pagination.pages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default TemplateList; 