import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

function buildPhotoItems(files, category, folder) {
  return files.map((file, index) => ({
    src: `/images/gallery/${folder}/${file}`,
    label: `${category} ${String(index + 1).padStart(2, '0')}`,
    cat: category,
  }));
}

async function listImages(folderPath) {
  const files = await readdir(folderPath);
  return files
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b));
}

export async function GET() {
  try {
    const classroomDir = path.join(process.cwd(), 'public/images/gallery/classroom');
    const sportsDir = path.join(process.cwd(), 'public/images/gallery/sports');

    const [classroomFiles, sportsFiles] = await Promise.all([
      listImages(classroomDir),
      listImages(sportsDir),
    ]);

    const photos = [
      ...buildPhotoItems(classroomFiles, 'Classrooms', 'classroom'),
      ...buildPhotoItems(sportsFiles, 'Sports', 'sports'),
    ];

    return NextResponse.json({ photos });
  } catch (error) {
    return NextResponse.json({ photos: [], error: 'Failed to load gallery images.' }, { status: 500 });
  }
}
