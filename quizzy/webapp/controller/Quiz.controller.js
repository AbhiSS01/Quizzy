sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], function (Controller, MessageToast) {
  "use strict";
  return Controller.extend("com.incture.quizzy.controller.Quiz", {
      onInit: function () {
          this.oModel = this.getOwnerComponent().getModel("quiz");
          
          // Wait for questions to be loaded before setting up the current question
          this.oModel.attachPropertyChange(this.onQuizModelChange.bind(this));
          
          // Initialize the first question if questions are already loaded
          this.setupCurrentQuestion();
      },

      onQuizModelChange: function(oEvent) {
          const sPath = oEvent.getParameter("path");
          if (sPath === "/questions" || sPath === "/currentQuestion") {
              this.setupCurrentQuestion();
          }
      },

      setupCurrentQuestion: function() {
          const aQuestions = this.oModel.getProperty("/questions");
          const iCurrentIndex = this.oModel.getProperty("/currentQuestion");
          
          if (aQuestions && aQuestions.length > 0 && aQuestions[iCurrentIndex]) {
              const oCurrentQuestion = aQuestions[iCurrentIndex];
              this.oModel.setProperty("/currentQuestionText", oCurrentQuestion.text);
              this.oModel.setProperty("/currentOptions", oCurrentQuestion.options);
              this.oModel.setProperty("/selectedIndex", -1);
              this.oModel.setProperty("/selectedOption", null);
              
              // Clear all radio button selections
              this.clearRadioSelections();
          }
      },

      clearRadioSelections: function() {
          // Clear radio button selections
          const aRadioButtons = ["option0", "option1", "option2", "option3"];
          aRadioButtons.forEach(sId => {
              const oRadioButton = this.byId(sId);
              if (oRadioButton) {
                  oRadioButton.setSelected(false);
              }
          });
      },

      onSelectOption: function (oEvent) {
          const oRadioButton = oEvent.getSource();
          const sOptionIndex = oRadioButton.data("optionIndex");
          const aOptions = this.oModel.getProperty("/currentOptions");
          
          if (aOptions && aOptions[sOptionIndex]) {
              const sSelectedOption = aOptions[sOptionIndex];
              this.oModel.setProperty("/selectedIndex", parseInt(sOptionIndex));
              this.oModel.setProperty("/selectedOption", sSelectedOption);
          }
      },

      onNext: function () {
          const iCurrentIndex = this.oModel.getProperty("/currentQuestion");
          const aQuestions = this.oModel.getProperty("/questions");
          const sSelectedOption = this.oModel.getProperty("/selectedOption");

          if (!sSelectedOption) {
              MessageToast.show("Please select an answer");
              return;
          }

          // Check if answer is correct
          const oCurrentQuestion = aQuestions[iCurrentIndex];
          if (sSelectedOption === oCurrentQuestion.answer) {
              this.oModel.setProperty("/score", this.oModel.getProperty("/score") + 1);
              this.oModel.setProperty("/correctAnswers", this.oModel.getProperty("/correctAnswers") + 1);
          } else {
              this.oModel.setProperty("/wrongAnswers", this.oModel.getProperty("/wrongAnswers") + 1);
          }

          // Move to next question or results
          if (iCurrentIndex + 1 < aQuestions.length) {
              this.oModel.setProperty("/currentQuestion", iCurrentIndex + 1);
              this.setupCurrentQuestion();
          } else {
              this.getOwnerComponent().getRouter().navTo("result");
          }
      }
  });
});