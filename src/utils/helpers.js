export const getImageUrl = (imageName) => {
    return `${import.meta.env.VITE_IMAGES_PATH}/${imageName}`;
};