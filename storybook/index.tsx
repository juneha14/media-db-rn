import {
  getStorybookUI,
  configure,
  addDecorator,
} from "@storybook/react-native";
import "./rn-addons";
import { withKnobs } from "@storybook/addon-knobs";
import { loadStories } from "./storyLoader";

// enables knobs for all stories
addDecorator(withKnobs);

// import stories
configure(() => {
  // require("./stories");
  loadStories();
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({ asyncStorage: null });

export default StorybookUIRoot;
