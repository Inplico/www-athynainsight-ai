import { Container } from "@/components/ui/container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Athyna Insight's AI-powered building code compliance platform",
};

export default function PrivacyPolicy() {
  return (
    <div className="py-16 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-gray-900">Privacy Policy</h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Last Updated: August 2025
          </p>

          <p className="mb-6 text-gray-700">
            Athyna Insight Inc. ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website athynainsight.ai and use our AI-powered building code compliance platform (the "Service").
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">1. Information We Collect</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">Personal Information</h3>
          <p className="mb-4 text-gray-700">We may collect personal information that you provide directly to us, including:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Name and contact information (email address, phone number, mailing address)</li>
            <li>Professional information (company name, job title, professional license numbers)</li>
            <li>Account credentials (username, password)</li>
            <li>Building project details and addresses for compliance queries</li>
            <li>Payment information (processed securely through third-party providers)</li>
            <li>Communications and feedback you provide</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">Usage Information</h3>
          <p className="mb-4 text-gray-700">When you use our Service, we automatically collect:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Search queries and building code questions</li>
            <li>Usage patterns and interaction with AI responses</li>
            <li>Device information and browser type</li>
            <li>IP address and location data</li>
            <li>Analytics data about how you navigate our Service</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">2. How We Use Your Information</h2>
          <p className="mb-4 text-gray-700">We use the collected information to:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Provide and improve our AI-powered building code compliance services</li>
            <li>Process your queries and deliver accurate compliance information</li>
            <li>Personalize your experience and remember your preferences</li>
            <li>Send you updates about our Service (with your consent)</li>
            <li>Respond to your comments, questions, and customer service requests</li>
            <li>Monitor and analyze usage patterns to improve our AI algorithms</li>
            <li>Detect, prevent, and address technical issues and security threats</li>
            <li>Comply with legal obligations and enforce our terms of service</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">3. How We Share Your Information</h2>
          <p className="mb-4 text-gray-700">We do not sell, trade, or rent your personal information. We may share your information only in the following circumstances:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li><strong>Service Providers:</strong> With trusted third parties who assist us in operating our Service (e.g., cloud hosting, email services, payment processing)</li>
            <li><strong>Professional Partners:</strong> With building code experts or consultants when you request expert validation (with your consent)</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            <li><strong>Aggregated Data:</strong> We may share anonymized, aggregated data that cannot identify you personally</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">4. Data Security</h2>
          <p className="mb-4 text-gray-700">
            We implement appropriate technical and organizational measures to protect your personal information, including:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Encryption of sensitive data in transit and at rest</li>
            <li>Secure access controls and authentication systems</li>
            <li>Regular security assessments and updates</li>
            <li>Limited access to personal information on a need-to-know basis</li>
            <li>Secure cloud infrastructure with industry-standard protections</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">5. AI and Machine Learning</h2>
          <p className="mb-4 text-gray-700">
            Our Service uses artificial intelligence and machine learning to provide building code compliance information. In this context:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Your queries help improve our AI's accuracy and relevance</li>
            <li>We may use anonymized query data to train and refine our models</li>
            <li>Personal information is not used in AI training without explicit consent</li>
            <li>You can request that your data not be used for AI improvement purposes</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">6. Your Rights and Choices</h2>
          <p className="mb-4 text-gray-700">You have the right to:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li><strong>Access:</strong> Request a copy of your personal information</li>
            <li><strong>Correction:</strong> Update or correct inaccurate information</li>
            <li><strong>Deletion:</strong> Request deletion of your personal information</li>
            <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
            <li><strong>Data Portability:</strong> Receive your data in a structured format</li>
            <li><strong>Restriction:</strong> Limit how we use your information</li>
          </ul>
          <p className="mb-4 text-gray-700">
            To exercise these rights, please contact us at privacy@athynainsight.ai
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">7. Cookies and Tracking Technologies</h2>
          <p className="mb-4 text-gray-700">
            We use cookies and similar tracking technologies to enhance your experience. These include:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li><strong>Essential Cookies:</strong> Required for the Service to function properly</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our Service</li>
            <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
          </ul>
          <p className="mb-4 text-gray-700">
            You can control cookies through your browser settings, though some features may not function properly without them.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">8. Children's Privacy</h2>
          <p className="mb-4 text-gray-700">
            Our Service is not intended for children under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">9. International Data Transfers</h2>
          <p className="mb-4 text-gray-700">
            Your information may be transferred to and processed in countries other than Canada. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">10. Data Retention</h2>
          <p className="mb-4 text-gray-700">
            We retain your personal information only as long as necessary to provide our Service and fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">11. Third-Party Links</h2>
          <p className="mb-4 text-gray-700">
            Our Service may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">12. Changes to This Privacy Policy</h2>
          <p className="mb-4 text-gray-700">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. For significant changes, we may provide additional notice via email.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">13. Contact Information</h2>
          <p className="mb-4 text-gray-700">
            If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us at:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <p className="font-semibold mb-2">Athyna Insight Inc.</p>
            <p>10020 101A Ave NW</p>
            <p>Edmonton, AB T5J 3G2</p>
            <p>Canada</p>
            <p className="mt-3">
              Email: <a href="mailto:privacy@athynainsight.ai" className="text-orange-600 hover:text-orange-700">privacy@athynainsight.ai</a>
            </p>
            <p>
              General Inquiries: <a href="mailto:hello@athynainsight.ai" className="text-orange-600 hover:text-orange-700">hello@athynainsight.ai</a>
            </p>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">14. Privacy Rights for Specific Jurisdictions</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">For Alberta Residents</h3>
          <p className="mb-4 text-gray-700">
            Under the Personal Information Protection Act (PIPA) of Alberta, you have specific rights regarding your personal information. We comply with all applicable provincial privacy laws.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">For European Union Residents</h3>
          <p className="mb-4 text-gray-700">
            If you are located in the European Union, you have additional rights under the General Data Protection Regulation (GDPR), including the right to lodge a complaint with your local supervisory authority.
          </p>

          <div className="border-t pt-8 mt-12">
            <p className="text-sm text-gray-600">
              By using our Service, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}