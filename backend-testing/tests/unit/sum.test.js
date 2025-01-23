// Contoh fungsi sederhana
const sum = (a, b) => a + b;
test('Menambahkan 1 + 2 untuk mendapatkan 3', () => {
expect(sum(1, 2)).toBe(3);
});