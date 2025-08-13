// Limit kata
export const limitWords = (text, limit = 5) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > limit
        ? words.slice(0, limit).join(" ") + "..."
        : text;
};

// Limit huruf
export const limitChars = (text, limit = 20) => {
    if (!text) return "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
};
