'use server';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function searchOutfitAI(formData: FormData) {
  try {
    const imageFile = formData.get("image") as File;
    if (!imageFile || imageFile.size === 0) return { success: false, error: "No image found." };

    // 1. Upload to Cloudinary to get a public URL for Google Lens
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = `data:${imageFile.type};base64,${buffer.toString('base64')}`;

    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
      folder: "vision_searches",
    });
    
    const imageUrl = uploadResponse.secure_url;

    // 2. Send the URL to SerpApi (Google Lens)
    const serpApiKey = process.env.SERPAPI_KEY;
    const serpApiUrl = `https://serpapi.com/search.json?engine=google_lens&url=${encodeURIComponent(imageUrl)}&api_key=${serpApiKey}`;
    
    const response = await fetch(serpApiUrl);
    const data = await response.json();

    if (!data.visual_matches) {
      return { success: false, error: "No matches found by AI." };
    }

    // 3. Filter the results specifically for Indian platforms
    const matches = data.visual_matches.filter((match: any) => {
      const link = match.link || "";
      return link.includes("myntra.com") || link.includes("amazon.in") || link.includes("flipkart.com");
    });

    // 4. Clean up the data for our frontend
    const cleanResults = matches.slice(0, 10).map((match: any) => {
      let platform = "OTHER";
      let color = "text-gray-500";
      
      if (match.link.includes("myntra.com")) {
        platform = "MYNTRA";
        color = "text-pink-500";
      } else if (match.link.includes("amazon.in")) {
        platform = "AMAZON";
        color = "text-orange-500";
      } else if (match.link.includes("flipkart.com")) {
        platform = "FLIPKART";
        color = "text-blue-500";
      }

      return {
        platform,
        title: match.title,
        price: match.price?.extracted_value ? `₹${match.price.extracted_value}` : 'Check Price',
        link: match.link,
        image: match.thumbnail,
        color
      };
    });

    return { success: true, results: cleanResults };

  } catch (error) {
    console.error("AI Search Error:", error);
    return { success: false, error: "Failed to process image search." };
  }
}