// Analytics loads on demand: posthog-js leaves the main bundle and is only
// fetched when a key is configured. Without a key the stub below is a no-op.
const key = process.env.REACT_APP_PUBLIC_POSTHOG_KEY;
const host = process.env.REACT_APP_PUBLIC_POSTHOG_HOST;

let instance = null;
const queue = [];

if (key) {
  import("posthog-js").then(({ default: posthog }) => {
    posthog.init(key, {
      api_host: host,
      person_profiles: "identified_only",
    });
    instance = posthog;
    while (queue.length) {
      const [event, props] = queue.shift();
      instance.capture(event, props);
    }
  });
}

export default {
  capture(event, props) {
    if (!key) return;
    if (instance) instance.capture(event, props);
    else if (queue.length < 50) queue.push([event, props]);
  },
};
