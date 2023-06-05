function postQueryBuilder(values) {
  const numberOfValues = values.length;
  const columns = numberOfValues === 4 ? 'url, description, user_id, created_at' : 'url, user_id, created_at';
  let query = `
    INSERT INTO posts (${columns})
    VALUES
  `;

  for (let i = 1; i <= numberOfValues; i++) {
    if (i === 1) {
      query += '(';
    }
    if (i !== numberOfValues) {
      query += `$${i}, `;
    } else {
      query += `$${i}`;
    }
  }

  query += `)
    RETURNING id;
  `;

  return query;
}

export default postQueryBuilder;
