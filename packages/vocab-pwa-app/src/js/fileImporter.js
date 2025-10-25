class FileImporter {
  constructor() {
    this.supportedFormats = ['.txt', '.csv'];
  }

  async parseFile(file) {
    const text = await this.readFileAsText(file);
    const extension = file.name.split('.').pop().toLowerCase();

    if (extension === 'csv') {
      return this.parseCSV(text);
    } else if (extension === 'txt') {
      return this.parseTXT(text);
    } else {
      throw new Error(`Unsupported file format: ${extension}`);
    }
  }

  readFileAsText(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  }

  parseCSV(text) {
    const lines = text.split('\n').filter((line) => line.trim());
    const words = [];
    const errors = [];

    lines.forEach((line, index) => {
      const parts = this.parseCSVLine(line);

      if (parts.length >= 2) {
        words.push({
          english: parts[0].trim(),
          chinese: parts[1].trim(),
          audioUrl: parts[2] ? parts[2].trim() : null,
        });
      } else {
        errors.push({
          line: index + 1,
          content: line,
          error: 'Invalid format: need at least English and Chinese',
        });
      }
    });

    return { words, errors };
  }

  parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }

    result.push(current);
    return result;
  }

  parseTXT(text) {
    const lines = text.split('\n').filter((line) => line.trim());
    const words = [];
    const errors = [];

    const separators = ['\t', '|', ',', ' - '];

    lines.forEach((line, index) => {
      let parsed = false;

      for (const separator of separators) {
        if (line.includes(separator)) {
          const parts = line.split(separator).map((p) => p.trim());

          if (parts.length >= 2) {
            words.push({
              english: parts[0],
              chinese: parts[1],
              audioUrl: parts[2] || null,
            });
            parsed = true;
            break;
          }
        }
      }

      if (!parsed && line.trim()) {
        errors.push({
          line: index + 1,
          content: line,
          error: 'Could not detect separator (tried: tab, |, comma, " - ")',
        });
      }
    });

    return { words, errors };
  }

  async parseFiles(files) {
    const allWords = [];
    const allErrors = [];

    for (const file of files) {
      try {
        const { words, errors } = await this.parseFile(file);
        allWords.push(...words);
        allErrors.push(...errors.map((e) => ({ ...e, file: file.name })));
      } catch (error) {
        allErrors.push({
          file: file.name,
          error: error.message,
        });
      }
    }

    return {
      words: this.removeDuplicates(allWords),
      errors: allErrors,
    };
  }

  removeDuplicates(words) {
    const seen = new Set();
    return words.filter((word) => {
      const key = `${word.english.toLowerCase()}:${word.chinese}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  validateWords(words) {
    return words.filter((word) => {
      return (
        word.english &&
        word.english.trim().length > 0 &&
        word.chinese &&
        word.chinese.trim().length > 0
      );
    });
  }

  exportToCSV(words) {
    const lines = words.map((word) => {
      const english = this.escapeCSV(word.english);
      const chinese = this.escapeCSV(word.chinese);
      const audio = word.audioUrl ? this.escapeCSV(word.audioUrl) : '';
      return `${english},${chinese},${audio}`;
    });

    return lines.join('\n');
  }

  escapeCSV(value) {
    if (!value) return '';
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }

  exportToJSON(data) {
    return JSON.stringify(data, null, 2);
  }

  downloadFile(content, filename, mimeType = 'text/plain') {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

const fileImporter = new FileImporter();

export default fileImporter;
