import fs from 'fs/promises'
import path from 'path'

export async function deleteImage(imagePath: string): Promise<void> {
  try {
    const fullPath = path.join(process.cwd(), 'public', imagePath)
    await fs.unlink(fullPath)
    console.log(`Deleted image: ${imagePath}`)
  } catch (error) {
    console.error(`Error deleting image ${imagePath}:`, error)
    // Don't throw error - we want to continue with post deletion even if image deletion fails
  }
}
