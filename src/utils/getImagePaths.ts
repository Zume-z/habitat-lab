import fs from 'fs'
import path from 'path'

export async function getImageDirPath(projectId: string) {
  return path.join(process.cwd(), 'public/assets/projects', projectId)
}

export async function getImagePaths(imgDirPath: string) {
  let imageLabels: string[] = []
  try {
    imageLabels = fs.readdirSync(imgDirPath).filter((file) => /\.(jpg|jpeg|png|gif)$/.test(file))
  } catch (err) {
    console.error(err)
  }
  return imageLabels
}
