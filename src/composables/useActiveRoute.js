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

  const currentRouteName = computed(() => {
    return route.name;
  });

  const currentPath = computed(() => {
    return route.path;
  });

  return {
    isRouteActive,
    currentRouteName,
    currentPath,
  };
}
