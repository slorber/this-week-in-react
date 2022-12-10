/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = function pluginGoogleTagManager(context, options) {
  const { trackingID } = options;
  const isProd = process.env.NODE_ENV === "production";

  return {
    name: "docusaurus-plugin-google-tag-manager",

    contentLoaded({ actions }) {
      actions.setGlobalData(options);
    },

    injectHtmlTags() {
      if (!isProd) {
        return {};
      }
      return {
        headTags: [
          {
            tagName: "link",
            attributes: {
              rel: "preconnect",
              href: "https://www.googletagmanager.com",
            },
          },
          {
            tagName: "script",
            innerHTML: `window.dataLayer = window.dataLayer || [];`,
          },
          {
            tagName: "script",
            innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${trackingID}');`,
          },
        ],
        preBodyTags: [
          {
            tagName: "noscript",
            innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=${trackingID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          },
        ],
      };
    },
  };
};
