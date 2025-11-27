# HR Application - Quick Postman Setup

Write-Host "🚀 HR Application - Postman Setup" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Check if Postman is installed
$postmanPath = Get-Command postman -ErrorAction SilentlyContinue
if (-not $postmanPath) {
    Write-Host "⚠️  Postman not found in PATH" -ForegroundColor Yellow
    Write-Host "   Please install Postman from: https://www.postman.com/downloads/" -ForegroundColor Yellow
    Write-Host ""
}

# Check if server is running
Write-Host "📡 Checking if dev server is running..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -Method GET -TimeoutSec 2 -ErrorAction Stop
    Write-Host "✅ Dev server is running on http://localhost:3000" -ForegroundColor Green
} catch {
    Write-Host "❌ Dev server is not running" -ForegroundColor Red
    Write-Host ""
    Write-Host "Starting dev server..." -ForegroundColor Yellow
    Write-Host "Run this command in a separate terminal:" -ForegroundColor Yellow
    Write-Host "   npm run dev" -ForegroundColor White
    Write-Host ""
}

Write-Host ""
Write-Host "📦 Postman Files Ready:" -ForegroundColor Cyan
Write-Host "   ✅ Collection: postman\HR-App-Collection.postman_collection.json" -ForegroundColor Green
Write-Host "   ✅ Environment: postman\HR-Local-Dev.postman_environment.json" -ForegroundColor Green
Write-Host "   ✅ Documentation: postman\README.md" -ForegroundColor Green
Write-Host ""

Write-Host "🎯 Next Steps:" -ForegroundColor Cyan
Write-Host "   1. Open Postman" -ForegroundColor White
Write-Host "   2. Click 'Import' button" -ForegroundColor White
Write-Host "   3. Import both JSON files from the 'postman' folder" -ForegroundColor White
Write-Host "   4. Select 'HR Local Dev' environment (top-right)" -ForegroundColor White
Write-Host "   5. Run the collection!" -ForegroundColor White
Write-Host ""

Write-Host "📚 Read full guide: postman\README.md" -ForegroundColor Cyan
Write-Host ""

Write-Host "🔐 Test Credentials:" -ForegroundColor Cyan
Write-Host "   Admin:    admin@example.com / password123" -ForegroundColor White
Write-Host "   Employee: employee@example.com / password123" -ForegroundColor White
Write-Host ""

# Ask if user wants to open the folder
$openFolder = Read-Host "Open postman folder? (y/n)"
if ($openFolder -eq 'y' -or $openFolder -eq 'Y') {
    Invoke-Item ".\postman"
}

Write-Host ""
Write-Host "✨ Setup complete! Happy testing! 🚀" -ForegroundColor Green
