import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

type ContactPayload = {
  name: string
  email: string
  phone?: string
  company?: string
  gstin?: string
  jobTitle?: string
  industry?: string
  website?: string
  linkedin?: string
  subject: string
  serviceType?: string
  budgetRange?: string
  preferredContact?: string
  urgencyLevel?: string
  employeeCount?: string
  location?: string
  projectTimeline?: string
  referralSource?: string
  additionalContacts?: string
  specificRequirements?: string
  message: string
}

async function resolveRecipientEmail(): Promise<string | null> {
  // Always prioritize the configured recipient email
  if (process.env.CONTACT_RECIPIENT_EMAIL) {
    return process.env.CONTACT_RECIPIENT_EMAIL
  }

  // Fallback to SMTP user if no specific recipient is configured
  if (process.env.SMTP_USER) {
    return process.env.SMTP_USER
  }

  // If no email is configured, return null
  console.warn('No recipient email configured. Set CONTACT_RECIPIENT_EMAIL or SMTP_USER environment variable.')
  return null
}

async function getTransport() {
  const host = process.env.SMTP_HOST
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !port || !user || !pass) {
    // Dev fallback: create an Ethereal test account
    try {
      console.log('📧 Creating Ethereal test account for development...')
      const testAccount = await nodemailer.createTestAccount()
      console.log('✅ Ethereal account created:', testAccount.user)
      
      return nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: { user: testAccount.user, pass: testAccount.pass },
      })
    } catch (error) {
      console.error('❌ Failed to create Ethereal account:', error)
      throw new Error('Failed to create test email account. Please check your internet connection.')
    }
  }

  const secure = port === 465
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  })
}

function validatePayload(body: any): { valid: boolean; errors?: string[]; payload?: ContactPayload } {
  const errors: string[] = []
  const name = typeof body?.name === 'string' ? body.name.trim() : ''
  const email = typeof body?.email === 'string' ? body.email.trim() : ''
  const phone = typeof body?.phone === 'string' ? body.phone.trim() : ''
  const company = typeof body?.company === 'string' ? body.company.trim() : ''
  const gstin = typeof body?.gstin === 'string' ? body.gstin.trim() : ''
  const jobTitle = typeof body?.jobTitle === 'string' ? body.jobTitle.trim() : ''
  const industry = typeof body?.industry === 'string' ? body.industry.trim() : ''
  const website = typeof body?.website === 'string' ? body.website.trim() : ''
  const linkedin = typeof body?.linkedin === 'string' ? body.linkedin.trim() : ''
  const subject = typeof body?.subject === 'string' ? body.subject.trim() : ''
  const serviceType = typeof body?.serviceType === 'string' ? body.serviceType.trim() : ''
  const budgetRange = typeof body?.budgetRange === 'string' ? body.budgetRange.trim() : ''
  const preferredContact = typeof body?.preferredContact === 'string' ? body.preferredContact.trim() : ''
  const urgencyLevel = typeof body?.urgencyLevel === 'string' ? body.urgencyLevel.trim() : ''
  const employeeCount = typeof body?.employeeCount === 'string' ? body.employeeCount.trim() : ''
  const location = typeof body?.location === 'string' ? body.location.trim() : ''
  const projectTimeline = typeof body?.projectTimeline === 'string' ? body.projectTimeline.trim() : ''
  const referralSource = typeof body?.referralSource === 'string' ? body.referralSource.trim() : ''
  const additionalContacts = typeof body?.additionalContacts === 'string' ? body.additionalContacts.trim() : ''
  const specificRequirements = typeof body?.specificRequirements === 'string' ? body.specificRequirements.trim() : ''
  const message = typeof body?.message === 'string' ? body.message.trim() : ''

  if (!name) errors.push('Name is required')
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email is required')
  if (!subject) errors.push('Subject is required')
  if (!message || message.length < 20) errors.push('Message must be at least 20 characters')

  if (errors.length) return { valid: false, errors }
  return { 
    valid: true, 
    payload: { 
      name, email, phone, company, gstin, jobTitle, industry, website, linkedin, subject, 
      serviceType, budgetRange, preferredContact, urgencyLevel, employeeCount, location, 
      projectTimeline, referralSource, additionalContacts, specificRequirements, message 
    } 
  }
}

