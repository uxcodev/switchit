// toast-plugin.js
// import Toast from '@/components/ui/ToastNotification.vue';

import { createVNode, render } from 'vue';
import Toast from '@/plugins/ToastNotification.vue';

export default {
  install: (app, options) => {
    const container = document.createElement('div');
    const toast = createVNode(Toast, options);

    app.config.globalProperties.$toast = {
      show(params) {
        // toast.props = { ...toast.props, ...params };
        render(toast, container);
        if (!container.isConnected) {
          document.body.appendChild(container);
        }
        toast.component.proxy.show(params);
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
            message: message,
            type: "warning",
            icon: "warning",
            duration: 6000,
            key: Date.now(),
          }
        );
      },
    };


    app.provide('toast', app.config.globalProperties.$toast);
  },
};