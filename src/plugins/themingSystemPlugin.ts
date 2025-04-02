import deepmerge from "deepmerge";
import plugin from "tailwindcss/plugin";

import { appTheme } from "../themes/appTheme";

export const themingSystemPlugin = plugin(
  // Note: somehow unable to use { theme } and pass it into our functions
  // so we're using config instead
  function () {
    return
  },
  {
    theme: {
      extend: {
        // Create tailwind config based on themes
        ...deepmerge.all([appTheme]),
      },
    },
  },
);
