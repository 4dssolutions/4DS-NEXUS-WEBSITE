# Fix mojibake and strip duplicate arrows from link text (arrows via CSS .card-link::after).
$Root = Split-Path -Parent $PSScriptRoot
$Utf8 = New-Object System.Text.UTF8Encoding $false

$replacements = @(
  @(' â†’', ''),
  @('â†’', ''),
  @(' →', ''),
  @('â†”', '&harr;'),
  @('â€"', '–'),
  @('â€"', '—'),
  @('â€"', '—'),
  @('Ã ', 'à'),
  @('Â·', '·'),
  @('Ã©', 'é')
)

Get-ChildItem -Path $Root -Recurse -Include *.html,*.js | Where-Object {
  $_.FullName -notmatch '\\node_modules\\' -and $_.FullName -notmatch '\\scripts\\'
} | ForEach-Object {
  $c = [System.IO.File]::ReadAllText($_.FullName)
  $orig = $c
  foreach ($pair in $replacements) {
    $c = $c.Replace($pair[0], $pair[1])
  }
  if ($c -ne $orig) {
    [System.IO.File]::WriteAllText($_.FullName, $c, $Utf8)
    Write-Host "Fixed: $($_.Name)"
  }
}
