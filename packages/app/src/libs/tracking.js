import Vue from 'vue';
import VueMatomo from 'vue-matomo';
import config from '@/libs/config';

function init(router) {
  if (!config('matomo_url') || !config('matomo_site')) {
    return;
  }

  Vue.use(VueMatomo, {
    // Configure your matomo server and site by providing
    host: config('matomo_url'),
    siteId: config('matomo_site'),

    // Changes the default .js and .php endpoint's filename
    // Default: 'piwik'
    trackerFileName: 'piwik',

    // Overrides the autogenerated tracker endpoint entirely
    // Default: undefined
    // trackerUrl: 'https://example.com/whatever/endpoint/you/have',

    // Enables automatically registering pageviews on the router
    router,

    // Enables link tracking on regular links. Note that this won't
    // work for routing links (ie. internal Vue router links)
    // Default: true
    enableLinkTracking: true,

    // Require consent before sending tracking information to matomo
    // Default: false
    requireConsent: false,

    // Whether to track the initial page view
    // Default: true
    trackInitialView: true,

    // Whether or not to log debug information
    // Default: false
    debug: process.env.NODE_ENV,
  });
}

export default {
  init,
};
