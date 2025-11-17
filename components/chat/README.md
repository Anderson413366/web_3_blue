# Live Chat Widget Integration

Complete guide for integrating and managing live chat on the Anderson Cleaning website.

## 📋 Overview

The chat widget system is **provider-agnostic**, supporting 4 popular B2B chat platforms:

- **Intercom** - Premium, feature-rich (recommended for B2B)
- **Drift** - Sales-focused with lead qualification
- **Tidio** - Budget-friendly, good features
- **Tawk.to** - Free forever, open source

Switch between providers by changing a single configuration value. No code changes required.

## 📦 File Structure

```
anderson-cleaning/
├── lib/
│   ├── chat-config.ts           ← Configuration file (EDIT THIS)
│   └── load-chat-widget.ts      ← Loader utility (don't edit)
├── components/
│   └── chat/
│       ├── ChatWidget.tsx       ← Main component (don't edit)
│       └── README.md            ← This file
└── app/
    └── layout.tsx               ← Add ChatWidget here
```

## 🚀 Quick Start

### Step 1: Choose a Provider

Pick one of the 4 supported providers:

| Provider | Best For | Pricing | Features |
|----------|----------|---------|----------|
| **Intercom** | Enterprise B2B | $39+/mo | Full CRM, automation, best UX |
| **Drift** | Sales teams | $2,500+/mo | Lead qualification, chatbots |
| **Tidio** | Small business | $29+/mo | Good features, affordable |
| **Tawk.to** | Budget conscious | FREE | Basic chat, no credit card |

**Recommendation for Anderson Cleaning**: Start with **Tidio** (affordable, good features) or **Tawk.to** (free to test).

### Step 2: Sign Up & Get Credentials

#### Intercom

1. Go to https://www.intercom.com/
2. Sign up for an account
3. Navigate to Settings → Installation → Web
4. Copy your **App ID** (looks like `abc12345`)

#### Drift

1. Go to https://www.drift.com/
2. Sign up for an account
3. Navigate to Settings → App Settings → Live Chat
4. Copy your **App ID** (looks like `abc123def456`)

#### Tidio

1. Go to https://www.tidio.com/
2. Sign up for an account
3. Navigate to Settings → Developer
4. Copy your **Public Key** (looks like `abc123def456ghi789`)

#### Tawk.to

1. Go to https://www.tawk.to/
2. Sign up for a FREE account
3. Navigate to Administration → Property Settings
4. Copy your **Property ID** and **Widget ID**

### Step 3: Configure

Open `lib/chat-config.ts` and update:

```typescript
export const chatConfig = {
  // 1. Enable chat
  enabled: true, // Change from false to true

  // 2. Choose provider
  provider: 'tidio', // 'intercom' | 'drift' | 'tidio' | 'tawk'

  // 3. Add your credentials
  tidio: {
    publicKey: 'your_actual_public_key_here', // Replace placeholder
  },

  // ... rest of config
}
```

### Step 4: Add to Layout

Open `app/layout.tsx` and add the ChatWidget:

```tsx
import ChatWidget from '@/components/chat/ChatWidget'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ChatWidget /> {/* Add this line */}
      </body>
    </html>
  )
}
```

### Step 5: Test

1. Run `npm run dev`
2. Open http://localhost:3000
3. Wait 1-2 seconds for the chat widget to load
4. You should see the chat bubble in bottom right corner
5. Click it to test the chat

## 📐 Configuration Options

### Display Settings

Control where chat appears:

```typescript
displayOn: {
  mobile: true,   // Show on phones/tablets
  desktop: true,  // Show on desktop computers
},
```

Examples:

```typescript
// Desktop only (hide on mobile)
displayOn: {
  mobile: false,
  desktop: true,
},

// Mobile only (hide on desktop)
displayOn: {
  mobile: true,
  desktop: false,
},
```

### Privacy Settings

Comply with GDPR/CCPA by waiting for cookie consent:

```typescript
loadOnConsent: true, // Wait for user to accept cookies
```

How it works:
1. Chat widget won't load until user accepts cookies
2. Checks `localStorage.getItem('cookie-consent')`
3. If value is `'true'` or `'accepted'`, loads chat
4. Also listens for `'cookie-consent-accepted'` event

To load immediately without consent:

```typescript
loadOnConsent: false, // Load chat immediately
```

### Theme Settings

Customize appearance (if supported by provider):

```typescript
theme: {
  primaryColor: '#2563eb', // Anderson Cleaning blue
  position: 'right',       // 'right' or 'left'
},
```

