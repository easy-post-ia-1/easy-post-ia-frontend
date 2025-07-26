import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog as MuiDialog,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions,
  Autocomplete
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import type { Template, TemplateFormValues } from '@models/template.model';
import { useTemplateUpdateMutation } from '@hooks/mutations/templates/useTemplateUpdateMutation';
import { useTemplateDeleteMutation } from '@hooks/mutations/templates/useTemplateDeleteMutation';
import { top100Films } from '@utils/constants/categoriesTags.constants';
import EmojiPicker from './EmojiPicker';

interface TemplateDetailModalProps {
  open: boolean;
  template: Template | null;
  onClose: () => void;
  onApply?: (template: Template) => void;
  canEdit?: boolean;
  canDelete?: boolean;
  onEdit?: (template: Template) => void;
  onDelete?: (template: Template) => void;
}

const TemplateDetailModal: React.FC<TemplateDetailModalProps> = ({
  open,
  template,
  onClose,
  canEdit = false,
}) => {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<TemplateFormValues | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const updateMutation = useTemplateUpdateMutation();
  const deleteMutation = useTemplateDeleteMutation();

  React.useEffect(() => {
    if (template) {
      setForm({
        id: template.id,
        title: template.title,
        description: template.description,
        tags: template.tags,
        category: template.category,
        emoji: template.emoji
      });
    }
  }, [template]);

  if (!template) return null;

  const handleEdit = () => setEditMode(true);
  const handleCancelEdit = () => setEditMode(false);

  const handleFormChange = (field: keyof TemplateFormValues, value: string) => {
    setForm(prev => prev ? { ...prev, [field]: value } : prev);
  };

  const handleSave = async () => {
    if (!form || !form.title.trim() || !form.category.trim() || !form.emoji.trim()) return;
    const response = await updateMutation.mutateAsync({ id: template.id, ...form });
    // If the backend returns the updated template, update the local form state
    if (response && response.template) {
      setForm({
        id: response.template.id,
        title: response.template.title,
        description: response.template.description,
        tags: response.template.tags,
        category: response.template.category,
        emoji: response.template.emoji
      });
    }
    setEditMode(false);
    onClose();
  };

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(template.id);
    setDeleteDialogOpen(false);
    onClose();
  };

  const handleEmojiSelect = (emoji: string) => {
    handleFormChange('emoji', emoji);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">
              {editMode ? t('common.edit') : template.title}
            </Typography>
            <IconButton onClick={onClose} aria-label={t('common.close')}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {editMode ? (
            <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label={t('templates.form.title')}
                value={form?.title || ''}
                required
                inputProps={{ readOnly: true }}
                disabled
              />
              <TextField
                label={t('templates.form.description')}
                value={form?.description || ''}
                onChange={e => handleFormChange('description', e.target.value)}
                multiline
                minRows={2}
                inputProps={{ maxLength: 500 }}
              />
              <Autocomplete
                multiple
                value={form?.tags && form.tags.length > 0 ? form.tags.split(',').map((tag) => ({ label: tag.trim(), year: 0 })) : []}
                limitTags={2}
                id="template-edit-tags"
                options={top100Films}
                getOptionLabel={({ label }) => label}
                renderInput={(params) => <TextField {...params} label={t('templates.form.tags')} placeholder="Add tags..." />}
                onChange={(_, newInputValue) => {
                  const newTags = newInputValue.map((item) => item.label).join(',');
                  handleFormChange('tags', newTags);
                }}
              />
              <FormControl fullWidth>
                <InputLabel>{t('templates.form.category')}</InputLabel>
                <Select
                  value={form?.category || ''}
                  label={t('templates.form.category')}
                  onChange={e => handleFormChange('category', e.target.value)}
                  required
                >
                  <MenuItem value="Marketing">🚀 Marketing</MenuItem>
                  <MenuItem value="News">📰 News</MenuItem>
                  <MenuItem value="Events">🎉 Events</MenuItem>
                  <MenuItem value="Success">🏆 Success</MenuItem>
                  <MenuItem value="Insights">💡 Insights</MenuItem>
                  <MenuItem value="Team">👥 Team</MenuItem>
                  <MenuItem value="Culture">📸 Culture</MenuItem>
                  <MenuItem value="Education">📚 Education</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label={t('templates.form.emoji')}
                value={form?.emoji || ''}
                onClick={() => setEmojiPickerOpen(true)}
                required
                inputProps={{ readOnly: true }}
                helperText="Click to select emoji"
              />
            </Box>
          ) : (
            <>
              <Typography variant="body1" paragraph>
                {template.description}
              </Typography>
              {template.image_url && (
                <Box mb={2}>
                  <img
                    src={template.image_url}
                    alt={template.title}
                    style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
                  />
                </Box>
              )}
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Chip
                  label={`${template.emoji} ${template.category}`}
                  size="small"
                />
                <Typography variant="caption" color="text.secondary">
                  {template.template_type === 'company' ? t('templates.type.company') : t('templates.type.team')}
                </Typography>
              </Box>
              {template.tags && (
                <Typography variant="body2" color="text.secondary">
                  <strong>{t('templates.tags')}:</strong> {template.tags}
                </Typography>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          {editMode ? (
            <>
              <Button onClick={handleCancelEdit}>{t('common.cancel')}</Button>
              <Button
                onClick={handleSave}
                variant="contained"
                color="primary"
                disabled={updateMutation.status === 'pending' || !form?.title || !form?.category || !form?.emoji}
              >
                {t('common.save')}
              </Button>
            </>
          ) : (
            <Button onClick={onClose} color="primary">
              {t('common.close')}
            </Button>
          )}
          {canEdit && !editMode && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleEdit}
            >
              {t('templates.edit.button')}
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <EmojiPicker
        open={emojiPickerOpen}
        onClose={() => setEmojiPickerOpen(false)}
        onSelect={handleEmojiSelect}
        currentEmoji={form?.emoji}
      />
      {/* Delete Confirmation Dialog */}
      <MuiDialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <MuiDialogContent>
          <Typography>{t('templates.confirm_delete')}</Typography>
        </MuiDialogContent>
        <MuiDialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>{t('common.cancel')}</Button>
          <Button onClick={handleDelete} color="error" variant="contained" disabled={deleteMutation.status === 'pending'}>
            {t('common.delete')}
          </Button>
        </MuiDialogActions>
      </MuiDialog>
    </>
  );
};

export default TemplateDetailModal; 