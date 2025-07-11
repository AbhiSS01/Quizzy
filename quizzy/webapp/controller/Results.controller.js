sap.ui.define([
    "sap/ui/core/mvc/Controller"
  ], function (Controller) {
    "use strict";
    return Controller.extend("com.incture.quizzy.controller.Results", {
      onRestart: function () {
        var oModel = this.getOwnerComponent().getModel("quiz");
        oModel.setProperty("/currentQuestion", 0);
        oModel.setProperty("/score", 0);
        oModel.setProperty("/correctAnswers", 0);
        oModel.setProperty("/wrongAnswers", 0);
        oModel.setProperty("/selectedOption", null);
  
        this.getOwnerComponent().getRouter().navTo("RouteHome");
      }
    });
  });