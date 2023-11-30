let timer: NodeJS.Timeout;
let debounceText: string;

export const debounceFunk = (search: string) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    debounceText = search;
  }, 500);
  return debounceText;
};

// export default debounce;
