// toast-plugin.js
// import Toast from '@/components/ui/ToastNotification.vue';

import { createVNode, render } from 'vue';
import Toast from '@/plugins/ToastNotification.vue';

import i18n from '@/i18n';

const t = (key) => {
  return i18n.global.t(key);
}

// Use the translate function
// console.log(t("NOT_FOUND_OR_NOT_ALLOWED"));

export default {
  install: (app, options) => {
    const container = document.createElement('div');
    const toast = createVNode(Toast, options);

    app.config.globalProperties.$toast = {
      show(params) {
        params.message = t(params.message);
        params.duration = params.duration || 4000;
        // toast.props = { ...toast.props, ...params };
        render(toast, container);
        if (!container.isConnected) {
          document.body.appendChild(container);
        }
        toast.component.proxy.show(params);
      },
    };

    app.config.globalProperties.$toast_error = {
      show(error) {
        // toast.props = { ...toast.props, ...params };
        render(toast, container);
        if (!container.isConnected) {
          // remove any existing toasts
          // const toasts = document.querySelectorAll('.toast-notification');
          // toasts.forEach(toast => {
          //   toast.remove();
          // }
          // )
          document.body.appendChild(container);
        }
        console.log('error', error)
        toast.component.proxy.show(
          {
            message: t(error.message),
            type: "error",
            icon: "error",
            duration: error.duration || 6000,
            key: Date.now(),
          }
        );
      },
    };

    app.config.globalProperties.$toast_warn = {
      show(message) {
        // toast.props = { ...toast.props, ...params };
        render(toast, container);
        if (!container.isConnected) {
          document.body.appendChild(container);
        }
        console.log('message', message)
        toast.component.proxy.show(
          {
            message: t(message),
            type: "warning",
            icon: "warning",
            duration: 6000,
            key: Date.now(),
          }
        );
      },
    };

    app.provide('toast', app.config.globalProperties.$toast);
    app.provide('toast_warn', app.config.globalProperties.$toast_warn);
    app.provide('toast_error', app.config.globalProperties.$toast_error);
  },
};