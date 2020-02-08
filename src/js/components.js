import Swiper from "./components/Swiper";
import Card from "./components/Card";
import Heading from "./components/Heading";
import ValidationErrors from "./components/ValidationErrors";
import FileUploader from "./components/FileUploader";

import Vue from "vue";

Vue.component("card", Card);
Vue.component("swiper", Swiper);
Vue.component("heading", Heading);
Vue.component("validation-errors", ValidationErrors);
Vue.component("file-uploader", FileUploader);
