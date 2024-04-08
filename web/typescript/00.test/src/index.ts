function delay(ms: number): Promise<void> {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}

async function hello() {
  console.log('Hello');
  await delay(1000);
  console.log('World!');
}

hello();