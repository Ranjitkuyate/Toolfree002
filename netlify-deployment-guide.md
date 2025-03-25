# Netlify Deployment Guide for ToolsFree Online

This guide provides step-by-step instructions for deploying the enhanced ToolsFree Online website to Netlify using GitHub integration.

## Prerequisites

Before you begin, make sure you have:
- A GitHub account
- A Netlify account
- Your domain name (if you plan to use a custom domain)

## Step 1: Push the Repository to GitHub

1. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Name your repository (e.g., `toolsfree-online`)
   - Set it to Public or Private based on your preference
   - Click "Create repository"

2. Push your local repository to GitHub:
   ```bash
   git remote add origin https://github.com/yourusername/toolsfree-online.git
   git push -u origin main
   ```

## Step 2: Connect to Netlify

1. Log in to your Netlify account at https://app.netlify.com/

2. Click "New site from Git" button

3. Select GitHub as your Git provider

4. Authorize Netlify to access your GitHub repositories if prompted

5. Select your `toolsfree-online` repository

6. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Click "Show advanced" and add the following environment variables:
     - `NEXT_PUBLIC_PROPELLER_ADS_ID`: Your Propeller Ads ID

7. Click "Deploy site"

## Step 3: Configure Custom Domain

1. In the Netlify dashboard, go to your newly deployed site

2. Click "Domain settings" or "Set up a custom domain"

3. Enter your domain name (e.g., `toolsfree.online`)

4. Follow Netlify's instructions to configure your DNS settings:
   - Option 1: Use Netlify DNS (recommended)
   - Option 2: Configure your existing DNS provider with CNAME records

5. Wait for DNS propagation (can take up to 24-48 hours)

6. Enable HTTPS:
   - Netlify provides free SSL certificates through Let's Encrypt
   - In your site's domain settings, click "HTTPS" and then "Verify DNS configuration"
   - Once verified, click "Provision certificate"

## Step 4: Verify Propeller Ads Integration

1. After deployment, visit your site and check browser console for any errors

2. Verify that the service worker (sw.js) is properly loaded:
   - Open browser developer tools
   - Go to Application > Service Workers
   - Confirm that sw.js is registered and active

3. Test ad placements on various pages to ensure they're displaying correctly

4. Check Propeller Ads dashboard to confirm impressions are being recorded

## Step 5: Set Up Continuous Deployment

Netlify automatically sets up continuous deployment from your GitHub repository. This means:

1. Any changes pushed to your main branch will trigger a new deployment

2. You can create preview deployments by:
   - Creating a pull request in GitHub
   - Netlify will automatically create a preview deployment for that PR

3. Configure deploy contexts in netlify.toml if needed:
   ```toml
   [context.production]
     # Production-specific settings
   
   [context.deploy-preview]
     # Settings for preview deployments
   ```

## Troubleshooting

### Common Issues:

1. **Build Failures**
   - Check build logs in Netlify dashboard
   - Ensure all dependencies are properly installed
   - Verify that build commands are correct

2. **Service Worker Issues**
   - Confirm sw.js is in the public directory
   - Check netlify.toml headers configuration
   - Clear browser cache and reload

3. **Ad Display Problems**
   - Verify Propeller Ads ID is correctly set
   - Check for ad blockers in your testing environment
   - Inspect network requests for any blocked resources

### Getting Help:

- Netlify Support: https://www.netlify.com/support/
- Propeller Ads Support: https://propellerads.com/contact-us/
- GitHub Repository Issues: Create an issue in your GitHub repository

## Monitoring and Analytics

1. Set up Netlify Analytics to track site performance and traffic

2. Connect Google Analytics for more detailed visitor insights

3. Use Propeller Ads dashboard to monitor ad performance and revenue

## Next Steps

After successful deployment:

1. Implement SEO optimizations to drive more traffic
2. Regularly update content to keep the site fresh
3. Monitor ad performance and adjust placements for optimal revenue
4. Consider A/B testing different ad configurations to maximize earnings
