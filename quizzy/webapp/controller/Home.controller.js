sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.incture.quizzy.controller.Home", {
        onInit() {
        },
        onStartPress: function(){
            this.getOwnerComponent().getRouter().navTo("quiz");
        }
    });
});