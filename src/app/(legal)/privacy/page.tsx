export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-32">
      <h1 className="font-heading text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-lg text-secondary">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>Your privacy is important to us. It is MENZSTORE's policy to respect your privacy regarding any information we may collect from you across our website.</p>
        <h3>1. Information We Collect</h3>
        <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
        <h3>2. Affiliate Disclosure</h3>
        <p>MENZSTORE is a participant in various affiliate programs. We may earn a commission on purchases made through our links.</p>
      </div>
    </main>
  );
}