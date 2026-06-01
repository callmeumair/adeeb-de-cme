import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Upload an image to Cloudinary and return the secure URL.
 * Accepts either a base64 data URI string or a File object.
 */
export async function uploadImage(file: File | string): Promise<string> {
  let dataUri: string;

  if (typeof file === 'string') {
    dataUri = file;
  } else {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');
    const mimeType = file.type || 'image/jpeg';
    dataUri = `data:${mimeType};base64,${base64}`;
  }

  const result = await cloudinary.uploader.upload(dataUri, {
    folder: 'adeeb-de-cme/products',
    transformation: [
      { quality: 'auto', fetch_format: 'auto' },
    ],
  });

  return result.secure_url;
}

/**
 * Get an optimized Cloudinary image URL with optional transformations.
 */
export function getOptimizedUrl(
  publicId: string,
  options?: { width?: number; height?: number; crop?: string }
): string {
  const transformations: Record<string, string | number | boolean> = {
    quality: 'auto',
    fetch_format: 'auto',
  };

  if (options?.width) transformations.width = options.width;
  if (options?.height) transformations.height = options.height;
  if (options?.crop) transformations.crop = options.crop;

  return cloudinary.url(publicId, {
    transformation: [transformations],
    secure: true,
  });
}

/**
 * Get a Cloudinary video URL.
 */
export function getVideoUrl(publicId: string): string {
  return cloudinary.url(publicId, {
    resource_type: 'video',
    secure: true,
    transformation: [
      { quality: 'auto', fetch_format: 'auto' },
    ],
  });
}

export default cloudinary;
