// Debounce function with TypeScript
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  timeout = 500
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout | undefined;
  return (...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

// Debounce leading function with TypeScript
export function debounceLeading(timeout = 2000): () => Promise<boolean> {
  let timer: NodeJS.Timeout | undefined;
  return function (): Promise<boolean> {
    return new Promise((resolve) => {
      if (!timer) {
        resolve(true);
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = undefined;
      }, timeout);
    });
  };
}
