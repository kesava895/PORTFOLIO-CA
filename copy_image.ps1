$source = "C:\Users\HP\.gemini\antigravity\brain\5507db77-de3b-45be-a76e-3d6dac711ce0\cricket_predictor_png_1774185651491.png"
$dest = "c:\Users\HP\Downloads\Kesav portfolio\cricket_predictor.png"
if (Test-Path $source) {
    [IO.File]::Copy($source, $dest, $true)
    Write-Output "Copied successfully"
} else {
    Write-Output "Source not found"
}
