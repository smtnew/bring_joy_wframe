# Icon Generation Instructions

The website requires various icon sizes for different platforms and devices. You'll need to generate PNG files from the provided `assets/icons/favicon.svg` file.

## Required Icon Sizes

### Favicon Sizes

- `icon-16x16.png` - Standard favicon
- `icon-32x32.png` - High-DPI favicon

### Apple Touch Icons

- `icon-180x180.png` - iPhone/iPad home screen icon

### Android/PWA Icons

- `icon-72x72.png` - Android Chrome
- `icon-96x96.png` - Android Chrome
- `icon-128x128.png` - Android Chrome
- `icon-144x144.png` - Android Chrome
- `icon-152x152.png` - Android Chrome
- `icon-192x192.png` - Android Chrome (main)
- `icon-384x384.png` - Android Chrome
- `icon-512x512.png` - Android Chrome (splash)

### Windows Tiles

- `icon-70x70.png` - Small Windows tile
- `icon-150x150.png` - Medium Windows tile
- `icon-310x310.png` - Large Windows tile
- `icon-310x150.png` - Wide Windows tile

## How to Generate Icons

### Method 1: Using Online Tools

1. Go to [RealFaviconGenerator](https://realfavicongenerator.net/)
2. Upload the `assets/icons/favicon.svg` file
3. Configure settings for each platform
4. Download and extract to `assets/icons/` folder

### Method 2: Using ImageMagick (Command Line)

```bash
# Install ImageMagick first, then run:
magick assets/icons/favicon.svg -resize 16x16 assets/icons/icon-16x16.png
magick assets/icons/favicon.svg -resize 32x32 assets/icons/icon-32x32.png
magick assets/icons/favicon.svg -resize 72x72 assets/icons/icon-72x72.png
magick assets/icons/favicon.svg -resize 96x96 assets/icons/icon-96x96.png
magick assets/icons/favicon.svg -resize 128x128 assets/icons/icon-128x128.png
magick assets/icons/favicon.svg -resize 144x144 assets/icons/icon-144x144.png
magick assets/icons/favicon.svg -resize 152x152 assets/icons/icon-152x152.png
magick assets/icons/favicon.svg -resize 180x180 assets/icons/icon-180x180.png
magick assets/icons/favicon.svg -resize 192x192 assets/icons/icon-192x192.png
magick assets/icons/favicon.svg -resize 384x384 assets/icons/icon-384x384.png
magick assets/icons/favicon.svg -resize 512x512 assets/icons/icon-512x512.png
magick assets/icons/favicon.svg -resize 70x70 assets/icons/icon-70x70.png
magick assets/icons/favicon.svg -resize 150x150 assets/icons/icon-150x150.png
magick assets/icons/favicon.svg -resize 310x310 assets/icons/icon-310x310.png
magick assets/icons/favicon.svg -resize 310x150 assets/icons/icon-310x150.png
```

### Method 3: Using GIMP/Photoshop

1. Open `assets/icons/favicon.svg` in your image editor
2. Export/Save As PNG for each required size
3. Make sure to maintain aspect ratio and quality

## Social Media Image

The `assets/og-image.svg` should also be converted to PNG format:

```bash
magick assets/og-image.svg -resize 1200x630 assets/og-image.png
```

Then update the meta tags in HTML files to use `.png` instead of `.svg` if needed for better social media compatibility.

## Notes

- All icons should maintain the gift box design with the red and gold color scheme
- Ensure icons look good at small sizes (16x16, 32x32)
- Test the favicon in different browsers
- The SVG favicon will work in modern browsers, but PNG fallbacks are recommended for older browsers
