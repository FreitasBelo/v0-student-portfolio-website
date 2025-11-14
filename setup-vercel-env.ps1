# Setup Vercel Environment Variables
Write-Host "Adding environment variables to Vercel..." -ForegroundColor Green

# DATABASE_URL
$dbUrl = "postgresql://neondb_owner:npg_SLC3YBr5XIeG@ep-steep-recipe-a71pet2z-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require"
Write-Host "`nAdding DATABASE_URL to production..."
$dbUrl | vercel env add DATABASE_URL production

Write-Host "`nAdding DATABASE_URL to preview..."
$dbUrl | vercel env add DATABASE_URL preview

Write-Host "`nAdding DATABASE_URL to development..."
$dbUrl | vercel env add DATABASE_URL development

# NEXTAUTH_URL
$authUrl = "https://v0-student-portfolio-website.vercel.app"
Write-Host "`nAdding NEXTAUTH_URL to production..."
$authUrl | vercel env add NEXTAUTH_URL production

Write-Host "`nAdding NEXTAUTH_URL to preview..."
$authUrl | vercel env add NEXTAUTH_URL preview

# NEXTAUTH_SECRET
$authSecret = "D7HcZGd5aMXFSG0RUW4B3g7mXgMvOFgpcHx4EQHtpIM="
Write-Host "`nAdding NEXTAUTH_SECRET to production..."
$authSecret | vercel env add NEXTAUTH_SECRET production

Write-Host "`nAdding NEXTAUTH_SECRET to preview..."
$authSecret | vercel env add NEXTAUTH_SECRET preview

Write-Host "`nAdding NEXTAUTH_SECRET to development..."
$authSecret | vercel env add NEXTAUTH_SECRET development

Write-Host "`n✅ All environment variables added successfully!" -ForegroundColor Green
Write-Host "`nNow run: vercel --prod" -ForegroundColor Yellow
