import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import PluginIcon from './components/PluginIcon';
import searchReducers from './hooks/reducers';


const name = pluginPkg.strapi.uid;

export default {
  register(app) {
    app.addReducers(searchReducers);

    app.registerPlugin({
      id: pluginId,
      isReady: true,
      name,
    });

    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: 'Search',
      },
      Component: async () => {
        const component = await import(/* webpackChunkName: "search-app" */ './App');

        return component;
      },
      permissions: [
        // Uncomment to set the permissions of the plugin here
        // {
        //   action: '', // the action name should be plugin::plugin-name.actionType
        //   subject: null,
        // },
      ],
    });

  },

  bootstrap(app) {},

async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          /* webpackChunkName: "search-translation-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      }),
    );

    return Promise.resolve(importedTrads);
  },
};
