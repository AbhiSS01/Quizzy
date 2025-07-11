# 📘 Quizzy – SAPUI5 Quiz App

An interactive multiple-choice quiz application built with **SAPUI5**, using the MVC architecture, dynamic data binding, and client-side JSON data.

---

## 🚀 Features

- ✅ Load quiz questions from a local JSON file
- ✅ Display one question at a time
- ✅ Dynamic answer options via `RadioButtonGroup`
- ✅ Tracks:
  - Total Score
  - Correct Answers
  - Wrong Answers
- ✅ Navigates to result view on completion
- ✅ Clean and responsive layout

---

## 🧩 Project Structure

webapp/
├── controller/
│ ├── App.controller.js
│ ├── Home.controller.js
│ ├── Quiz.controller.js
│ └── Results.controller.js
├── model/
│ ├── models.js
│ └── questions.json # Quiz dataset
├── view/
│ ├── App.view.xml
│ ├── Home.view.xml
│ ├── Quiz.view.xml
│ └── Results.view.xml
├── css/
│ └── style.css
├── i18n/
│ └── i18n.properties
├── Component.js
├── manifest.json
└── index.html



---

## 🔁 Flow

1. **Component.js**:
   - Loads `questions.json` asynchronously
   - Initializes the `/quiz` model
   - Sets `/currentQuestion` after data is loaded

2. **Quiz.controller.js**:
   - Listens to `/currentQuestion` change
   - Derives `/currentQuestionText` and `/currentOptions`
   - Handles selection and scoring logic

3. **Quiz.view.xml**:
   - Binds question and dynamic options
   - Uses `RadioButtonGroup` with `items` aggregation

4. **Results.controller.js** (optional):
   - Reads final score and displays result

---
