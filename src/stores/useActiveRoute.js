import { computed } from "vue";
import { useRoute } from "vue-router";

export function useActiveRoute() {
  const route = useRoute();

  const isRouteActive = (path) => {
    if (path === "/") {
      return route.path === "/";
    }
    return route.path.startsWith(path);
  };

  return {
    isRouteActive,
  };
}
