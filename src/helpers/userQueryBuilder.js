export default function userQueryBuilder(data) {
  const columns = Object.keys(data).join(', ');
  const values = Object.values(data);
  const params = values.map((_v, i) => `$${i + 1}`).join(', ');

  const query = {
    text: `
      INSERT INTO users (${columns})
      VALUES (${params})
    `,
    values,
  };

  return query;
}
