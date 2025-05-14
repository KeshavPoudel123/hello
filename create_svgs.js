const fs = require('fs');
const path = require('path');

// Create the tool-icons directory if it doesn't exist
const iconDir = path.join('assets', 'images', 'tool-icons');
if (!fs.existsSync(iconDir)) {
  fs.mkdirSync(iconDir, { recursive: true });
}

// List of Material Design icons to create
const icons = [
  "account_balance",
  "auto_fix_high",
  "build",
  "calculate",
  "calendar_today",
  "check_circle",
  "checklist",
  "code",
  "compress",
  "crop",
  "data_object",
  "date_range",
  "edit_note",
  "favorite",
  "find_replace",
  "folder",
  "format_align_left",
  "format_list_numbered",
  "grade",
  "grid_view",
  "home",
  "image",
  "monitor_weight",
  "password",
  "photo_filter",
  "picture_as_pdf",
  "qr_code",
  "schedule",
  "school",
  "security",
  "sentiment_very_satisfied",
  "storage",
  "swap_horiz",
  "swap_vert",
  "table_chart",
  "text_fields",
  "text_format",
  "timer",
  "trending_up",
  "wallpaper",
  "compare_arrows",
  "notepad"
];

// SVG template
const svgTemplate = (iconName) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#000000">
  <title>${iconName}</title>
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
</svg>`;

// Create each SVG file
icons.forEach(iconName => {
  const filePath = path.join(iconDir, `${iconName}.svg`);
  fs.writeFileSync(filePath, svgTemplate(iconName));
  console.log(`Created ${filePath}`);
});

console.log('All SVG files created successfully!');
