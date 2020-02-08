import Vue from "vue";

class Loader {
    static show() {
        if (this.loader) return;

        this.loader = Vue.$loading.show({
            container: null,
            color: "#ccc",
            // loader: "dots",
            width: 80,
            height: 80,
            backgroundColor: "#f2f2f2",
            opacity: 0.8,
            zIndex: 999
        });
    }

    static hide() {
        this.loader && this.loader.hide();

        this.loader = null;
    }
}

export default Loader;
