# HTML and CSS Styling Guide

**Objective:**
Create a portfolio page by:

1. Creating the **HTML Structure**
2. Include external assets like **Google Fonts**, and
3. Applying **internal** styls, and
4. Applying **external** styles (best practice).

---

## 1. Creating the HTML Structure

We'll start by establishing the foundational elements of any web page.

### 1.1 The Document Setup

- **`<!DOCTYPE html>`:** Always the first line; it defines the document type.
- **`<html lang="en">`:** The root element, specifies the document is HTML and the language is English.
- **`<head>`:** Contains metadata about the HTML document.
  - **`<meta charset="UTF-8" />`** and **`<meta name="viewport" ... />`**: Essential for character encoding and responsive design.
  - **`<title>`**: Sets the text that appears in the browser tab.

### 1.2 The Document Body (`<body>`)

This is where all the visible content goes. We'll use **semantic HTML tags** to structure the content logically.

- **`<nav>`:** Used for the main navigation links.
- **`<a>`:** Create hyperlinks to different sections of the page using **anchor links** (`href="#section-id"`).
- Using the `id` attribute (e.g., `id="landing"`) makes them targets for the navigation links.
- **`<section>`:** Used to group related content. Each section represents a major part of the page (e.g., `landing`, `about`, `experience`).
- **`<footer>`:** Contains copyright information and often secondary navigation.
- **Content Elements:**:
  - Headers (**`<h1>`**, **`<h2>`**, etc)
  - Paragraphs (**`<p>`**)
  - Lists (**`<ul>`**, **`<li>`**),
  - Links (**`<a>`**) for internal and external navigation, and
  - Images **`<img>`**: Note that the placeholder image is sourced from `https://placehold.co/` and includes the **`alt`** property for accessibility.

---

## 2. Incorporating Google Fonts (External Asset)

We can enhance the page's typography by using custom fonts from **Google Fonts**.

### 2.1 Generating the Link Tag

- Go to **Google Fonts** and select the desired font (e.g., _Lato_ with weights 400, 600, 700).
- Refer to [Google's Documentation](https://developers.google.com/fonts/docs/getting_started), a **`<link>`** tag is placed inside the `<head>` of your HTML document.

### 2.2 Using the href property

- Specify the location of the Google Font by adding the **`href="..."`** property of the `<head>` tag:
  ```html
  <link
    href="[https://fonts.googleapis.com/css2?family=Lato:wght@400;600;700&display=swap]"
    rel="stylesheet"
  />
  ```
- **Effect:** This action makes the _Lato_ font available for use in your CSS styles.

---

## 3. Applying Internal Styles

Before moving to the recommended external CSS, you can apply styles directly in the HTML document to see instant effects.

### 3.1 The `<style>` Tag

- Internal styles are placed within the **`<style>`** tag inside the **`<head>`** section and **after** the Google Fonts link. This method is best for small projects or for quick testing, but is generally discouraged for larger projects because it affects maintenance and scalability (mixes style and structure).

### 3.2 Basic Syntax Example (Example)

While not present in the provided code, this is how you would use it:

```html
<style>
  /* CSS rules go here */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: "Lato", sans-serif; /* Using the imported Google Font */
    line-height: 1.6;
    color: #1a1a1a;
    background-color: #ffffff;
    scroll-behavior: smooth;
  }
</style>
```

---

## 4. Applying External Styles (Best Practice) 🎨

For maintainability and scalability, all main styles should be in a **separate file**, typically named `styles.css`. This is the **most recommended** approach for any real-world project.

### 4.1 Creating the Stylesheet

1.  Create a new folder named `css` in your project's root directory.
2.  Inside the `css` folder, create a new file named **`styles.css`** to house all your CSS rules.

### 4.2 Linking the External File

You must use a `<link>` tag in the `<head>` of your HTML document to connect the stylesheet.

* `rel="stylesheet"` indicates the linked file is a stylesheet.
* `href="css/styles.css"` provides the file path (relative to your HTML file).

**HTML Snippet:**

```html
<link rel="stylesheet" href="css/styles.css">
```

### 4.3 Order of Operations (Importance)

When a browser loads the page, it processes styles in the order they appear:

1. Google Font Link: This makes the custom font (e.g., Lato) available.

2. Internal styles (if present).

3. External styles (applying all the rules from the linked external stylesheet)

Since the external CSS link is placed after the Google Font link, any style rules in styles.css can successfully use the imported font. More importantly, external CSS will generally override internal CSS if selectors have the same specificity, making it the dominant source of styling for your entire website.

---
