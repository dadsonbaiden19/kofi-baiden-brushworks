import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(rootDir, "data", "works.json");
const publicDir = path.join(rootDir, "public");

const errors = [];
const warnings = [];
const validAvailability = new Set(["Available", "Sold"]);
const validFormats = new Set(["Landscape", "Portrait", "Square"]);

function addError(message) {
  errors.push(`Error: ${message}`);
}

function addWarning(message) {
  warnings.push(`Warning: ${message}`);
}

function publicPathExists(imagePath) {
  if (typeof imagePath !== "string" || !imagePath.startsWith("/")) {
    return false;
  }

  return existsSync(path.join(publicDir, imagePath.slice(1)));
}

let works;

try {
  works = JSON.parse(readFileSync(dataPath, "utf8"));
} catch (error) {
  addError(`Could not read data/works.json. ${error.message}`);
}

if (!Array.isArray(works)) {
  addError("data/works.json must be an array of artwork records.");
} else {
  const slugs = new Set();

  works.forEach((work, index) => {
    const label = `Record ${index + 1}`;

    if (!work || typeof work !== "object") {
      addError(`${label} must be an object.`);
      return;
    }

    if (!work.slug || typeof work.slug !== "string") {
      addError(`${label} needs a slug.`);
    } else if (slugs.has(work.slug)) {
      addError(`${label} has duplicate slug "${work.slug}".`);
    } else {
      slugs.add(work.slug);
    }

    if (!work.title || typeof work.title !== "string") {
      addError(`${label} (${work.slug ?? "no slug"}) needs a title.`);
    } else if (/^\d+$/.test(work.title.trim())) {
      addWarning(`${label} (${work.slug}) still has a number as its title.`);
    }

    if (!validAvailability.has(work.availability)) {
      addError(`${label} (${work.slug ?? "no slug"}) availability must be "Available" or "Sold".`);
    }

    if (work.format && !validFormats.has(work.format)) {
      addError(`${label} (${work.slug ?? "no slug"}) format must be "Portrait", "Landscape", or "Square".`);
    }

    if (!Array.isArray(work.images) || work.images.length === 0) {
      addError(`${label} (${work.slug ?? "no slug"}) needs at least one image.`);
    } else {
      if (work.images.length > 2) {
        addWarning(`${label} (${work.slug}) has more than 2 images. The website will only use the first 2.`);
      }

      work.images.forEach((imagePath, imageIndex) => {
        if (typeof imagePath !== "string" || !imagePath.startsWith("/")) {
          addError(`${label} (${work.slug}) image ${imageIndex + 1} must start with "/".`);
          return;
        }

        if (!publicPathExists(imagePath)) {
          addError(`${label} (${work.slug}) image file does not exist: ${imagePath}`);
        }
      });
    }

    if (work.availability === "Available") {
      if (!work.priceGhs || typeof work.priceGhs !== "number") {
        addWarning(`${label} (${work.slug}) is available but has no GHS price.`);
      }

      if (!work.dimensions) {
        addWarning(`${label} (${work.slug}) is available but has no dimensions.`);
      }

      if (!work.year) {
        addWarning(`${label} (${work.slug}) is available but has no year.`);
      }
    }
  });
}

for (const warning of warnings) {
  console.warn(warning);
}

for (const error of errors) {
  console.error(error);
}

if (errors.length > 0) {
  process.exit(1);
}

console.log(`Artwork content check passed with ${warnings.length} warning(s).`);
