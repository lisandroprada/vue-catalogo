import { ref, onMounted } from "vue";

export function useDarkMode() {
  const isDark = ref(false);

  const toggleDark = () => {
    isDark.value = !isDark.value;
    localStorage.setItem("darkMode", isDark.value);
    updateTheme();
  };

  const updateTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  onMounted(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme !== null) {
      isDark.value = savedTheme === "true";
    } else {
      isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    updateTheme();
  });

  return {
    isDark,
    toggleDark,
  };
}
