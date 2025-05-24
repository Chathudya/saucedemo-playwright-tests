const fs = require('fs');
const parse = require('csv-parse/sync');

function readCheckoutData(filePath) {
  const file = fs.readFileSync(filePath, 'utf8');
  return parse.parse(file, {
    columns: true,
    skip_empty_lines: true
  });
}

module.exports = { readCheckoutData };
