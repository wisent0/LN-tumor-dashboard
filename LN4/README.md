# Lymph Node & Lymphoma Diagnostic Dashboard 🧬

A responsive, interactive diagnostic tool for Lymphoproliferative Disorders based on the **WHO Classification of Haematolymphoid Tumours (5th Edition, 2022)**.

🔗 **Live Dashboard:** [https://wisent0.github.io/LN-tumor-dashboard/](https://wisent0.github.io/LN-tumor-dashboard/)

## 📋 Overview
This dashboard helps pathologists and residents navigate the complex hierarchy of lymphoma diagnoses. It features:
* **Radial Mind Map View:** A visual "bubble" interface for navigating categories.
* **WHO 5th Ed Criteria:** Up-to-date diagnostic criteria including IHC panels and molecular findings.
* **Mobile Optimized:** Automatically switches to a list view on phones for better usability.
* **Search Functionality:** Instantly find tumors by name, tag, or IHC marker (e.g., "CD30", "Cyclin D1").

## 🛠️ Installation & Usage
This is a static web application. It requires no backend server or installation.

**To run locally:**
1. Clone the repository.
2. Open `index.html` in any modern web browser (Chrome, Edge, Firefox, Safari).

**To deploy (GitHub Pages):**
1. Upload all files to a GitHub repository.
2. Go to **Settings** > **Pages**.
3. Under **Branch**, select `main` (or `master`) and `/root`.
4. Click **Save**.

## 📂 File Structure
* `index.html`: The main entry point and layout.
* `data.js`: Contains the medical knowledge base (WHO 5th Ed data).
* `tree-manager.js`: Handles the visualization logic (Bubble Map vs List).
* `search-manager.js`: Handles the search bar functionality.
* `accessibility-manager.js`: Manages keyboard navigation and screen reader support.
* `styles.css`: All visual styling and responsive design rules.
* `app.js`: Initializes the application and ties modules together.

## ⚕️ Disclaimer
**For Educational Use Only.** This tool is a reference aid for pathology residents and practitioners. It should not be used as a substitute for professional medical advice or official WHO publications. Always verify diagnoses with primary literature.

---
*Created by Dr. Haitham | Version 1.0*