export async function loadImage(name, setState) {
    return await import(`../uploads/posts/thumb_${name}`)
        .then(image => image.default);
}