**Note**: Not all providers support all theme options. Refer to provider docs for customization.

## 🔧 Advanced Usage

### Custom Chat Launcher Button

Want your own chat button instead of the floating bubble?

```tsx
import { ChatLauncher } from '@/components/chat/ChatWidget'

export default function ContactPage() {
  return (
    <div>
      <h1>Contact Us</h1>

      <ChatLauncher>
        <button className="btn btn-primary">
          💬 Chat with our team
        </button>
      </ChatLauncher>
    </div>
  )
}
```

### Programmatic Control

Open/close chat from your code:

```typescript
import { showChat, hideChat, identifyUser } from '@/lib/load-chat-widget'

// Show the chat widget
function handleChatClick() {
  showChat()
}

// Hide the chat widget
function handleHideChat() {
  hideChat()
}

// Identify logged-in user (for better support)
function handleLogin(user) {
  identifyUser({
    email: user.email,
    name: user.name,
    company: user.company,
  })
}
```

### User Identification

Pass user info to chat for personalized support:

```typescript
import { identifyUser } from '@/lib/load-chat-widget'

// After user logs in or submits a form
identifyUser({
  email: 'john@example.com',
  name: 'John Smith',
  company: 'ACME Corp',
  phone: '555-123-4567',
  // Any custom fields your provider supports
})
```

Benefits:
- Support team sees who they're talking to
- No need to ask for email/name again
- Better tracking and follow-up

## 🔄 Switching Providers

Need to change from one provider to another? Easy:

1. Open `lib/chat-config.ts`
2. Change `provider` field:
   ```typescript
   provider: 'tidio', // Change to 'intercom', 'drift', or 'tawk'
   ```
3. Ensure new provider credentials are filled in
4. Deploy

That's it! No code changes needed.

### Migration Checklist

- [ ] Export chat history from old provider (if needed)
- [ ] Sign up for new provider account
- [ ] Get new provider credentials
- [ ] Update `chat-config.ts` with new provider and credentials
- [ ] Test thoroughly on dev/staging
- [ ] Deploy to production
- [ ] Monitor for any issues
- [ ] Update team on new chat dashboard URL

## 🐛 Troubleshooting

### Chat widget not appearing

**Check these in order:**

1. **Is chat enabled?**
   ```typescript
   // In chat-config.ts
   enabled: true, // Must be true
   ```

2. **Are credentials correct?**
   - Check that you replaced `YOUR_PROVIDER_ID` with actual ID
   - No typos or extra spaces
   - Correct provider selected

3. **Device settings?**
   ```typescript
   displayOn: {
     mobile: true,  // Check your device type
     desktop: true,
   },
   ```

4. **Cookie consent?**
   - If `loadOnConsent: true`, accept cookies first
   - Or set to `false` for testing

5. **Check browser console**
   - Open DevTools (F12)
   - Look for errors in Console tab
   - Look for `[Chat Widget]` log messages

### Chat loads but looks wrong

**Provider-specific styling:**
- Each provider has their own dashboard for customization
- Log into provider dashboard
- Look for "Widget appearance" or "Customization" settings
- Change colors, position, text, etc.

### "Failed to load" error

**Possible causes:**
- Ad blocker or privacy extension blocking chat scripts
- Network firewall blocking provider domain
- Invalid or expired credentials
- Provider service outage (check their status page)

**Solutions:**
- Test in incognito mode (disables extensions)
- Try different network
- Verify credentials are up-to-date
- Check provider status page

### Multiple chat widgets appearing

**Cause:** Chat widget added to multiple places

**Solution:**
- Only add `<ChatWidget />` once in `app/layout.tsx`
- Don't add to individual pages
- Don't add to both layout and pages

### Chat not respecting loadOnConsent setting

**Check:**
1. Cookie consent is actually being stored:
   ```javascript
   // In browser console
   localStorage.getItem('cookie-consent')
   // Should return 'true' or 'accepted' after consent
   ```

2. Custom event is being dispatched:
   ```javascript
   // When user accepts cookies, dispatch:
   window.dispatchEvent(new CustomEvent('cookie-consent-accepted', {
     detail: { accepted: true }
   }))
   ```

## 🔐 Privacy & Compliance

### GDPR Compliance

1. **Cookie consent**: Set `loadOnConsent: true`
2. **Privacy policy**: Mention chat widget in your privacy policy
3. **Data processing**: Sign Data Processing Agreement with provider
4. **User rights**: Ensure users can delete chat data

