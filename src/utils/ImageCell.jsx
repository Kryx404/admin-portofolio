import React from "react";

/**
 * Komponen utilitas untuk menampilkan gambar pada cell tabel react-admin.
 * @param {object} props
 * @param {string} props.src - URL gambar
 * @param {string} [props.alt] - Alt text gambar
 * @param {number} [props.width] - Lebar gambar (default 80)
 * @param {number} [props.height] - Tinggi gambar (default 80)
 * @returns {JSX.Element|null}
 */
const ImageCell = ({ src, alt = "Image", width = 80, height = 80 }) => {
    if (!src) return null;
    return (
        <img
            src={src}
            alt={alt}
            style={{
                width,
                height,
                objectFit: "contain",
                display: "block",
                margin: "0 auto",
            }}
        />
    );
};

export default ImageCell;