const fs = require('fs');
const filePath = require('path').join(__dirname, '..', 'assets', 'js', 'pages', 'markdown.js');
const content = `export default class MarkdownPage {
  constructor() {
    this.handleInput = this.handleInput.bind(this);
  }

  init() {
    this.input = document.getElementById('markdown-input');
    this.preview = document.getElementById('markdown-preview');
    if (this.input) {
      this.input.addEventListener('input', this.handleInput);
      this.handleInput();
    }
  }

  handleInput() {
    if (!this.preview || !this.input) return;
    const text = this.input.value || '';
    const html = text
      .replace(/^###\\s*(.*$)/gim, '<h3>$1</h3>')
      .replace(/^##\\s*(.*$)/gim, '<h2>$1</h2>')
      .replace(/^#\\s*(.*$)/gim, '<h1>$1</h1>')
      .replace(/\\*\\*(.*?)\\*\\*/gim, '<strong>$1</strong>')
      .replace(/\\*(.*?)\\*/gim, '<em>$1</em>')
      .replace(/\\[(.*?)\\]\\((.*?)\\)/gim, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/\\n\\n/g, '<p></p>')
      .replace(/\\n/g, '<br />');
    this.preview.innerHTML = html;
  }

  destroy() {
    if (this.input) {
      this.input.removeEventListener('input', this.handleInput);
    }
  }
}
`;
fs.writeFileSync(filePath, content, 'utf8');
console.log('markdown.js fixed');
