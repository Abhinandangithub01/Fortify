# 🛡️ Fortify - AI-Powered Security & Compliance Analysis

**Production-Ready Security Analysis Platform**

Fortify is an AI-powered security and compliance analysis platform that analyzes code for vulnerabilities, checks SOC2 and ISO 27001 compliance, and provides actionable recommendations.

🌐 **Live Demo:** [https://master.d9l394ldrfout.amplifyapp.com/](https://master.d9l394ldrfout.amplifyapp.com/)

---

## ✨ Features

### 🔒 Security Analysis
- **Vulnerability Detection** - Identifies SQL injection, XSS, hardcoded secrets, and more
- **OWASP Mapping** - Maps vulnerabilities to OWASP Top 10 and CWE classifications
- **CVSS Scoring** - Provides severity ratings for each finding
- **Detailed Fixes** - AI-generated code fixes with explanations

### ✅ Compliance Checking
- **SOC2 Type II** - Complete compliance analysis with control mapping
- **ISO 27001:2022** - Full certification readiness assessment
- **Gap Analysis** - Identifies missing controls and provides remediation steps
- **Certification Recommendations** - Suggests relevant security certifications

### 🤖 AI-Powered Analysis
- **Groq AI** - Primary analysis engine (llama-3.3-70b-versatile)
- **Perplexity AI** - Fallback for reliability (llama-3.1-sonar-large-128k-online)
- **Intelligent Parsing** - Extracts vulnerabilities with line numbers and context
- **Contextual Recommendations** - Tailored fixes based on your codebase

### 🎨 User Interface
- **Code Input:** Paste code directly or provide GitHub repository URL
- **Real-time Progress:** Live analysis progress with multi-agent dashboard
- **Interactive Results:** Expandable findings with detailed information
- **Export Options:** Download results as JSON, TXT, or CSV
- **Modern Design:** Clean, responsive UI with tiger orange theme

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Groq API Key (get free at [console.groq.com](https://console.groq.com))

### Installation

```bash
# Clone the repository
git clone https://github.com/Abhinandangithub01/Fortify.git
cd fortify

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:

```bash
# Required: Groq AI (Primary)
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile

# Optional: Perplexity AI (Fallback)
PERPLEXITY_API_KEY=your_perplexity_key
```

```bash
# Run development server
npm run dev
```

Visit `http://localhost:3000`

### Deployment

The app is configured for AWS Amplify deployment:

1. Connect your GitHub repository to AWS Amplify
2. Add environment variables in Amplify Console:
   - `GROQ_API_KEY`
   - `GROQ_MODEL`
   - `PERPLEXITY_API_KEY` (optional)
3. Deploy automatically on push to master

---

## 🔧 Configuration

### Environment Variables

**Required:**
- `GROQ_API_KEY` - Your Groq API key for AI analysis
- `GROQ_MODEL` - Model to use (default: llama-3.3-70b-versatile)

**Optional:**
- `PERPLEXITY_API_KEY` - Fallback AI provider
- `TIGER_DATABASE_URL` - For advanced Tiger DB features (not required)

---

## 📊 Architecture

### Core Components

```
fortify/
├── app/
│   ├── api/analysis/start/     # Analysis API endpoint
│   ├── dashboard/              # Main dashboard page
│   ├── page.tsx                # Landing page
│   └── components/
│       ├── dashboard/          # Dashboard components
│       │   ├── FortifyResultsView.tsx    # Results with export
│       │   ├── MultiAgentDashboard.tsx   # Progress visualization
│       │   ├── UploadView.tsx            # Code input UI
│       │   └── AnalysisView.tsx          # Analysis progress
│       └── home/               # Landing page components
├── lib/
│   ├── groq-client.ts         # Groq AI integration
│   ├── perplexity-client.ts   # Perplexity AI fallback
│   ├── github-fetcher.ts      # GitHub repository fetching
│   ├── tiger-analysis.ts      # Analysis orchestration
│   ├── iso-compliance.ts      # ISO 27001 checker
│   └── analysis-service.ts    # Session management
└── next.config.js             # Next.js configuration
```

### Analysis Flow

1. **Input** - User pastes code or provides GitHub URL
2. **GitHub Fetch** (if URL) - Fetches repository code via GitHub API
3. **Security Analysis** - Groq AI identifies vulnerabilities with OWASP/CWE mapping
4. **SOC2 Check** - Analyzes compliance with SOC2 Type II controls
5. **ISO 27001 Check** - Assesses ISO 27001:2022 readiness
6. **Certifications** - AI recommends relevant security certifications
7. **Results** - Interactive display with export options

**Total:** 10-30 seconds depending on code size

---

## 📚 Complete Documentation

We have **comprehensive documentation** explaining everything about Fortify in simple terms:

### **Quick Start Guides:**
- **[📖 What is Fortify?](./docs/01-WHAT-IS-FORTIFY.md)** - Perfect introduction for everyone
- **[🔧 Technologies Explained](./docs/02-TECHNOLOGIES-EXPLAINED.md)** - All tech in plain English
- **[🐅 Tiger Data Deep Dive](./docs/03-TIGER-DATA-IN-DEPTH.md)** - How Tiger powers Fortify

### **User & Business:**
- **[🚶 User Flow](./docs/04-USER-FLOW.md)** - Step-by-step journey
- **[🛡️ Security & Validation](./docs/05-VALIDATION-AND-SECURITY.md)** - How we keep things safe
- **[🌟 Benefits & ROI](./docs/06-BENEFITS.md)** - Business value and cost savings

### **Technical:**
- **[⚙️ Technical Implementation](./docs/07-TECHNICAL-IMPLEMENTATION.md)** - Complete architecture

**👉 [Start with the Documentation Guide](./docs/README.md)**

---

## 🧪 Testing

### Test with Code Paste

Try pasting this vulnerable code:

```python
# Example vulnerable code
username = input("Username: ")
query = f"SELECT * FROM users WHERE username='{username}'"
PASSWORD = "admin123"
api_key = "sk-1234567890abcdef"
```

Expected results:
- **SQL Injection** (Critical, CWE-89, OWASP A03:2021)
- **Hardcoded Credentials** (Medium, CWE-798, OWASP A07:2021)
- **Hardcoded Secrets** (Medium, CWE-798)
- SOC2 control violations
- ISO 27001 non-conformities

### Test with GitHub URL

Try analyzing a public repository:
```
https://github.com/username/repository
```

The system will:
1. Fetch up to 50 code files from the repository
2. Analyze all files for vulnerabilities
3. Provide comprehensive security and compliance report

---

## 🏆 Key Features

1. **AI-Powered** - Groq llama-3.3-70b for intelligent analysis
2. **Comprehensive** - Security + SOC2 + ISO 27001 in one platform
3. **GitHub Integration** - Analyze entire repositories
4. **Production Ready** - Deployed on AWS Amplify, TypeScript, comprehensive error handling
5. **Export Options** - JSON, TXT, and CSV formats

---

## 📝 API Reference

### POST `/api/analysis/start`

**Start Analysis with Code:**
```json
{
  "code": "your code here",
  "options": {
    "security": true,
    "soc2": true,
    "certifications": true
  }
}
```

**Start Analysis with GitHub URL:**
```json
{
  "githubUrl": "https://github.com/owner/repo",
  "options": {
    "security": true,
    "soc2": true,
    "certifications": true
  }
}
```

**Check Status:**
```json
{
  "checkStatus": true,
  "sessionId": "uuid"
}
```

**Response:**
```json
{
  "sessionId": "uuid",
  "status": "running|completed|error",
  "progress": 45,
  "currentStage": 2,
  "results": {
    "security": {...},
    "soc2": {...},
    "iso27001": {...},
    "certifications": [...]
  }
}
```

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 15, React 18, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes (Serverless)
- **AI:** Groq (llama-3.3-70b), Perplexity (llama-3.1-sonar) fallback
- **Deployment:** AWS Amplify
- **Validation:** Zod schemas
- **Styling:** Tailwind CSS with custom tiger orange theme

---

## 🎯 Performance

- **Analysis Speed:** 10-30 seconds (depends on code size)
- **GitHub Fetch:** 5-15 seconds (up to 50 files)
- **AI Response:** 3-8 seconds per analysis type
- **Concurrent Users:** Scalable serverless architecture
- **Uptime:** 99.9% with dual AI fallback

---

## 📄 License

MIT License - Free to use and modify

---

## 🙏 Acknowledgments

- **Groq** for llama-3.3-70b-versatile AI model
- **Perplexity** for sonar models and fallback support
- **Next.js** team for the amazing framework
- **AWS Amplify** for seamless deployment
- **Tailwind CSS** for beautiful styling

---

## 📞 Support

- **Live Demo:** [https://master.d9l394ldrfout.amplifyapp.com/](https://master.d9l394ldrfout.amplifyapp.com/)
- **GitHub:** [https://github.com/Abhinandangithub01/Fortify](https://github.com/Abhinandangithub01/Fortify)
- **Issues:** Report bugs or request features via GitHub Issues

---

## 🚀 Roadmap

- [ ] Support for more programming languages
- [ ] GDPR compliance checking
- [ ] Integration with CI/CD pipelines
- [ ] Slack/Discord notifications
- [ ] Custom compliance frameworks
- [ ] API rate limiting and authentication

---

**Production Ready | AI-Powered | Compliance Focused** ✅
