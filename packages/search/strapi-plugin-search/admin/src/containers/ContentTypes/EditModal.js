import React, { memo, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import useSettings from '../../hooks/useSettings';
import getTrad from "../../utils/getTrad";
import FormModal from '../../components/FormModal';

const EditModal = ({ isCreating = false, isOpen, onClose }) => {
  const { formatMessage } = useIntl();
  const { uid } = useParams();
  const { contentTypes, addContentType, isLoading, settings } = useSettings();

  const existingContentTypeUids = settings && settings.contentTypes ? settings.contentTypes.map((contentType) => contentType.uid) : [];

  let contentType = {};

  useEffect(() => {
    if(settings && settings.contentTypes) {
      if(!isCreating && uid && settings.contentTypes) {
        contentType = settings.contentTypes.find((contentType) => contentType.uid === uid);
        if(!contentType) {
          onClose();
        }
      }
    }
  }, [settings]);

  const form = [
    {
      name: 'uid',
      type: 'select',
      intlLabel: {
        id: getTrad('ContentTypes.Form.content-type.label'),
        defaultMessage: 'Content type',
      },
      description: {
        id: getTrad('ContentTypes.Form.content-type.description'),
        defaultMessage: 'Select a content type',
      },
      size: {
        col: 12
      },
      hidden: !isCreating,
      required: true,
      options: contentTypes.map((contentType, index) => ({
        metadatas: {
          intlLabel: {
            id: getTrad('PopUpForm.Email.options.from.name.label'),
            defaultMessage: contentType.info.displayName,
          },
          hidden: existingContentTypeUids.includes(contentType.uid),
        },
        key: index,
        value: contentType.uid,
      })),
    }, {
      name: 'index',
      type: 'text',
      intlLabel: {
        id: getTrad('ContentTypes.Form.index.label'),
        defaultMessage: 'Index (optional)',
      },
      description: {
        id: getTrad('ContentTypes.Form.index.description'),
        defaultMessage: 'Name of the index, defaults to uid, (e.g. api::podcast.podcast)',
      },
    }, {
      name: 'prefix',
      type: 'text',
      intlLabel: {
        id: getTrad('ContentTypes.Form.prefix.label'),
        defaultMessage: 'Prefix (optional)',
      },
      description: {
        id: getTrad('ContentTypes.Form.prefix.description'),
        defaultMessage: 'A custom entry id prefix used in composite indexes (e.g. `podcast-${id}`).',
      },
    }, {
      name: 'fields',
      type: 'select',
      intlLabel: {
        id: getTrad('ContentTypes.Form.content-type.label'),
        defaultMessage: 'Fields',
      },
      description: {
        id: getTrad('ContentTypes.Form.content-type.description'),
        defaultMessage: 'Coming soon ✨',
      },
      size: {
        col: 12
      },
      disabled: true,
      multi: true,
      withTags: true,
      options: [{
        metadatas: {
          intlLabel: {
            id: getTrad('PopUpForm.Email.options.from.name.label'),
            defaultMessage: 'One',
          },
        },
        key: 1,
        value: 'one'
      }],
    }, {
      type: 'divider',
    }, {
      name: 'skipSyncing',
      type: 'checkbox',
      intlLabel: {
        id: getTrad('ContentTypes.Form.content-type.label'),
        defaultMessage: isCreating ? 'Skip the indexing after the content type has been added.' : 'Skip the syncing of the content type.',
      },
      size: {
        col: 12
      },
    }, {
      name: 'skipDeletion',
      type: 'checkbox',
      intlLabel: {
        id: getTrad('ContentTypes.Form.content-type.label'),
        defaultMessage: 'Skip the deletion of the old index if the index field has been changed.',
      },
      hidden: isCreating,
      size: {
        col: 12
      },
    }
  ];

  const onSubmit = ({ uid, index, prefix, fields, skipSyncing }) => {
    addContentType({ uid, index, prefix, fields }, skipSyncing)
      .then(onClose);
  }

  return <FormModal
            isCreating={isCreating}
            isLoading={isLoading}
            isOpen={isOpen}
            onCancel={onClose}
            onSubmit={onSubmit}
            form={form}
            title={formatMessage({ id: isCreating ? 'ContentTypes.Form.Title.create' : 'ContentTypes.Form.Title.update', defaultMessage: 'Configure'}, { uid: contentType.uid })}
            values={contentType}
          />;
}

export default memo(EditModal);
