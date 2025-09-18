const fs = require('fs');
const path = require('path');

// Function to generate a timestamped folder name
export function getReportFolder(baseDir, maxReports = 10) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const folder = path.join(baseDir, `report-${timestamp}`);
  cleanupOldReports(baseDir, maxReports); // Keep only the specified number of reports
  return folder;
}


// Function to clean up old reports
function cleanupOldReports(baseDir, maxReports) {
  try {
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true });
    }
    const folders = fs
      .readdirSync(baseDir)
      .map((name) => ({
        name,
        time: fs.statSync(path.join(baseDir, name)).mtime.getTime(),
      }))
      .sort((a, b) => b.time - a.time) // Sort by modification time (newest first)
      .map((folder) => folder.name);

    if (folders.length > maxReports) {
      const oldFolders = folders.slice(maxReports);
      oldFolders.forEach((folder) => {
        fs.rmSync(path.join(baseDir, folder), { recursive: true, force: true });
      });
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error('Error cleaning up old reports:', error);
    }
  }
}
