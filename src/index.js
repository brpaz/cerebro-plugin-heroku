
const PLUGIN_NAME = 'heroku';
const PLUGIN_KEYWORD = 'heroku';
const PLUGIN_REGEX = /heroku(.*)/;

const icon = require('../assets/icon.png');
const HerokuClient = require('./HerokuClient');

const HEROKU_DASHBAORD_URL = 'https://dashboard.heroku.com';
const HEROKU_STATUS_PAGE_URL = 'https://status.heroku.com';
const HEROKU_ACCOUNT_URL = 'https://dashboard.heroku.com/account';

const herokuClient = new HerokuClient();

/**
 * Display Application menu.
 */
const displayMenu = (display, actions) => {
  display([
    {
      title: 'Apps',
      icon: icon,
      subtitle: 'Lists all apps deployed to heroku',
      term: `${PLUGIN_KEYWORD} apps`,
    },
    {
      title: 'Open Dashboard',
      subtitle: 'Open Heroku Dashboard',
      icon: icon,
      onSelect: () => {
        actions.open(HEROKU_DASHBAORD_URL);
      }
    },
    {
      title: 'Account Settings',
      subtitle: 'Open Account page on Heroku website',
      icon: icon,
      onSelect: () => {
        actions.open(HEROKU_ACCOUNT_URL);
      }
    },
    {
      title: 'Status',
      subtitle: 'Open Heroku Status page',
      icon: icon,
      onSelect: () => {
        actions.open(HEROKU_STATUS_PAGE_URL);
      }
    }
  ]);
};

/**
 * Lists Applications from Heroku.
 */
const listApps = (display, hide, actions, settings) => {
  let results = [];

  display({
    id: 'loading',
    title: 'Loading data',
    icon: icon
  });

  herokuClient.setAccessToken(settings.accessToken);
  herokuClient.getApps().then((apps) => {

    if (apps.length === 0) {
      display({
        title: 'No Apps found for the configured Heroku Account',
        icon: icon
      });
      return;
    }

    results = apps.map((app) => {
      return {
        id: app.id,
        title: app.name,
        icon: icon,
        subtitle: app.buildpack_provided_description,
        onSelect: () => {
          actions.open(app.web_url);
        }
      };
    });

    hide('loading');
    display(results);

  }).catch((err) => {
    hide('loading');
    display({
      title: 'Error',
      subtitle: err.message,
      icon: icon
    });
  });
};

/**
 * Main plugin entrypoint
 */
const plugin = ({
  term, display, hide, actions, settings
}) => {
  const match = term.match(PLUGIN_REGEX);

  if (match) {
    switch (match[1].trim()) {
      case 'apps':
        listApps(display, hide, actions, settings);
        break;
      default:
        displayMenu(display, actions);
        break;
    }
  }
};

module.exports = {
  fn: plugin,
  name: PLUGIN_NAME,
  keyword: PLUGIN_KEYWORD,
  icon,
  settings: {
    accessToken: { type: 'string' }
  }
};
