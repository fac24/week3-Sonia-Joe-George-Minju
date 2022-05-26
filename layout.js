function layout(title, content) {
  return /*html*/ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Hind&display=swap" rel="stylesheet">
  <title>${title}</title>
  <link rel="stylesheet" href="../public/style.css" type="text/css">
</head>
<body>
  <h1>Moo Lah Lah</h1>
  <p>Making Cows Happy since 25/06, 12.25 p.m. </p>
  ${content}
</body>
</html>
  `;
}

module.exports = layout;
