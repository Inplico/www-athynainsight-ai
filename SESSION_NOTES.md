# SESSION NOTES

## August 28, 2025

### Major Updates Completed

1. **Homepage Content Refresh**
   - Updated location from "Edmonton" to "Alberta" for broader appeal
   - Redesigned headline as two-line format: "Building Code Confusion? Solved" / "Instantly!"
   - Revised hero description with clearer value proposition
   - Updated stats to business-value focused metrics:
     - 50% Time Saved on Compliance
     - 95%+ Expert Validated
     - 3 Codes (NBC + ABC + Zoning)

2. **Lead Capture Form Improvements**
   - Changed section heading to "Step Into the Future of Compliance"
   - Renamed user categories:
     - "Building Code Expert" → "Regulatory Compliance Expert"
     - "Construction Company" → "Construction Industry Rep"
   - Added detailed role descriptions for each category
   - Added placeholder text "STAR" FOR REQ. for Regulatory Compliance Experts
   - Updated consent text with opt-out information

3. **Logo Implementation**
   - Integrated new logo: "Athyna Insight_Secondary Logo_TransparentBG.png" (2501×620px with text)
   - Removed manual text from headers since logo includes text
   - Increased header height from 16 to 20 to accommodate larger logo
   - Set logo to h-12 with auto width to maintain aspect ratio

4. **Footer Updates**
   - Changed tagline to "Reimagining the Way We Build"
   - Updated copyright to 2025

5. **Privacy Policy**
   - Created comprehensive privacy policy page at `/privacy-policy`
   - Covers current email collection and future AI platform usage
   - Includes sections on:
     - Data collection and usage
     - AI/ML training practices
     - User rights and data control
     - Security measures
     - Cookie policies
     - Compliance with Alberta's PIPA and GDPR
   - Used Edmonton address (10020 101A Ave NW) matching parent company
   - Linked privacy policy in signup form consent text
   - Fixed text color issues (was white on white)
   - Updated date to August 2025

### Files Modified
- `src/components/sections/simple-hero.tsx` - Hero section content and stats
- `src/components/sections/lead-capture.tsx` - Form categories and descriptions
- `src/components/layout/simple-header.tsx` - Logo update
- `src/components/layout/header.tsx` - Logo update
- `src/components/layout/simple-footer.tsx` - Tagline and copyright
- `src/app/layout.tsx` - Logo references in metadata
- `src/app/privacy-policy/page.tsx` - New privacy policy page

### Next Steps / Recommendations
- Consider adding Terms of Service page
- May want to add cookie consent banner when implementing analytics
- Logo file "Athyna Insight_Logo Only_TransparentBG.png" available for icon usage
- Privacy policy email (privacy@athynainsight.ai) needs to be configured