/**
`kwc-notification`
A simple display for Kano notifications, with the correct icon.

@demo demo/kwc-notification.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-icon/iron-icon.js';
import '@kano/kwc-icons/kwc-icons.js';
import '@kano/kwc-style/kwc-style.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
        <style>
            :host {
                @apply --layout-horizontal;
                @apply --layout-start;
                @apply --layout-start-justified;
                cursor: pointer;
                font-family: var(--font-body);
                font-weight: bold;
                padding: 8px 16px;
            }
            :host .title {
                margin: 0;
            }
            :host .icon-wrapper {
                @apply --layout-horizontal;
                @apply --layout-start;
                @apply --layout-start-justified;
                margin-right: 8px;
            }
            :host .icon {
                height: 16px;
                width: 16px;
            }
            :host .icon.likes {
                color: var(--color-carnation);
            }
            :host .icon.comments {
                color: var(--color-dodger-blue);
            }
            :host .icon.follows {
                color: var(--color-kano-orange);
            }
            :host .icon.shares {
                color: var(--color-kano-orange);
            }
            :host .icon.gamification {
                color: var(--color-grassland);
            }
        </style>
        <iron-pages selected="[[notification.category]]" attr-for-selected="name" class="icon-wrapper">
            <iron-icon icon="kwc-ui-icons:creation" name="shares" class="icon shares"></iron-icon>
            <iron-icon icon="kwc-ui-icons:like" name="likes" class="icon likes"></iron-icon>
            <iron-icon icon="kwc-ui-icons:user" name="follows" class="icon follows"></iron-icon>
            <iron-icon icon="kwc-ui-icons:notification" name="updates" class="icon updates"></iron-icon>
            <iron-icon icon="kwc-ui-icons:comment" name="comments" class="icon comments"></iron-icon>
            <iron-icon icon="kwc-ui-icons:medal" name="gamification" class="icon gamification"></iron-icon>
        </iron-pages>
        <p class="title">[[notification.title]]</p>
`,

  is: 'kwc-notification',

  properties: {
      /**
       * The notification object in the format:
       * ```
       * {
       *      title: String,
       *      category: String,
       *      ...
       * }
       * ```
       */
      notification: {
          type: Object
      }
  }
});
