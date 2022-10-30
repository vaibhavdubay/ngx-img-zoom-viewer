# NGX IMG Zoom Viewer ![Project License Badge](https://img.shields.io/badge/license-GNU-brightgreen)

## Description

This project lets the user see a zoomed preview of a portion of an image (as we can see the zoomed image preview in the product detail pages of Amazon and Flipkart websites)

## Table of Contents

- [Installation](#installation)
- [Use](#use)
- [License](#license)
- [Questions](#questions)

---

## Installation

---
## Step 1 : -
  To add ngx-img-zoom-viewer open a terminal in your root directory and run the following command
<pre>
  npm i ngx-img-zoom-viewer
</pre>
this will add the depandancy in your package.json file,

## Step 2 : -
 
 Add NGXimgZoomViewer in your app.module.ts file
<pre>
  import { NGXimgZoomViewer } from 'ngx-img-zoom-viewer'

  @NgModule ({
    ...,
    imports: [
      ...,
      NGXimgZoomViewer
    ],
    ...
  })
  ...
</pre>

---

## Use

---

Now we are Free to use NGXimgZoomViewer
we can start using it by just adding 
</br>
## In template
<pre>
  &lt;ngx-img-zoom-viewer [src]=&quot;url&quot; &gt; &lt;/ngx-img-zoom-viewer&gt;
</pre>

## In class
<pre>
  url = "https://images.unsplash.com/photo-1665513284188-661b9cb5c993?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80"
</pre>
---
## License

---

[GNU](https://github.com/vaibhavdubay/ngx-img-zoom-viewer/blob/main/LICENSE)

---
## Questions

---

If you have any questions about the project you can reach out to me via email or GitHub with the information below.

> Email: sirvaibhavdubay@gmail.com

> GitHub : [vaibhavdubay](https://github.com/vaibhavdubay)
