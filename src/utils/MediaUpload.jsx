import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_KEY;

// Initialize Supabase client
export const supabase = createClient(url, key);

/**
 * Uploads a file to Supabase Storage and returns the public URL.
 * @param {File} file - The file to upload.
 * @returns {Promise<string>} - The public URL of the uploaded file.
 */
export default async function MediaUpload(file) {
    if (!file) {
        throw new Error("No file selected");
    }

    try {
        const timeStamp = new Date().getTime();
        const fileExtension = file.name.split('.').pop();
        const randomString = Math.random().toString(36).substring(7);
        const fileName = `${timeStamp}-${randomString}.${fileExtension}`;

        // Upload the file to the 'productsimg' bucket
        const { data, error } = await supabase.storage
            .from('productsimg')
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            console.error("Supabase upload error:", error.message || error);
            throw error;
        }

        // Get the public URL for the uploaded file
        const { data: { publicUrl } } = supabase.storage
            .from('productsimg')
            .getPublicUrl(fileName);

        return publicUrl;
    } catch (error) {
        console.error("Error in MediaUpload:", error);
        throw new Error(`Failed to upload image: ${error.message || error}`);
    }
}