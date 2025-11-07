/**
 * Normalizes a Cloudinary file URL for CV (PDF/raw files).
 * - Switches to /raw/upload/ if mime_type indicates PDF/raw.
 * - Cleans public_id to remove duplicate extension.
 * - Ensures proper URL structure: https://res.cloudinary.com/{cloud_name}/raw/upload/v{version}/{folder}/{public_id}.{ext}
 *
 * @param cv - The CV file object from API response.
 * @returns The normalized URL as string.
 * @throws Error if required fields are missing.
 */
export function normalizeCvUrl(cv: {
    url?: string;
    public_id: string;
    mime_type: string;
    file_name?: string;
    resource_type?: string;
    folder?: string;
}): string {
    if (!cv.public_id) {
        throw new Error("public_id is required for normalization");
    }

    // Detect if it's a raw file (PDF)
    const isRawFile = cv.mime_type.startsWith("application/") || cv.mime_type.includes("pdf");
    const resourceType = isRawFile ? "raw" : cv.resource_type || "image";

    // Browser-compatible extension extraction (no Node 'path' module)
    const getExtension = (fileStr: string): string => {
        const lastDotIndex = fileStr.lastIndexOf(".");
        return lastDotIndex > 0 ? fileStr.substring(lastDotIndex) : ".pdf"; // Default to .pdf for CV
    };
    const extension = getExtension(cv.file_name || cv.public_id);

    // Extract components from public_id (e.g., "uploads/uploads/1762307515_Workday_Report_2025-10 (2).pdf")
    const publicIdParts = cv.public_id.split("/");
    const folder = cv.folder || publicIdParts.slice(0, -1).join("/"); // Use provided folder or from public_id
    const basePublicId = publicIdParts[publicIdParts.length - 1]; // Last part

    // Clean basePublicId: Remove extension if present to avoid duplicate
    const cleanBase = basePublicId.replace(/\.[^/.]+$/, ""); // Remove last .ext
    const versionMatch = basePublicId.match(/v(\d+)/); // Extract version if embedded (e.g., v1762307515)
    const version = versionMatch ? versionMatch[1] : ""; // Fallback to empty if not found

    // Build normalized public_id without duplicate ext
    const normalizedPublicId = folder ? `${folder}/${cleanBase}` : cleanBase;

    // Construct URL
    const cloudNameMatch = cv.url?.match(/res\.cloudinary\.com\/([^\/]+)/); // Extract cloud_name from existing url if available
    const cloudName = cloudNameMatch ? cloudNameMatch[1] : "dbuulcdnd"; // Default from example

    const normalizedUrl = `https://res.cloudinary.com/${cloudName}/${resourceType}/upload/${version ? `v${version}` : ""}/${normalizedPublicId}${extension}`;

    return normalizedUrl;
}
