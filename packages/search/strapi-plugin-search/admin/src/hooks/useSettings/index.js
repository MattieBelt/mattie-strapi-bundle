import { useEffect } from 'react';
import { request, useNotification } from '@strapi/helper-plugin';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash/fp';
import { IS_LOADING_SETTINGS, RESOLVE_SETTINGS, UPDATE_SETTINGS } from '../constants';
import pluginId from '../../pluginId';

const fetchSettings = async (toggleNotification) => {
  return request(`/${pluginId}/settings`, {
      method: 'GET',
    });
};

const postContentType = async (contentType, skipSyncing) => {
  return
};

const putSyncContentType = async (contentType) => {
  return
};

const deleteContentType = async (contentType) => {
  return request(`/${pluginId}/settings/content-types/${contentType}/delete`, {
      method: 'PUT',
    });
};

const useSettings = () => {
  const dispatch = useDispatch();
  const toggleNotification = useNotification();
  const settings = useSelector(state => state[`${pluginId}_settings`].settings);
  const contentTypes = useSelector(state => state[`${pluginId}_settings`].contentTypes);
  const isLoading = useSelector(state => state[`${pluginId}_settings`].isLoading);

  useEffect(() => {
    if(isEmpty(settings)) {
      fetchSettings(toggleNotification)
      .then(({ settings, contentTypes }) =>
        dispatch({ type: RESOLVE_SETTINGS, settings, contentTypes })
      ).catch(() => {
        toggleNotification({
          type: 'warning',
          message: { id: 'notification.error' },
        });
      });
    }
  }, [dispatch, settings, toggleNotification]);

  const addContentType = (contentType, skipSyncing) => {
    dispatch({ type: IS_LOADING_SETTINGS });

    return request(`/${pluginId}/settings/content-types`, {
        method: 'POST',
        body: { contentType, skipSyncing },
      }).then(({ settings }) => dispatch({ type: UPDATE_SETTINGS, settings }))
        .catch(() => {
          toggleNotification({
            type: 'warning',
            message: { id: 'notification.error' },
          });
          dispatch({ type: IS_LOADING_SETTINGS });
        });
  };

  const deleteContentType = (contentTypeUid) => {
    dispatch({ type: IS_LOADING_SETTINGS });

    return request(`/${pluginId}/settings/content-types/${contentTypeUid}`, { method: 'DELETE' })
      .then(({ settings }) => dispatch({ type: UPDATE_SETTINGS, settings }))
      .catch(() => {
        toggleNotification({
          type: 'warning',
          message: { id: 'notification.error' },
        });
        dispatch({ type: IS_LOADING_SETTINGS });
      });
  };

  const syncContentType = (contentTypeUid) => {
    dispatch({ type: IS_LOADING_SETTINGS });

    return request(`/${pluginId}/settings/content-types/${contentTypeUid}/sync`, { method: 'PUT' })
      .then(({ settings }) => dispatch({ type: UPDATE_SETTINGS, settings }))
      .catch(() => {
        toggleNotification({
          type: 'warning',
          message: { id: 'notification.error' },
        });
        dispatch({ type: IS_LOADING_SETTINGS });
      });
  };

  return {
    addContentType,
    contentTypes,
    deleteContentType,
    isLoading,
    syncContentType,
    settings,
  };
};

export default useSettings;
