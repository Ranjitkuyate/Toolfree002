# Custom Domain Configuration Guide for ToolsFree Online

This guide provides step-by-step instructions for connecting your custom domain to your Netlify-deployed ToolsFree Online website.

## Prerequisites

Before you begin, make sure you have:
- A registered domain name
- Access to your domain's DNS settings
- Your site already deployed on Netlify

## Step 1: Add Your Custom Domain in Netlify

1. Log in to your Netlify account at https://app.netlify.com/

2. Select your ToolsFree Online site

3. Go to "Site settings" → "Domain management" → "Domains"

4. Click "Add custom domain"

5. Enter your domain name (e.g., `toolsfree.online`)

6. Click "Verify" and then "Add domain"

## Step 2: Configure DNS Settings

### Option 1: Using Netlify DNS (Recommended)

1. In your site's domain settings, click "Set up Netlify DNS" next to your custom domain

2. Follow the instructions to add the provided nameservers to your domain registrar:
   - Log in to your domain registrar (e.g., GoDaddy, Namecheap, Google Domains)
   - Find the nameserver settings for your domain
   - Replace the current nameservers with Netlify's nameservers
   - Save changes

3. Wait for DNS propagation (can take up to 24-48 hours)

### Option 2: Using Your Existing DNS Provider

1. Log in to your DNS provider's control panel

2. Add a CNAME record:
   - Type: CNAME
   - Host/Name: www (or subdomain of your choice)
   - Value/Target: Your Netlify site's default domain (e.g., `your-site-name.netlify.app`)
   - TTL: 3600 (or as recommended by your provider)

3. For the apex domain (e.g., `toolsfree.online` without www), add either:
   - ALIAS/ANAME record pointing to your Netlify site's default domain
   - A records pointing to Netlify's load balancer IP addresses:
     ```
     104.198.14.52
     75.2.60.5
     ```

4. Wait for DNS propagation (can take up to 24-48 hours)

## Step 3: Set Up HTTPS

1. After DNS propagation, Netlify will automatically provision a Let's Encrypt SSL certificate

2. In your site's domain settings, go to "HTTPS"

3. Click "Verify DNS configuration"

4. Once verified, click "Provision certificate"

5. Wait for the certificate to be issued and installed (usually within minutes)

## Step 4: Configure Domain Redirects

### Redirect www to Non-www (or Vice Versa)

1. In your site's domain settings, go to "Domain management" → "Domains"

2. Click "Set up redirect" next to the domain you want to redirect from

3. Choose the primary domain you want to redirect to

4. Select "301 (Permanent)" redirect type

5. Click "Save"

### Additional Redirects

For more complex redirects, add them to your `netlify.toml` file:

```toml
[[redirects]]
  from = "/old-page"
  to = "/new-page"
  status = 301
  force = true

[[redirects]]
  from = "/blog/*"
  to = "/articles/:splat"
  status = 301
  force = true
```

## Step 5: Verify Propeller Ads with Custom Domain

1. After your custom domain is set up, verify that the Propeller Ads service worker is functioning correctly:
   - Visit your site using your custom domain
   - Open browser developer tools
   - Go to Application → Service Workers
   - Confirm that sw.js is registered and active

2. Check your Propeller Ads dashboard to ensure impressions are being recorded from your custom domain

3. If necessary, update your Propeller Ads settings to include your custom domain

## Step 6: Update SEO Settings for Custom Domain

1. Update the canonical URLs in your SEO component to use your custom domain

2. Update the sitemap.xml file with your custom domain URLs

3. Submit your new domain to search engines:
   - Google Search Console
   - Bing Webmaster Tools
   - Yandex Webmaster

4. Create and verify property in Google Search Console for your custom domain

## Troubleshooting

### Common Issues:

1. **DNS Not Propagating**
   - Use DNS lookup tools like https://dnschecker.org to check propagation status
   - Verify nameserver or record settings at your registrar
   - Contact your domain registrar for assistance

2. **HTTPS Certificate Issues**
   - Ensure DNS is properly configured
   - Check for CAA records that might block Let's Encrypt
   - Manually request certificate provisioning in Netlify

3. **Domain Shows Netlify Default Page**
   - Verify domain is correctly added to your site
   - Check for conflicting DNS records
   - Clear browser cache and try again

### Getting Help:

- Netlify Support: https://www.netlify.com/support/
- Domain Registrar Support: Contact your domain provider
- Let's Encrypt Documentation: https://letsencrypt.org/docs/

## Monitoring Domain Health

1. Regularly check your domain's SSL certificate status

2. Monitor for any DNS issues or outages

3. Set up uptime monitoring for your domain (e.g., UptimeRobot, Pingdom)

4. Create a reminder to renew your domain before expiration

## Next Steps

After successfully connecting your custom domain:

1. Update all marketing materials with your domain
2. Set up email forwarding or custom email with your domain
3. Consider registering additional TLDs (.com, .net, etc.) to protect your brand
4. Implement structured data for better search engine visibility
