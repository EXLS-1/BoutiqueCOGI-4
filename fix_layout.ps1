$path = "c:\boutiquecogi4\app\layout.tsx"
$lines = Get-Content -Path $path
$newBlock = @(
    '          <Suspense fallback={<div className="min-h-screen pt-28">Chargement...</div>}>',
    '            { /* pt-28 correspond à la hauteur de navbar (14) + navbar-secondary (14) */}',
    '            <main className="min-h-screen pt-28">',
    '              {children}',
    '              {/* Chargez vos scripts ici de manière optimisée */}',
    '            </main>',
    '          </Suspense>'
)
for ($i = 52; $i -le 64; $i++) { $lines[$i] = $null }
$lines[52..64] = $newBlock
$lines | Where-Object { $_ -ne $null } | Set-Content -Path $path -Encoding UTF8
Write-Host "Fixed lines 53-65"
