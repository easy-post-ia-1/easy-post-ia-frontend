import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  Alert,
  CircularProgress
} from '@mui/material';
import { Close as CloseIcon, Check as CheckIcon, Add as AddIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import type { Template, TemplateModalProps } from '@models/template.model';
import TemplateList from './TemplateList';
import TemplateDetailModal from './TemplateDetailModal';
import { useTemplatesQuery } from '@hooks/queries/templates/useTemplatesQuery';
import TemplateCreateModal from './TemplateCreateModal';
import { useUserStore } from '@stores/userStore';

const TemplateModal: React.FC<TemplateModalProps> = ({ open, onClose, onTemplateSelect }) => {
  const { t } = useTranslation();
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { user } = useUserStore();
  const userRole = user.role?.toLowerCase();

  // Add debugging
  console.log('TemplateModal: User role:', user.role, 'Lowercase:', userRole);
  console.log('TemplateModal: User object:', user);

  // Filters, pagination, etc. can be managed here or in TemplateList
  // For now, TemplateList manages its own pagination/tab state

  // React Query for templates (could be lifted to TemplateList)
  const { isLoading, error } = useTemplatesQuery();

  // Permission logic
  const canEdit = (template: Template) => {
    if (userRole === 'admin' && template.is_default) return true;
    if ((userRole === 'admin' || userRole === 'employer') && !template?.is_default) return true;
    return false;
  };
  const canDelete = () => userRole === 'admin';
  const canCreate = userRole === 'admin' || userRole === 'employer';

  console.log('TemplateModal: canCreate:', canCreate, 'userRole:', userRole);

  const handleApplyTemplate = () => {
    console.log('TemplateModal: Apply template clicked, selectedTemplate:', selectedTemplate);
    if (selectedTemplate) {
      console.log('TemplateModal: Calling onTemplateSelect with:', selectedTemplate);
      onTemplateSelect(selectedTemplate);
      onClose();
    } else {
      console.log('TemplateModal: No template selected');
    }
  };

  const handleCreateTemplate = () => {
    setCreateModalOpen(true);
  };

  const handleClose = () => {
    console.log('TemplateModal: Closing modal');
    setSelectedTemplate(null);
    setPreviewTemplate(null);
    onClose();
  };

  // Replace setSelectedTemplate with a handler that toggles selection
  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(prev => (prev && prev.id === template.id ? null : template));
  };

  // Determine button behavior based on selection state
  const isTemplateSelected = !!selectedTemplate;
  const buttonText = isTemplateSelected ? t('templates.apply') : t('templates.create.button');
  const buttonIcon = isTemplateSelected ? <CheckIcon /> : <AddIcon />;
  const buttonOnClick = isTemplateSelected ? handleApplyTemplate : handleCreateTemplate;
  const buttonDisabled = !canCreate && !isTemplateSelected;

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { minHeight: '70vh' } }}
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h5">
              {t('templates.title')}
            </Typography>
            <IconButton onClick={handleClose} aria-label={t('common.close')}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {t('templates.error.loading')}
            </Alert>
          )}
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
              <CircularProgress />
            </Box>
          ) : (
            <TemplateList
              onSelect={handleSelectTemplate}
              selectedTemplateId={selectedTemplate?.id}
              onPreview={setPreviewTemplate}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('common.cancel')}</Button>
          <Button
            onClick={buttonOnClick}
            variant="contained"
            disabled={buttonDisabled}
            startIcon={buttonIcon}
            data-testid="open-create-template-btn"
          >
            {buttonText}
          </Button>
        </DialogActions>
      </Dialog>
      <TemplateDetailModal
        open={!!previewTemplate}
        template={previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        canEdit={!!previewTemplate && canEdit(previewTemplate)}
        canDelete={!!previewTemplate && canDelete()}
      />
      <TemplateCreateModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </>
  );
};

export default TemplateModal; 