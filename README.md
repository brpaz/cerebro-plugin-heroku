# cerebro-plugin-heroku

[![Build Status](https://travis-ci.org/brpaz/cerebro-plugin-heroku.svg?branch=master)](https://travis-ci.org/brpaz/cerebro-plugin-heroku)

> [Cerebro](http://cerebroapp.com) plugin for Heroku, providing handy shortcuts for your Apps, Dashboard, Account and Status Page.

![](demo.gif)

## Installation

Type ```plugins heroku``` in Cerebro window  to search and install the plugin.

## Usage

To be able to use this plugin you must have an API access Token to acess Heroku API. You can generate one at [Account Page](https://dashboard.heroku.com/account). Look for "API Key" section in the end of the page. After you get the API Key, set the value in the plugin settings in Cerebro.

## Development

**Clone repo**

```
git clone https://github.com/brpaz/cerebro-plugin-heroku
```

**Install dependencies**

```
yarn install
```

**Launch the plugin**

```yarn start````

- A symlink will be created between the plugin folder and the Cerebro plugins folder.
- You will need to reload your Cerebro settings (Right click on Cerebro tray icon -> Development -> Reload).
- You can use Cerebro Dev Tools to debug your plugin.

## Related

* [Cerebro](http://github.com/KELiON/cerebro) – Plugin extracted from core Cerebro app.
* [cerebro-plugin](http://github.com/KELiON/cerebro-plugin) – Boilerplate to create Cerebro plugins.
* [Cerebro Plugin docs](https://github.com/KELiON/cerebro/tree/master/docs) - Official Cerebro Plugins documentation.
