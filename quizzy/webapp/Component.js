sap.ui.define([
    "sap/ui/core/UIComponent",
    "com/incture/quizzy/model/models",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/core/routing/History"
], (UIComponent, models, JSONModel, ResourceModel,History) => {
    "use strict";

    return UIComponent.extend("com.incture.quizzy.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // // call the base component's init function
            // UIComponent.prototype.init.apply(this, arguments);

            // // set the device model
            // this.setModel(models.createDeviceModel(), "device");

            // // enable routing

            UIComponent.prototype.init.apply(this, arguments);

            var oQuizModel = new JSONModel({
                questions: [],
                currentQuestion: 0,
                score: 0,
                selectedOption: null,
                showResult: false,
                correctAnswers: 0,
                wrongAnswers: 0
            });

            this.setModel(oQuizModel, "quiz");

            this.getRouter().initialize();

            // Load quiz data
            var oDataModel = new JSONModel();
            oDataModel.loadData("model/questions.json");
            oDataModel.attachRequestCompleted(() => {
                oQuizModel.setProperty("/questions", oDataModel.getProperty("/questions"));
            });

        }
    });
});