import { Backdrop, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PostFabOptionsProps } from '@models/post.model';
import usePostFabPublishSaveDel from '@hooks/components/posts/usePostFabPublishSaveDel';
import type { Template } from '@models/template.model';
import TemplateModal from '@components/templates/TemplateModal';

function PostFabOptions({ id = -1, valuesForm, handleErrorFormat, onTemplateSelect }: PostFabOptionsProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const handleOpenCloseDial = () => setOpen(!open);
  const { actions } = usePostFabPublishSaveDel({ valuesForm, id, handleErrorFormat });

  const handleTemplateSelect = (template: Template) => {
    console.log('PostFabOptions: Template selected:', template);
    
    // Fill the form with template data
    const updatedValues = {
      ...valuesForm,
      title: template.title,
      description: template.description,
      tags: template.tags || '',
      imageUrl: template.image_url || valuesForm.imageUrl, // Use template image if available
      category: template.category || '',
      emoji: template.emoji || '',
    };
    
    console.log('PostFabOptions: Updated form values:', updatedValues);
    
    // Call the callback to update the form
    if (onTemplateSelect) {
      console.log('PostFabOptions: Calling onTemplateSelect callback');
      onTemplateSelect(updatedValues);
    } else {
      console.log('PostFabOptions: onTemplateSelect callback is not provided');
    }
  };

  const handleTemplateButtonClick = () => {
    console.log('PostFabOptions: Template button clicked, opening modal');
    setTemplateModalOpen(true);
    setOpen(false);
  };

  return (
    <div>
      <Backdrop open={open} />
      <SpeedDial
        id='speed-dial-posts'
        ariaLabel="speed-dial-posts"
        icon={<SpeedDialIcon />}
        onClick={handleOpenCloseDial}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            id={action.keyId}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => {
              console.log('PostFabOptions: Action clicked:', action.name);
              if (action.name === t('post.fab.template')) {
                handleTemplateButtonClick();
              } else {
                action.onClick();
              }
            }}
          />
        ))}
      </SpeedDial>
      
      <TemplateModal
        open={templateModalOpen}
        onClose={() => {
          console.log('PostFabOptions: Template modal closing');
          setTemplateModalOpen(false);
        }}
        onTemplateSelect={handleTemplateSelect}
      />
    </div>
  );
}

export default PostFabOptions;
