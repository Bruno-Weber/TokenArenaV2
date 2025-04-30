
/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      items: ['overview', 'get-started'],
    },
    {
      type: 'category',
      label: 'Features',
      items: ['market', 'voting', 'wallet', 'nft-market'],
    },
    {
      type: 'category',
      label: 'Advanced',
      items: ['create-token', 'staking'],
    },
  ],
};

module.exports = sidebars;
