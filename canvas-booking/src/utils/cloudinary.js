const CLOUD_NAME = 'dg24ipzra';

export function cloudinaryUrl(publicId, width, height, gravity = null) {
  const g = gravity ? `,g_${gravity}` : '';
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_${width},h_${height},c_fill${g},f_auto,q_auto/${publicId}`;
}
