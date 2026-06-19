# Injects static Open Graph / Twitter meta for WhatsApp and social crawlers.
$SiteUrl = 'https://4dsnexus.co.za'
$OgImage = "$SiteUrl/assets/4ds-og.png"
$Root = Split-Path -Parent $PSScriptRoot

function Get-CanonicalPath([string]$RelativePath) {
  $p = $RelativePath.Replace('\', '/')
  if ($p -eq 'index.html') { return "$SiteUrl/" }
  return "$SiteUrl/$p"
}

function Get-DefaultDescription([string]$Path) {
  if ($Path -match 'areas-served') {
    return '4DS Solutions delivers CRM, websites, and business software across South Africa. Remote delivery nationwide.'
  }
  if ($Path -match 'pricing') {
    return '4DS Nexus plans from R1,299/month. CRM, websites, inventory, POS, and custom software for South African businesses.'
  }
  if ($Path -match 'contact') {
    return 'Book a demo or get website pricing from 4DS Solutions. WhatsApp, email, and video calls across South Africa.'
  }
  if ($Path -match 'services/') {
    return '4DS Nexus business software for South African companies. Book a demo or view pricing.'
  }
  return '4DS Nexus: CRM, business websites, client portals, inventory, POS, and custom software for South African businesses.'
}

Get-ChildItem -Path $Root -Recurse -Filter '*.html' | ForEach-Object {
  $content = [System.IO.File]::ReadAllText($_.FullName)
  if ($content -match 'property="og:image"') { return }

  $rel = $_.FullName.Substring($Root.Length).TrimStart('\')
  $canonical = Get-CanonicalPath $rel

  $title = '4DS Nexus'
  if ($content -match '<title>(.*?)</title>') { $title = $Matches[1] }

  $description = Get-DefaultDescription $rel
  if ($content -match '<meta name="description" content="(.*?)"') { $description = $Matches[1] }

  $seoBlock = @"
  <script>if(location.hostname==='www.4dsnexus.co.za')location.replace('https://4dsnexus.co.za'+location.pathname+location.search+location.hash);</script>
  <link rel="canonical" href="$canonical">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="icon" type="image/png" href="/assets/4ds-icon.png">
  <link rel="apple-touch-icon" href="/assets/4ds-og.png">
  <link rel="manifest" href="/site.webmanifest">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="4DS Nexus">
  <meta property="og:title" content="$title">
  <meta property="og:description" content="$description">
  <meta property="og:url" content="$canonical">
  <meta property="og:image" content="$OgImage">
  <meta property="og:image:alt" content="4DS Nexus logo">
  <meta property="og:locale" content="en_ZA">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="$title">
  <meta name="twitter:description" content="$description">
  <meta name="twitter:image" content="$OgImage">
"@

  if ($content -match '<meta name="description" content=".*?>') {
    $content = $content -replace '<meta name="description" content=".*?">', "`$0`r`n$seoBlock"
  } elseif ($content -match '<meta name="viewport" content=".*?>') {
    $content = $content -replace '<meta name="viewport" content=".*?">', "`$0`r`n$seoBlock"
  } else {
    Write-Warning "Skip $rel"
    return
  }

  [System.IO.File]::WriteAllText($_.FullName, $content)
  Write-Host "SEO meta: $rel"
}
