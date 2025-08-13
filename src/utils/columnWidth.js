/**
 * Utility untuk mengatur style lebar kolom pada komponen react-admin.
 * @param {number} minWidth - Lebar minimum kolom (px).
 * @param {number} maxWidth - Lebar maksimum kolom (px).
 * @returns {object} - Object style yang bisa dipakai di prop sx/style.
 */
export const columnWidth = (minWidth = 150, maxWidth = 300) => ({
    minWidth,
    maxWidth,
    display: "block",
    whiteSpace: "normal",
});