function generateEmailHTML(payload: ContactPayload): string {
  const serviceTypeLabel = payload.serviceType ? 
    ['consultation', 'training', 'compliance', 'investigation', 'policy', 'audit', 'mediation'].includes(payload.serviceType) ?
    ['Workplace Consultation', 'Training & Workshops', 'Compliance Services', 'Investigation Services', 'Policy Development', 'HR Audit & Assessment', 'Conflict Mediation'][['consultation', 'training', 'compliance', 'investigation', 'policy', 'audit', 'mediation'].indexOf(payload.serviceType)] :
    'Other Services' : 'Not specified'

  const budgetRangeLabel = payload.budgetRange ? {
    'under-10k': 'Under ₹10,000',
    '10k-50k': '₹10,000 - ₹50,000',
    '50k-1lakh': '₹50,000 - ₹1,00,000',
    '1lakh-5lakh': '₹1,00,000 - ₹5,00,000',
    '5lakh-plus': '₹5,00,000+',
    'discuss': 'Let\'s discuss'
  }[payload.budgetRange] || payload.budgetRange : 'Not specified'

  const urgencyLabel = payload.urgencyLevel ? {
    'low': 'Low - Planning phase',
    'medium': 'Medium - Within 3 months',
    'high': 'High - Within 1 month',
    'urgent': 'Urgent - Immediate attention needed'
  }[payload.urgencyLevel] || payload.urgencyLevel : 'Not specified'

  const preferredContactLabel = payload.preferredContact ? {
    'email': 'Email',
    'phone': 'Phone Call',
    'video': 'Video Call',
    'meeting': 'In-person Meeting'
  }[payload.preferredContact] || payload.preferredContact : 'Not specified'

  const projectTimelineLabel = payload.projectTimeline ? {
    'immediate': 'Immediate - Within 1 month',
    'short-term': 'Short-term - 1-3 months',
    'medium-term': 'Medium-term - 3-6 months',
    'long-term': 'Long-term - 6+ months',
    'ongoing': 'Ongoing partnership',
    'flexible': 'Flexible timeline'
  }[payload.projectTimeline] || payload.projectTimeline : 'Not specified'

  const referralSourceLabel = payload.referralSource ? {
    'google': 'Google Search',
    'linkedin': 'LinkedIn',
    'social-media': 'Social Media',
    'referral': 'Referral/Recommendation',
    'event': 'Event/Conference',
    'website': 'Direct Website Visit',
    'advertisement': 'Advertisement',
    'other': 'Other'
  }[payload.referralSource] || payload.referralSource : 'Not specified'

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f8f9fa; }
        .container { max-width: 700px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: #000; color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; font-weight: bold; }
        .content { padding: 30px; }
        .field { margin-bottom: 20px; }
        .field-label { font-weight: bold; color: #555; margin-bottom: 5px; display: block; }
        .field-value { color: #333; padding: 10px; background: #f8f9fa; border-radius: 6px; border-left: 4px solid #000; }
        .message-box { background: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #e9ecef; margin-top: 20px; }
        .message-text { white-space: pre-wrap; line-height: 1.8; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; border-top: 1px solid #e9ecef; }
        .highlight { background: #fff3cd; padding: 15px; border-radius: 6px; border: 1px solid #ffeaa7; margin: 20px 0; }
        .section { margin-bottom: 30px; }
        .section-title { font-size: 18px; font-weight: bold; color: #333; margin-bottom: 15px; border-bottom: 2px solid #000; padding-bottom: 5px; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        @media (max-width: 600px) { .grid-2 { grid-template-columns: 1fr; } }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📧 New Contact Form Submission</h1>
        </div>
        
        <div class="content">
          <div class="highlight">
            <strong>⚠️ Action Required:</strong> A new contact form submission has been received and requires your attention.
          </div>
          
          <div class="section">
            <div class="section-title">👤 Contact Information</div>
            <div class="field">
              <span class="field-label">Personal Details</span>
              <div class="field-value">
                <strong>Name:</strong> ${payload.name}<br>
                <strong>Email:</strong> ${payload.email}<br>
                ${payload.phone ? `<strong>Phone:</strong> ${payload.phone}<br>` : ''}
                ${payload.jobTitle ? `<strong>Job Title:</strong> ${payload.jobTitle}<br>` : ''}
                ${payload.location ? `<strong>Location:</strong> ${payload.location}` : ''}
              </div>
            </div>
            
            <div class="field">
              <span class="field-label">Company Information</span>
              <div class="field-value">
                ${payload.company ? `<strong>Company:</strong> ${payload.company}<br>` : ''}
                ${payload.gstin ? `<strong>GSTIN:</strong> ${payload.gstin}<br>` : ''}
                ${payload.industry ? `<strong>Industry:</strong> ${payload.industry}<br>` : ''}
                ${payload.employeeCount ? `<strong>Company Size:</strong> ${payload.employeeCount}<br>` : ''}
                ${payload.website ? `<strong>Website:</strong> <a href="${payload.website}" target="_blank">${payload.website}</a><br>` : ''}
                ${payload.linkedin ? `<strong>LinkedIn:</strong> <a href="${payload.linkedin}" target="_blank">${payload.linkedin}</a>` : ''}
              </div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">📋 Project Details</div>
            <div class="field">
              <span class="field-label">Project Information</span>
              <div class="field-value">
                <strong>Subject:</strong> ${payload.subject}<br>
                <strong>Service Type:</strong> ${serviceTypeLabel}<br>
                ${payload.budgetRange ? `<strong>Budget Range:</strong> ${budgetRangeLabel}<br>` : ''}
                ${payload.urgencyLevel ? `<strong>Urgency Level:</strong> ${urgencyLabel}<br>` : ''}
                ${payload.preferredContact ? `<strong>Preferred Contact:</strong> ${preferredContactLabel}<br>` : ''}
                ${payload.projectTimeline ? `<strong>Project Timeline:</strong> ${projectTimelineLabel}<br>` : ''}
                ${payload.referralSource ? `<strong>Referral Source:</strong> ${referralSourceLabel}` : ''}
              </div>
            </div>
          </div>
          
          ${payload.additionalContacts || payload.specificRequirements ? `
          <div class="section">
            <div class="section-title">📝 Additional Information</div>
            ${payload.additionalContacts ? `
            <div class="field">
              <span class="field-label">Additional Contact Information</span>
              <div class="field-value">${payload.additionalContacts}</div>
            </div>
            ` : ''}
            ${payload.specificRequirements ? `
            <div class="field">
              <span class="field-label">Specific Requirements</span>
              <div class="field-value">${payload.specificRequirements}</div>
            </div>
            ` : ''}
          </div>
          ` : ''}
          
          <div class="field">
            <span class="field-label">💬 Message</span>
            <div class="message-box">
              <div class="message-text">${payload.message}</div>
            </div>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background: #e8f5e8; border-radius: 6px; border: 1px solid #c3e6c3;">
            <strong>📅 Submission Time:</strong> ${new Date().toLocaleString('en-US', { 
              timeZone: 'Asia/Kolkata',
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })} IST
          </div>
        </div>
        
        <div class="footer">
          <p>This message was sent from the Ureposh contact form.</p>
          <p>Please respond to the sender at: <a href="mailto:${payload.email}">${payload.email}</a></p>
        </div>
      </div>
    </body>
    </html>
  `
}

function generateEmailText(payload: ContactPayload): string {
  const serviceTypeLabel = payload.serviceType ? 
    ['consultation', 'training', 'compliance', 'investigation', 'policy', 'audit', 'mediation'].includes(payload.serviceType) ?
    ['Workplace Consultation', 'Training & Workshops', 'Compliance Services', 'Investigation Services', 'Policy Development', 'HR Audit & Assessment', 'Conflict Mediation'][['consultation', 'training', 'compliance', 'investigation', 'policy', 'audit', 'mediation'].indexOf(payload.serviceType)] :
    'Other Services' : 'Not specified'

  const budgetRangeLabel = payload.budgetRange ? {
    'under-10k': 'Under ₹10,000',
    '10k-50k': '₹10,000 - ₹50,000',
    '50k-1lakh': '₹50,000 - ₹1,00,000',
    '1lakh-5lakh': '₹1,00,000 - ₹5,00,000',
    '5lakh-plus': '₹5,00,000+',
    'discuss': 'Let\'s discuss'
  }[payload.budgetRange] || payload.budgetRange : 'Not specified'

  const urgencyLabel = payload.urgencyLevel ? {
    'low': 'Low - Planning phase',
    'medium': 'Medium - Within 3 months',
    'high': 'High - Within 1 month',
    'urgent': 'Urgent - Immediate attention needed'
  }[payload.urgencyLevel] || payload.urgencyLevel : 'Not specified'

  const preferredContactLabel = payload.preferredContact ? {
    'email': 'Email',
    'phone': 'Phone Call',
    'video': 'Video Call',
    'meeting': 'In-person Meeting'
  }[payload.preferredContact] || payload.preferredContact : 'Not specified'

  const projectTimelineLabel = payload.projectTimeline ? {
    'immediate': 'Immediate - Within 1 month',
    'short-term': 'Short-term - 1-3 months',
    'medium-term': 'Medium-term - 3-6 months',
    'long-term': 'Long-term - 6+ months',
    'ongoing': 'Ongoing partnership',
    'flexible': 'Flexible timeline'
  }[payload.projectTimeline] || payload.projectTimeline : 'Not specified'

  const referralSourceLabel = payload.referralSource ? {
    'google': 'Google Search',
    'linkedin': 'LinkedIn',
    'social-media': 'Social Media',
    'referral': 'Referral/Recommendation',
    'event': 'Event/Conference',
    'website': 'Direct Website Visit',
    'advertisement': 'Advertisement',
    'other': 'Other'
  }[payload.referralSource] || payload.referralSource : 'Not specified'

  return `NEW CONTACT FORM SUBMISSION
================================

PERSONAL DETAILS:
- Name: ${payload.name}
- Email: ${payload.email}
${payload.phone ? `- Phone: ${payload.phone}` : ''}
${payload.jobTitle ? `- Job Title: ${payload.jobTitle}` : ''}
${payload.location ? `- Location: ${payload.location}` : ''}

COMPANY INFORMATION:
${payload.company ? `- Company: ${payload.company}` : ''}
${payload.gstin ? `- GSTIN: ${payload.gstin}` : ''}
${payload.industry ? `- Industry: ${payload.industry}` : ''}
${payload.employeeCount ? `- Company Size: ${payload.employeeCount}` : ''}
${payload.website ? `- Website: ${payload.website}` : ''}
${payload.linkedin ? `- LinkedIn: ${payload.linkedin}` : ''}

PROJECT INFORMATION:
- Subject: ${payload.subject}
- Service Type: ${serviceTypeLabel}
${payload.budgetRange ? `- Budget Range: ${budgetRangeLabel}` : ''}
${payload.urgencyLevel ? `- Urgency Level: ${urgencyLabel}` : ''}
${payload.preferredContact ? `- Preferred Contact: ${preferredContactLabel}` : ''}
${payload.projectTimeline ? `- Project Timeline: ${projectTimelineLabel}` : ''}
${payload.referralSource ? `- Referral Source: ${referralSourceLabel}` : ''}

${payload.additionalContacts || payload.specificRequirements ? `ADDITIONAL INFORMATION:
${payload.additionalContacts ? `- Additional Contacts: ${payload.additionalContacts}` : ''}
${payload.specificRequirements ? `- Specific Requirements: ${payload.specificRequirements}` : ''}
` : ''}

MESSAGE:
${payload.message}

================================
Submission Time: ${new Date().toLocaleString('en-US', { 
  timeZone: 'Asia/Kolkata',
  year: 'numeric', 
  month: 'long', 
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})} IST

Please respond to: ${payload.email}
`
}

export async function POST(req: NextRequest) {
  const startTime = Date.now()
  console.log('\n🚀 === CONTACT FORM API CALL STARTED ===')
  console.log(`⏰ Timestamp: ${new Date().toISOString()}`)
  
  try {
    console.log('📥 Parsing request body...')
    const body = await req.json()
    console.log('✅ Request body parsed successfully')
    
    console.log('🔍 Validating payload...')
    const { valid, errors, payload } = validatePayload(body)
    if (!valid || !payload) {
      console.log('❌ Validation failed:', errors)
      return NextResponse.json({ error: 'Validation failed', details: errors }, { status: 400 })
    }
    console.log('✅ Payload validation passed')

    console.log('📨 Processing contact form submission:')
    console.log(`   👤 Name: ${payload.name}`)
    console.log(`   📧 Email: ${payload.email}`)
    console.log(`   📱 Phone: ${payload.phone || 'Not provided'}`)
    console.log(`   🏢 Company: ${payload.company || 'Not provided'}`)
    console.log(`   🧾 GSTIN: ${payload.gstin || 'Not provided'}`)
    console.log(`   💼 Job Title: ${payload.jobTitle || 'Not provided'}`)
    console.log(`   🌐 Industry: ${payload.industry || 'Not provided'}`)
    console.log(`   🔗 Website: ${payload.website || 'Not provided'}`)
    console.log(`   💼 LinkedIn: ${payload.linkedin || 'Not provided'}`)
    console.log(`   📋 Subject: ${payload.subject}`)
    console.log(`   🔧 Service Type: ${payload.serviceType || 'Not specified'}`)
    console.log(`   💰 Budget Range: ${payload.budgetRange || 'Not specified'}`)
    console.log(`   📞 Preferred Contact: ${payload.preferredContact || 'Not specified'}`)
    console.log(`   ⚠️ Urgency Level: ${payload.urgencyLevel || 'Not specified'}`)
    console.log(`   👥 Employee Count: ${payload.employeeCount || 'Not specified'}`)
    console.log(`   📍 Location: ${payload.location || 'Not provided'}`)
    console.log(`   📅 Project Timeline: ${payload.projectTimeline || 'Not specified'}`)
    console.log(`   👥 Referral Source: ${payload.referralSource || 'Not specified'}`)
    console.log(`   📝 Additional Contacts: ${payload.additionalContacts || 'Not provided'}`)
    console.log(`   📋 Specific Requirements: ${payload.specificRequirements || 'Not provided'}`)
    console.log(`   💬 Message Length: ${payload.message.length} characters`)

    console.log('\n🔍 Resolving recipient email...')
    let to = await resolveRecipientEmail()
    if (!to) {
      console.log('❌ No recipient email configured')
      return NextResponse.json(
        { error: 'Recipient email not configured. Set CONTACT_RECIPIENT_EMAIL or ensure an admin email exists.' },
        { status: 500 }
      )
    } else {
      console.log('✅ Recipient email resolved:', to)
    }

    console.log('\n📧 Setting up email transport...')
    const transporter = await getTransport()
    console.log('✅ Email transport configured successfully')

    const fromAddress = process.env.SMTP_USER || 'no-reply@ureposh.local'
    const subject = `New Contact Form: ${payload.subject} - ${payload.name}`
    const text = generateEmailText(payload)
    const html = generateEmailHTML(payload)

    console.log('\n📤 Preparing email:')
    console.log(`   📧 From: ${fromAddress}`)
    console.log(`   📧 To: ${to}`)
    console.log(`   📧 Reply-To: ${payload.email}`)
    console.log(`   📧 Subject: ${subject}`)
    console.log(`   📧 Text Length: ${text.length} characters`)
    console.log(`   📧 HTML Length: ${html.length} characters`)

    console.log('\n📤 Sending email...')
    const sendStartTime = Date.now()
    const info = await transporter.sendMail({
      from: fromAddress,
      to,
      replyTo: payload.email,
      subject,
      text,
      html,
    })
    const sendEndTime = Date.now()
    const sendDuration = sendEndTime - sendStartTime

    console.log('✅ Email sent successfully!')
    console.log(`   ⏱️ Send duration: ${sendDuration}ms`)
    console.log(`   📧 Message ID: ${info.messageId}`)
    
    const previewUrl = nodemailer.getTestMessageUrl?.(info)
    if (previewUrl) {
      console.log('🔗 Preview URL:', previewUrl)
    }
    
    const totalDuration = Date.now() - startTime
    console.log(`\n🎉 === CONTACT FORM API COMPLETED SUCCESSFULLY ===`)
    console.log(`⏱️ Total duration: ${totalDuration}ms`)
    console.log(`📊 Response: { ok: true, previewUrl: ${previewUrl ? 'available' : 'none'} }`)
    
    return NextResponse.json({ ok: true, previewUrl })
  } catch (err: any) {
    const message = err?.message || String(err)
    const totalDuration = Date.now() - startTime
    
    console.error('\n❌ === CONTACT FORM API ERROR ===')
    console.error(`⏱️ Duration before error: ${totalDuration}ms`)
    console.error(`💥 Error message: ${message}`)
    console.error(`📋 Error stack:`, err?.stack || 'No stack trace')
    
    // Provide more specific error messages
    let errorMessage = 'Failed to send message'
    if (message.includes('Ethereal')) {
      errorMessage = 'Email service temporarily unavailable. Please try again in a few minutes.'
    } else if (message.includes('SMTP')) {
      errorMessage = 'Email configuration error. Please contact support.'
    } else if (message.includes('network')) {
      errorMessage = 'Network error. Please check your internet connection.'
    }
    
    const body: any = { error: errorMessage }
    if (process.env.NODE_ENV !== 'production') {
      body.details = message
    }
    
    console.error(`📤 Returning error response: ${JSON.stringify(body)}`)
    console.error('❌ === CONTACT FORM API FAILED ===\n')
    
    return NextResponse.json(body, { status: 500 })
  }
}

