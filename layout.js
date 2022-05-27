function layout(title, content) {
  return /*html*/ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <link rel="stylesheet" href="styles.css" type="text/css">
  <script defer src='script.js'></script>
  </head>
<body>
  ${content}
</body>
</html>
  `;
}

module.exports = layout;
