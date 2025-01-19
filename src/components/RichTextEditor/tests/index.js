let mockContent = '';

/** @type {string[]} */
const mockArr = [];

for (let i = 0; i < 1010; i++) {
  mockArr.push(`<p>Item ${i}.</p>`);
}

mockContent = mockArr.join('');

export { mockContent };
