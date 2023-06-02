function tagQueryBuilder(values, id) {
  const numberOfValues = values.length;
  let query = `
    INSERT INTO tags (tag, post_id)
    VALUES
  `;

  for (let i = 1; i <= numberOfValues; i++) {
    if (i !== numberOfValues) {
      query += `($${i}, ${id}), `;
    } else {
      query += `($${i}, ${id})`;
    }
  }

  query += ';';
  return query;
}

export default tagQueryBuilder;
