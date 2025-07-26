import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { TemplateFormValues } from '@models/template.model';
import { useTemplateCreateMutation } from '@hooks/mutations/templates/useTemplateCreateMutation';
import EmojiPicker from './EmojiPicker';

interface TemplateCreateModalProps {
  open: boolean;
  onClose: () => void;
}

const initialForm: TemplateFormValues = {
  title: '',
  description: '',
  tags: '',
  category: '',
  emoji: ''
};

const TemplateCreateModal: React.FC<TemplateCreateModalProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [form, setForm] = useState<TemplateFormValues>(initialForm);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const createMutation = useTemplateCreateMutation();

  const handleFormChange = (field: keyof TemplateFormValues, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.category.trim() || !form.emoji.trim()) return;
    await createMutation.mutateAsync(form);
    setForm(initialForm);
    onClose();
  };

  const handleClose = () => {
    setForm(initialForm);
    onClose();
  };

  const handleEmojiSelect = (emoji: string) => {
    handleFormChange('emoji', emoji);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle data-testid="create-template-title">{t('templates.create.title')}</DialogTitle>
        <form onSubmit={handleSubmit} autoComplete="off">
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label={t('templates.form.title')}
                value={form.title}
                required
                inputProps={{
                  'data-testid': 'template-title-input',
                }}
                disabled={false}
                onChange={e => handleFormChange('title', e.target.value)}
              />
              <TextField
                label={t('templates.form.description')}
                value={form.description}
                onChange={e => handleFormChange('description', e.target.value)}
                multiline
                minRows={2}
                inputProps={{ maxLength: 500, 'data-testid': 'template-description-input' }}
                required
              />
              <TextField
                label={t('templates.form.tags')}
                value={form.tags}
                onChange={e => handleFormChange('tags', e.target.value)}
                placeholder="firsttag,secondtag,thirdtag"
                inputProps={{ 'data-testid': 'template-tags-input' }}
                required
              />
              <FormControl fullWidth required>
                <InputLabel>{t('templates.form.category')}</InputLabel>
                <Select
                  value={form.category}
                  label={t('templates.form.category')}
                  onChange={e => handleFormChange('category', e.target.value)}
                  required
                  inputProps={{ 'data-testid': 'template-category-select' }}
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
                value={form.emoji}
                onChange={e => handleFormChange('emoji', e.target.value)}
                onClick={() => setEmojiPickerOpen(true)}
                placeholder="🚀"
                inputProps={{ 'data-testid': 'template-emoji-input' }}
                required
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>{t('common.cancel')}</Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              data-testid="template-create-submit"
              disabled={
                createMutation.status === 'pending' ||
                !form.title.trim() ||
                !form.description.trim() ||
                !form.tags.trim() ||
                !form.category.trim() ||
                !form.emoji.trim()
              }
            >
              {t('common.create')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <EmojiPicker
        open={emojiPickerOpen}
        onClose={() => setEmojiPickerOpen(false)}
        onSelect={handleEmojiSelect}
        currentEmoji={form.emoji}
      />
    </>
  );
};

export default TemplateCreateModal; 