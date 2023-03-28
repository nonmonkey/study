function getCnames<T extends { name: string }>(entities: T[]):string[] {
  return entities.map(entity => entity.name)
}
