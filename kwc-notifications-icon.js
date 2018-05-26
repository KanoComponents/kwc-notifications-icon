/**
`kwc-notifications-icon`
To show notifications status and an overview of notifications.

Custom property | Description | Default
----------------|-------------|----------
`--kwc-notifications-icon-dropdown-width` | The width of the dropdown | `300px`

@demo demo/kwc-notifications-icon.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import '@kano/web-components/kano-drop-down/kano-drop-down.js';
import '@kano/kwc-style/kwc-style.js';
import '@kano/kwc-icons/kwc-ui-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import './kwc-notification.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
        <style>
            :host {
                @apply --layout-horizontal;
                @apply --layout-center;
                @apply --layout-justified;
                display: block;
                height: 32px;
                position: relative;
                width: 32px;
            }
            :host .summary {
                position: relative;
            }
            :host .count {
                background-color: var(--color-flamingo);
                border: 2px solid white;
                border-radius: 4px;
                color: white;
                cursor: pointer;
                font-size: 12px;
                font-weight: bold;
                height: 18px;
                left: -8px;
                line-height: 18px;
                opacity: 0;
                overflow: hidden;
                position: absolute;
                text-align: center;
                top: -8px;
                transition: opacity 0.3s ease;
                width: 18px;
            }
            :host .icon-wrapper {
                @apply --layout-horizontal;
                @apply --layout-center;
                @apply --layout-center-justified;
                background-color: var(--color-stone);
                border-radius: 100%;
                color: white;
                height: 32px;
                line-height: 32px;
                overflow: hidden;
                text-align: center;
                transition: background-color 0.3s ease;
                width: 32px;
            }
            :host iron-icon {
                height: 16px;
                width: 16px;
            }
            :host([_active]) .icon-wrapper {
                background-color: var(--color-flamingo);
                cursor: pointer;
            }
            :host([_active]) .count {
                opacity: 1;
            }
            :host([focused]) .icon-wrapper {
                background-color: var(--color-cinnabar);
                cursor: pointer;
            }
            :host kano-drop-down {
                position: absolute;
                right: -16px;
                top: 150%;
                width: var(--kwc-notifications-icon-dropdown-width, 300px);
            }
            :host .dropdown-header,
            :host .dropdown-footer {
                @apply --layout-horizontal;
                @apply --layout-center;
                @apply --layout-justified;
                box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
                padding: 16px;
                position: relative;
                width: var(--kwc-notifications-icon-dropdown-width, 300px);
                z-index: 10;
            }
            :host h3 {
                color: var(--color-black);
                font-size: 16px;
                margin: 0;
            }
            :host button {
                background: transparent;
                border: 0;
                color: var(--color-grey);
                cursor: pointer;
                font-family: var(--font-body);
                font-size: 16px;
                font-weight: bold;
                padding: 0;
            }
            :host button:hover {
                color: var(--color-black);
            }
            :host button:focus {
                outline: 0;
            }
            :host .dropdown-footer button {
                width: 100%;
            }
            :host .dropdown-notifications {
                background-color: var(--color-porcelain);
                color: var(--color-black);
            }
            :host kwc-notification:first-of-type {
                padding-top: 16px;
            }
            :host kwc-notification:last-of-type {
                padding-bottom: 16px;
            }
            :host kwc-notification:hover {
                background-color: var(--color-stone);
            }
        </style>
        <div class="summary" on-click="_toggle">
            <div class="icon-wrapper">
                <iron-icon icon="kwc-ui-icons:notification"></iron-icon>
            </div>
            <div class="count">
                [[unreadCount]]
            </div>
        </div>
        <kano-drop-down id="dropdown" caret-align="right">
            <div class="dropdown-header">
                <h3>Notifications</h3>
                <button type="button" on-tap="_readAllNotifications">
                    Mark all as read
                </button>
            </div>
            <div class="dropdown-notifications">
                <template is="dom-repeat" items="[[unreadNotifications]]">
                    <kwc-notification notification="[[item]]" on-tap="_notificationSelected">
                    </kwc-notification>
                </template>
            </div>
            <div class="dropdown-footer">
                <button type="button" on-tap="_viewAllNotifications">
                    See all notifications
                </button>
            </div>
        </kano-drop-down>
`,

  is: 'kwc-notifications-icon',

  properties: {
      /**
       * Toggle to indicate whether the component is active,
       * ie. that there are unread notifications.
       */
     _active: {
          type: Boolean,
          computed: '_computeActive(unreadCount)',
          reflectToAttribute: true
      },
      /**
       * Toggle to indicate whether the notifications are currently
       * selected by the user.
       */
      focused: {
          type: Boolean,
          value: false,
          reflectToAttribute: true
      },
      /** The number of unread notifications */
      unreadCount: {
          type: Number,
          value: 0
      },
      /**
       * An array of unread notifications, in the format:
       * ```
       * {
       *      title: String,
       *      category: String,
       *      ...
       * }
       * ```
       */
      unreadNotifications: {
          type: Array,
          value: () => []
      }
  },

  /** Close the dropdown and defocus the component */
  close () {
      this.focused = false;
      this.$.dropdown.close();
      this.fire('notification-dropdown-closed');
  },

  /**
   * Compute whether the component is active, ie. the are unread
   * notifications.
   * @param {Number} unreadCount
   * @return {Boolean}
   */
  _computeActive (unreadCount) {
      return unreadCount ? true : false;
  },

  /** Fire an event to select a notification & close the component */
  _notificationSelected (e) {
      this.fire('notification-selected', e.model.item);
      this.close();
  },

  /**
   * Fire an event to mark all notifications as read
   * & close the component.
   */
  _readAllNotifications () {
      this.fire('read-all-notifications');
      this.close();
  },

  /** Toggle the status of the component and the dropdown */
  _toggle () {
      let eventType;
      if (this._active) {
          this.focused = !this.focused;
          this.$.dropdown.toggle();
      }
      eventType = this.focused ? 'opened' : 'closed';
      this.fire(`notification-dropdown-${eventType}`);
  },

  /**
   * Fire an event to view all notifications & close the component.
   */
  _viewAllNotifications () {
      this.fire('view-all-notifications');
      this.close();
  }
});
