# Corrected SEO + UI Merge

The previous full SEO ZIP did not contain the sector UI/link patch. This corrected package merges both.

Included:
- responsive Sectors dropdown positioning
- clickable Sector Gallery cards
- clickable Sector Moodboard cards
- visible breadcrumbs on sector detail pages
- visible breadcrumbs on main content pages
- BreadcrumbList structured data
- Related Exhibition Sectors opacity fix
- full SEO metadata, image SEO, robots.txt and llms.txt work

## Apply on Windows

Extract this ZIP. Open PowerShell in the extracted folder and run:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\APPLY_CORRECTED_PATCH.ps1
```

Then:

```powershell
cd "C:\Users\grdez\Downloads\Compressed\iraq-home-expo-next-design-progress\iraq-home-expo-next"
npm.cmd run build
git status
```

Before committing, verify:

```powershell
Select-String -LiteralPath ".\src\components\SectorGallery.tsx" -Pattern "href={`/sectors/"
Select-String -LiteralPath ".\src\app\sectors\[slug]\page.tsx" -Pattern "seoBreadcrumbs"
Select-String -LiteralPath ".\src\app\globals.css" -Pattern "IHE SEO UI CORRECTED PATCH"
```
