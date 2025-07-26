import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  IconButton,
  TextField,
  InputAdornment
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface EmojiPickerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (emoji: string) => void;
  currentEmoji?: string;
}

const EMOJI_CATEGORIES = {
  'Smileys & Emotion': ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '��', '🤒', '��'],
  'Objects': ['��', '��', '��', '⌚', '📷', '��', '��', '📻', '��️', '🎚️', '��️', '📟', '📠', '🔋', '��', '��', '��', '��️', '��', '��', '��️', '💸', '💵', '💴', '💶', '💷', '🪙', '💰', '💳', '💎', '⚖️', '🪜', '🧰', '🪛', '��', '��', '⚒️', '��️', '⛏️', '🪚', '🔩', '⚙️', '🪤', '🧲', '🧪', '🧫', '🧬', '🔬', '🔭', '📡', '💉', '🩸', '💊', '🩹', '🩺', '🩻', '🩼', '🩽', '🩾', '🩿', '🪀', '🪁', '🪂', '🧿', '🪄', '🪅', '🪆', '🪇', '🪈', '🪉', '🪊', '🪋', '🪌', '🪍', '🪎', '🪏', '🪐', '🪑', '🪒', '🪓', '🪔', '🪕', '🪖', '🪗', '🪘', '🪙', '🪚', '🪛', '🪜', '🪝', '🪞', '🪟', '🪠', '🪡', '🪢', '🪣', '🪤', '🪥', '🪦', '🪧', '🪨', '🪩', '🪪', '🪫', '🪬', '🪭', '🪮', '🪯', '🪰', '🪱', '🪲', '🪳', '🪴', '🪵', '🪶', '🪷', '🪸', '🪹', '🪺', '🪻', '🪼', '��', '🪾', '��'],
  'Activities': ['⚽', '��', '��', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑', '��', '��', '��', '⛳', '🪁', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛷', '⛸️', '🥌', '🎿', '⛷️', '🏂', '��', '��️‍♀️', '��️', '��️‍♂️', '🤼‍♀️', '🤼', '🤼‍♂️', '🤸‍♀️', '🤸', '🤸‍♂️', '⛹️‍♀️', '⛹️', '⛹️‍♂️', '��', '🤾‍♀️', '��', '��‍♂️', '��️‍♀️', '��️', '��️‍♂️', '��', '🧘‍♀️', '🧘', '🧘‍♂️', '🏄‍♀️', '🏄', '🏄‍♂️', '🏊‍♀️', '🏊', '🏊‍♂️', '🤽‍♀️', '🤽', '🤽‍♂️', '🚣‍♀️', '🚣', '🚣‍♂️', '🧗‍♀️', '🧗', '🧗‍♂️', '🚵‍♀️', '🚵', '🚵‍♂️', '🚴‍♀️', '��', '��‍♂️', '🏆', '🥇', '��', '��', '🏅', '��️', '🏵️', '🎗️', '��', '🎟️', '��', '🤹‍♀️', '��', '��‍♂️', '🎭', '🩰', '🎨', '🎬', '🎤', '🎧', '🎼', '🎹', '🥁', '🪘', '🎷', '🎺', '🪗', '🎸', '🪕', '🎻', '🎲', '♟️', '🎯', '🎳', '🎮', '🎰', '🧩', '🎨', '📱', '��', '��', '⌨️', '��️', '��️', '��️', '🖲️', '��️', '🎮', '🎰', '🎲', '🧩', '��', '��', '��', '🎟️', '��', '��️', '🏅', '🏆', '��', '��', '��', '⚽', '��', '��', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑', '��', '��', '��', '⛳', '🪁', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛷', '⛸️', '🥌', '🎿', '⛷️', '🏂', '��', '��️‍♀️', '��️', '��️‍♂️', '🤼‍♀️', '🤼', '🤼‍♂️', '🤸‍♀️', '🤸', '🤸‍♂️', '⛹️‍♀️', '⛹️', '⛹️‍♂️', '��', '🤾‍♀️', '��', '��‍♂️', '��️‍♀️', '��️', '��️‍♂️', '��', '🧘‍♀️', '🧘', '🧘‍♂️', '🏄‍♀️', '🏄', '🏄‍♂️', '🏊‍♀️', '🏊', '🏊‍♂️', '🤽‍♀️', '🤽', '🤽‍♂️', '🚣‍♀️', '🚣', '🚣‍♂️', '🧗‍♀️', '🧗', '🧗‍♂️', '🚵‍♀️', '🚵', '🚵‍♂️', '🚴‍♀️', '🚴', '🚴‍♂️'],
  'Business': ['��', '��', '��', '��️', '��', '📆', '🗒️', '��️', '📇', '📈', '📉', '📊', '📋', '��', '��', '��', '��️', '��', '��', '✂️', '��️', '🗄️', '��️', '🔒', '🔓', '��', '��', '��', '��️', '🔨', '🪛', '��', '��', '⚙️', '��️', '⚖️', '🦯', '🔗', '⛓️', '🧰', '🧲', '⚗️', '🧪', '🧫', '🧬', '🔬', '🔭', '📡', '💉', '🩸', '💊', '🩹', '🩺', '🩻', '🩼', '🩽', '🩾', '🩿', '🪀', '🪁', '🪂', '🧿', '🪄', '🪅', '🪆', '🪇', '🪈', '🪉', '🪊', '🪋', '🪌', '🪍', '🪎', '🪏', '🪐', '🪑', '🪒', '🪓', '🪔', '🪕', '🪖', '🪗', '🪘', '🪙', '🪚', '🪛', '🪜', '🪝', '🪞', '🪟', '🪠', '🪡', '🪢', '🪣', '🪤', '🪥', '🪦', '🪧', '🪨', '🪩', '🪪', '🪫', '🪬', '🪭', '🪮', '🪯', '🪰', '🪱', '🪲', '🪳', '🪴', '🪵', '🪶', '🪷', '🪸', '🪹', '🪺', '🪻', '🪼', '��', '🪾', '🪿']
};

const EmojiPicker: React.FC<EmojiPickerProps> = ({ open, onClose, onSelect, currentEmoji }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmojis = Object.entries(EMOJI_CATEGORIES)
    .filter(([category]) => category.toLowerCase().includes(searchTerm.toLowerCase()))
    .flatMap(([_, emojis]) => emojis)
    .filter(emoji => emoji.includes(searchTerm));

  const handleEmojiSelect = (emoji: string) => {
    onSelect(emoji);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('templates.form.emoji')}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          placeholder={t('templates.form.emoji')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        <Grid container spacing={1}>
          {filteredEmojis.map((emoji, index) => (
            <Grid item key={index}>
              <IconButton
                onClick={() => handleEmojiSelect(emoji)}
                sx={{
                  fontSize: '1.5rem',
                  width: 40,
                  height: 40,
                  border: currentEmoji === emoji ? '2px solid #1976d2' : '1px solid #e0e0e0',
                }}
              >
                {emoji}
              </IconButton>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('common.cancel')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmojiPicker; 