### CCPA Compliance

1. **Do Not Sell**: Add opt-out mechanism for California visitors
2. **Disclosure**: Mention chat widget in privacy disclosures
3. **Data deletion**: Honor deletion requests

### Best Practices

- ✅ Always get consent before loading chat widget
- ✅ Clearly explain what data is collected
- ✅ Provide opt-out mechanism
- ✅ Train support team on privacy procedures
- ✅ Regular security audits of provider
- ✅ Data retention policies

## 📊 Provider Comparison

### Feature Matrix

| Feature | Intercom | Drift | Tidio | Tawk.to |
|---------|----------|-------|-------|---------|
| **Price** | $$$ | $$$$ | $$ | FREE |
| **Mobile apps** | ✅ | ✅ | ✅ | ✅ |
| **Chat history** | ✅ | ✅ | ✅ | ✅ |
| **File sharing** | ✅ | ✅ | ✅ | ✅ |
| **Chatbots** | ✅ Advanced | ✅ Advanced | ✅ Basic | ❌ |
| **CRM integration** | ✅ Built-in | ✅ Built-in | ⚠️ Limited | ⚠️ Limited |
| **Email integration** | ✅ | ✅ | ✅ | ✅ |
| **API access** | ✅ | ✅ | ✅ | ✅ |
| **White label** | ❌ | ❌ | ❌ | ✅ |
| **Self-hosted** | ❌ | ❌ | ❌ | ✅ Option |

### Pricing (Approximate)

**Intercom**
- Starter: $39/month
- Pro: $99/month
- Premium: Custom pricing

**Drift**
- Premium: $2,500/month
- Advanced: Custom pricing
- Enterprise: Custom pricing

**Tidio**
- Free: Up to 50 conversations
- Communicator: $29/month
- Chatbots: $29/month

**Tawk.to**
- Chat: FREE forever
- Remove branding: $19/month
- Hire chat agents: Pay per hour

## 🎯 Best Practices for B2B Chat

### Operating Hours

Set business hours in provider dashboard:
- Monday-Friday: 8 AM - 6 PM EST
- Auto-response outside hours
- Mention email for urgent issues

### Response Time

B2B expectations:
- **During business hours**: < 5 minutes
- **Outside hours**: < 24 hours (email)
- **Set expectations**: "We'll respond within 30 minutes"

### Chat Routing

For multi-person teams:
- Sales inquiries → Sales team
- Support questions → Support team
- General questions → Round robin

### Canned Responses

Pre-write common responses:
- "Thanks for reaching out! How can I help?"
- "Let me check our schedule and get back to you..."
- "I'll need to transfer you to our [sales/support] team"
- "Can you provide your email so I can send you details?"

### Lead Qualification

Ask qualifying questions early:
- "What type of facility do you need cleaned?"
- "How many square feet?"
- "What's your timeline?"
- "Have you worked with a cleaning company before?"

### Integration with CRM

Connect chat to your CRM:
- Auto-create leads from chat conversations
- Sync contact information
- Track conversation history
- Follow up on abandoned chats

## 📚 Additional Resources

### Provider Documentation

- **Intercom**: https://developers.intercom.com/
- **Drift**: https://devdocs.drift.com/
- **Tidio**: https://www.tidio.com/docs/
- **Tawk.to**: https://help.tawk.to/

### Support

- **Provider issues**: Contact provider support directly
- **Integration issues**: Check browser console, review config file
- **Code issues**: Review component source code comments

## 🔄 Updates & Maintenance

### Updating Credentials

If you need to rotate/update credentials:

1. Log into provider dashboard
2. Generate new credentials
3. Update `chat-config.ts`
4. Deploy changes
5. Test to ensure old credentials are invalidated

### Monitoring

Check regularly:
- [ ] Chat widget loading successfully
- [ ] Response times meeting SLA
- [ ] No console errors
- [ ] Mobile experience smooth
- [ ] Team responding to chats

### Analytics

Track these metrics:
- **Chat volume**: How many conversations per day
- **Response time**: How quickly team responds
- **Resolution rate**: % of chats resolved without escalation
- **Satisfaction**: Customer satisfaction scores
- **Conversion**: % of chats that become leads/customers

---

**Version**: 1.0.0
**Last Updated**: 2025-11-14
**Maintained by**: Anderson Cleaning Development Team

**Questions or issues?** Review the code comments in `chat-config.ts` and `load-chat-widget.ts` for detailed technical documentation.
