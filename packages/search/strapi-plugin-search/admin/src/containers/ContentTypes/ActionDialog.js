import React, { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Box } from '@strapi/design-system/Box';
import { Button } from '@strapi/design-system/Button';
import { Dialog, DialogBody, DialogFooter } from '@strapi/design-system/Dialog';
import { Flex } from '@strapi/design-system/Flex';
import { Link } from '@strapi/design-system/Link';
import { Loader } from '@strapi/design-system/Loader';
import { Typography } from '@strapi/design-system/Typography';
import ExclamationMarkCircle from '@strapi/icons/ExclamationMarkCircle';
import LinkIcon from '@strapi/icons/Link';
import Reload from '@strapi/icons/Reload';
import Trash from '@strapi/icons/Trash';
import useSettings from '../../hooks/useSettings';

// Todo: replace with upgraded Icon in @strapi/design-system
const IconWrapper = styled(Box)`
  width: ${({ theme, width }) => theme.spaces[6]};
  height: ${({ theme, height }) => theme.spaces[6]};

  path {
    fill: ${({ color, theme }) => theme.colors[color]};
  }
`;


const ActionDialog = ({ isOpen, onClose }) => {
  const { uid, action } = useParams();
  const { deleteContentType, isLoading, settings, syncContentType } = useSettings();
  const [isRunning, setIsRunning] = useState(false);

  let contentType;

  if(uid && settings.contentTypes) {
    contentType = settings.contentTypes.find((contentType) => contentType.uid === uid);
  }

  const actions = {
    sync: {
      iconColor: 'warning500',
      confirmButton: {
        color: 'secondary',
        onClick: syncContentType,
        icon: <Reload />
      }
    },
    delete: {
      iconColor: 'danger500',
      confirmButton: {
        color: 'danger-light',
        onClick: deleteContentType,
        icon: <Trash />,
      }
    },
  };

  const onConfirm = () => {
    setIsRunning(true);

    actions[action].confirmButton.onClick(uid)
      .then(() => onClose())
      .finally(() => setIsRunning(false));
  };

  useEffect(() => {
    if(settings && settings.contentTypes) {
      if(!Object.keys(actions).includes(action) || !contentType) {
        onClose();
      }
    }
  }, [settings]);

  return (
    <Dialog onClose={onClose} title="Confirmation" isOpen={isOpen}>
      <DialogBody>
        <Flex direction="column" justifyContent="space-between" alignItems="center" height="100%">
          {
            isLoading && !isRunning ? <Loader /> :
            <>
              <IconWrapper color={actions[action]?.iconColor} height={6} width={6}><ExclamationMarkCircle /></IconWrapper>
              <Typography variant="omega">
                Are you sure you want to <Typography fontWeight="bold">{action}</Typography> the index for: <br />
              </Typography>
              <Typography fontWeight="semiBold" variant="epsilon">
                {uid}
              </Typography>
            </>
          }
        </Flex>
      </DialogBody>
      <DialogFooter
        startAction={<Button disabled={isLoading || isRunning} onClick={onClose} variant="tertiary">Cancel</Button>}
        endAction={
          <Button
            disabled={isLoading && !isRunning}
            isLoading={isRunning}
            onClick={onConfirm}
            variant={actions[action].confirmButton.color}
            startIcon={actions[action].confirmButton.icon}
          >
            Confirm
          </Button>}
        />
    </Dialog>
  );
}

export default memo(ActionDialog);
