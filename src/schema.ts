export const composeSchemaNullish = (schema: any) => {
  for (let [key] of Object.entries(schema)) {
    schema[key] = schema[key].nullish();
  }
  return schema;
};
