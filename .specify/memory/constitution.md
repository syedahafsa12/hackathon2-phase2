<!--
Sync Impact Report:
- Version change: Initial → 1.0.0
- Ratification date: 2025-12-14 (today)
- Last amended: 2025-12-14 (today)
- Modified principles: N/A (initial creation)
- Added sections: All principles defined for competition-winning Phase II
- Removed sections: N/A (initial creation)
- Templates requiring updates:
  ✅ plan-template.md - Aligned with competition strategy and excellence principles
  ✅ spec-template.md - Aligned with production-grade quality standards
  ✅ tasks-template.md - Aligned with spec-driven development workflow
  ✅ All command templates - Verified consistency with constitution
- Follow-up TODOs: None - all placeholders filled with concrete values
-->

# Phase II Full-Stack Todo Application - Competition Constitution

## Core Principles

### I. Competition Excellence - Exceed All Requirements by 200%

Every decision, every line of code, every design choice MUST be optimized for winning 1st place in Hackathon II.

**Non-Negotiable Rules**:
- Implement ALL 5 basic requirements (signup, login, CRUD, multi-user) flawlessly with zero bugs
- Add minimum 8 advanced features beyond requirements (priorities, tags, search, filter, bulk ops, stats, due dates, dark mode)
- Target judging criteria: Functionality 40/40, Code Quality 20/20, UI/UX 19/20, Innovation 9/10, Presentation 10/10 = 98/100 points
- Every feature MUST have a specification written before implementation
- Zero runtime errors or crashes allowed in demo
- Professional UI that looks like a $100k product, not a hackathon project

**Rationale**: The competition evaluates completeness, quality, innovation, and presentation. Basic implementations will not win. We dominate by delivering production-grade quality across all judging dimensions while competitors deliver "just enough."

---

### II. Spec-Driven Development - All Features Must Have Specifications

No code is written without a complete specification defining requirements, acceptance criteria, and user value.

**Non-Negotiable Rules**:
- Every feature MUST have a spec.md file in `.specify/` before implementation begins
- Specs MUST include: user scenarios, functional requirements, acceptance criteria, success metrics
- Changes to features MUST update specs first, then code
- Use `/speckit.specify` to create specs, `/speckit.plan` to design implementation, `/speckit.tasks` to break down work
- AI implementation via `/speckit.implement` follows specs exactly
- No feature creep - if it's not in the spec, it's not implemented (unless spec is updated first)

**Rationale**: Spec-driven development prevents scope creep, ensures clear requirements, enables parallel work, and demonstrates architectural thinking to judges. Competitors who code-first will miss requirements and deliver inconsistent features.

---

### III. Production-Grade Code Quality - Launch-Ready from Day One

Write code as if launching to 1 million users tomorrow. No hackathon shortcuts, no technical debt, no "we'll fix it later."

**Non-Negotiable Rules**:

**Frontend**:
- TypeScript strict mode enabled, zero `any` types allowed
- Component architecture follows atomic design (atoms, molecules, organisms)
- All user inputs validated with Zod schemas
- Error boundaries catch all errors gracefully
- Loading states use skeleton screens (not spinners)
- Optimistic updates for all mutations (instant UI feedback)
- Code splitting and lazy loading for performance
- Accessibility WCAG 2.1 AA compliant (keyboard nav, ARIA labels, 4.5:1 contrast)

**Backend**:
- FastAPI with async/await everywhere, dependency injection pattern
- Pydantic models for all request/response validation
- Database indexes on all foreign keys and frequently queried columns
- Rate limiting: 5 login attempts per 15 min, 3 signups per hour, 100 API calls per minute
- Input sanitization prevents XSS, SQL injection, NoSQL injection
- Structured logging with request IDs for debugging
- Proper HTTP status codes and detailed error messages
- Auto-generated OpenAPI docs at /docs endpoint

**Database**:
- Fully normalized schema with proper foreign keys and cascades
- NOT NULL, UNIQUE, CHECK constraints enforced
- Timestamps (created_at, updated_at) on all tables
- Alembic migrations for all schema changes, rollback tested
- Connection pooling (min=10, max=50) for performance

**Rationale**: Judges evaluate code quality heavily (20% of score). Production-grade code demonstrates expertise, separates us from competitors who take shortcuts. Quality code also prevents bugs during demo.

---

### IV. Performance-First - Sub-Second Response Times Everywhere

Users expect instant responses. Optimize for perceived and actual performance from the start.

**Non-Negotiable Rules**:
- API response time MUST be <500ms at p95 (verified with DevTools Network tab)
- Page load time MUST be <2 seconds (verified with Lighthouse)
- Lighthouse Performance score MUST be >90 in production
- Animations MUST run at 60fps (GPU-accelerated transforms, no jank)
- Optimistic updates create instant UI feedback (sync in background)
- Debounced search (300ms delay) prevents API spam
- Virtual scrolling supports 1000+ tasks smoothly
- Code splitting reduces initial bundle to <200KB
- Images optimized (WebP format, lazy loading, Next.js Image component)

**Rationale**: Performance is part of UI/UX score (20%). Slow apps frustrate judges and look unprofessional. Competitors often neglect performance until it's too late. We optimize from day one.

---

### V. Mobile-First Responsive Design - Perfect Experience on Every Device

Design for mobile first (320px width), then progressively enhance for tablet and desktop.

**Non-Negotiable Rules**:
- All layouts MUST work perfectly on mobile (iPhone), tablet (iPad), desktop (1440px+)
- Touch targets MUST be minimum 44x44px on mobile
- Text MUST be readable without zooming (minimum 16px base font)
- No horizontal scrolling on any device at any breakpoint
- Single-column layout on mobile, multi-column on desktop
- Floating action buttons within thumb reach on mobile
- Test on Chrome DevTools mobile view before considering feature complete
- Responsive design showcased in demo video (show mobile view)

**Rationale**: Mobile-first is modern best practice. Judges will test on multiple devices. Competitors who design desktop-first will have awkward mobile experiences. We deliver pixel-perfect responsive design.

---

### VI. Security-First - Enterprise-Grade Protection

Implement security as if handling financial data, not todo items. Prevent all OWASP Top 10 vulnerabilities.

**Non-Negotiable Rules**:
- Passwords hashed with bcrypt cost factor 12 (never plain text, never logged)
- JWT tokens expire in 7 days, verified on every request, secure random secret (256-bit)
- Rate limiting prevents brute force: 5 login attempts per 15 min, 3 signups per hour
- Input validation on frontend AND backend (never trust client)
- Parameterized queries only (prevents SQL injection)
- Output escaping prevents XSS (React does this by default, verify)
- CORS whitelist only trusted domains (localhost:3000 in dev, Vercel URL in prod)
- Security headers: X-Frame-Options DENY, X-Content-Type-Options nosniff, Strict-Transport-Security
- HTTPS required in production (Vercel/Railway enforce this)
- Multi-user data isolation enforced at database query level (WHERE user_id = ?)

**Rationale**: Security demonstrates professional competence. Competitors often ignore security until vulnerability found. We implement enterprise security from start, showcase in README/docs.

---

### VII. User Experience Excellence - Delight in Every Interaction

Every user action should feel smooth, intuitive, and delightful. Sweat the small details.

**Non-Negotiable Rules**:
- Smooth 60fps animations using Framer Motion (page transitions, modals, lists, checkboxes)
- Toast notifications for all user actions (success: green, error: red, info: blue)
- Beautiful empty states with illustrations and helpful messages
- Friendly error messages that guide users (not technical jargon or stack traces)
- Micro-interactions on hover (button scale 1.05x, shadow elevation, card lift)
- Keyboard shortcuts for power users (/, n, Escape, Ctrl+Enter, ?)
- Dark mode toggle with smooth transition and localStorage persistence
- Loading states with skeleton screens (match final layout, shimmer effect)
- Confirmation modals for destructive actions (delete tasks)
- Accessibility: keyboard navigation, ARIA labels, screen reader friendly

**Rationale**: UI/UX is 20% of judging score. Delightful experiences impress judges and demonstrate attention to detail. Competitors focus on functionality; we deliver both functionality AND exceptional UX.

---

### VIII. AI-First Development - Claude Code as Primary Implementation Tool

Leverage Claude Code's capabilities for rapid, high-quality implementation following specs.

**Non-Negotiable Rules**:
- Use `/speckit.specify` to write comprehensive feature specifications
- Use `/speckit.plan` to create detailed implementation plans
- Use `/speckit.tasks` to break plans into actionable task lists
- Use `/speckit.implement` to execute tasks using Claude Code
- Claude Code MUST follow specs exactly (no deviations without spec update)
- Human reviews specs/plans, Claude Code implements per spec
- Iterative refinement: spec → plan → tasks → implement → test → refine
- All AI-generated code MUST meet constitution quality standards

**Rationale**: Claude Code accelerates development while maintaining quality. Proper spec-driven workflow ensures AI generates code that meets requirements. Competitors coding manually will be slower and less consistent.

---

### IX. Deployment Excellence - Production-Ready from First Deploy

Deploy early, deploy often. Treat every deployment as production-ready.

**Non-Negotiable Rules**:

**Frontend (Vercel)**:
- Auto-deploy on push to main branch
- Environment variables configured in dashboard (NEXT_PUBLIC_API_URL)
- Preview deployments for PRs (optional, not required for hackathon)
- Health check: frontend accessible via public URL
- Build completes in <2 minutes
- Zero build errors or warnings

**Backend (Railway)**:
- Auto-deploy on push to main branch
- Environment variables secured in dashboard (DATABASE_URL, JWT_SECRET, CORS_ORIGINS, ENVIRONMENT=production)
- /health endpoint returns 200 OK with database connection verified
- Logging enabled and accessible
- Monitoring dashboard shows uptime
- Rollback procedure documented in README

**Database (Neon)**:
- Connection pooling enabled (pgbouncer)
- Daily backups enabled (Neon automatic)
- All migrations applied successfully
- Foreign keys and indexes created
- Query performance monitored

**Rationale**: Deploy on Day 1 to catch issues early. Competitors who deploy last-minute face unexpected failures. We deploy early, iterate, and ensure rock-solid production readiness.

---

### X. Documentation & Presentation - Show, Don't Just Tell

Comprehensive documentation and spectacular demo video maximize presentation score.

**Non-Functional Rules**:

**README.md**:
- Compelling hero section with project description
- Tech stack table with versions and rationale
- Setup instructions (one-command setup script)
- Environment variables table with descriptions
- Architecture diagram showing frontend, backend, database
- Deployment guide (Vercel, Railway, Neon)
- Troubleshooting section (common issues and solutions)
- Screenshots/GIFs showcasing key features
- Link to live demo (Vercel URL)
- Link to API docs (Railway /docs endpoint)

**API Documentation**:
- Swagger UI at /docs with all endpoints documented
- Request/response examples for each endpoint
- Error codes and messages documented
- Authentication requirements specified
- Rate limiting policies explained

**Demo Video (90 seconds)**:
- 0-5s: Hook ("Watch me build a production-grade todo app")
- 5-10s: Login with smooth animation
- 10-20s: Create tasks with tags, priorities, categories
- 20-30s: Search, filter, sort in action (fast!)
- 30-40s: Bulk operations, drag & drop reordering
- 40-50s: Mobile responsive demo (show phone view)
- 50-60s: Dark mode toggle, keyboard shortcuts
- 60-70s: Show code structure, API docs, specs/
- 70-80s: Performance: Sub-second response times
- 80-90s: Closing: "Deployed, tested, production-ready"
- Professional production: music, overlays, transitions, 1080p quality

**Rationale**: Presentation is 10% of score, but often determines winner among close competitors. Spectacular demo and comprehensive docs separate 1st place from 2nd place.

---

## Additional Standards

### Code Organization

**Monorepo Structure**:
```
phase2/
├── frontend/              # Next.js application
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── lib/              # Utilities, hooks, types
│   └── public/           # Static assets
├── backend/              # FastAPI application
│   ├── app/              # Application code
│   │   ├── models/       # SQLModel database models
│   │   ├── routers/      # API route handlers
│   │   ├── schemas/      # Pydantic request/response schemas
│   │   └── utils/        # Utilities (auth, JWT, deps)
│   └── alembic/          # Database migrations
├── .specify/             # Specification files
│   ├── memory/           # Constitution, guidance
│   └── templates/        # Spec, plan, task templates
├── specs/                # Feature specifications
│   └── 002-full-stack-web-app/
│       ├── spec.md       # Feature specification
│       ├── plan.md       # Implementation plan
│       └── tasks.md      # Task breakdown
└── README.md             # Project documentation
```

**Rationale**: Clean organization enables parallel work, clear boundaries, and easy navigation. Judges appreciate well-organized codebases.

---

### Testing Strategy

**Manual Testing Required** (automated tests optional for Phase II):
- User flow testing: Signup → Login → Create task → Update → Delete → Logout
- Multi-user isolation: Two browsers, two accounts, verify data isolation
- Mobile responsive: Chrome DevTools mobile view (iPhone, iPad)
- Performance: Lighthouse audit in production (>90 score)
- Security: Rate limiting verification, SQL injection attempts, XSS attempts
- Accessibility: axe DevTools, keyboard navigation, screen reader
- Error handling: Network offline, invalid inputs, server errors

**Rationale**: Manual testing sufficient for 2-day hackathon. Automated tests take time to write and maintain. Focus on feature delivery and polish, validate manually.

---

### Git Workflow

**Commit Strategy**:
- Meaningful commit messages: "feat: add task creation endpoint", "fix: rate limiting on login"
- Commit after each completed task or logical group
- Never commit secrets (.env files in .gitignore)
- Push to main triggers auto-deploy (Vercel + Railway)

**Branch Strategy** (optional for solo, required for team):
- main: production-ready code
- feature/[name]: feature branches (optional for hackathon)
- Merge to main only when feature complete and tested

**Rationale**: Clean Git history shows professionalism. Auto-deploy on push accelerates iteration.

---

## Governance

### Constitution Authority

This constitution supersedes all other development practices, documentation, or verbal agreements. When in doubt, refer to these principles.

**Amendment Process**:
1. Propose amendment with rationale
2. Update constitution.md with version bump
3. Update dependent templates (plan, spec, tasks)
4. Document changes in Sync Impact Report
5. Commit with message: "docs: amend constitution to vX.Y.Z (change description)"

**Version Bump Rules**:
- MAJOR (X.0.0): Backward incompatible principle removals or redefinitions
- MINOR (X.Y.0): New principle added or materially expanded guidance
- PATCH (X.Y.Z): Clarifications, wording fixes, non-semantic refinements

**Compliance Review**:
- All PRs/code reviews MUST verify compliance with constitution principles
- Complexity MUST be justified against principles (Production-Grade, Performance-First)
- Feature decisions MUST align with Competition Excellence principle
- Any deviation from constitution MUST be documented with rationale

**Runtime Guidance**:
- This constitution is the source of truth for project governance
- For runtime development guidance, see plan.md and spec.md for specific features
- For implementation tasks, see tasks.md for actionable breakdown
- For AI implementation, use `/speckit.implement` which enforces constitution compliance

---

## Success Definition - Phase II Completion Criteria

Phase II is COMPETITION-READY and can be submitted when ALL criteria met:

**Functional Completeness** (40% of judging score):
- ✅ User signup with email/password, validation, bcrypt hashing
- ✅ User login with JWT token, rate limiting (5 per 15 min)
- ✅ Create task with title, description, priority, category, tags, due date
- ✅ View all tasks, filtered by user_id, sorted by created_at
- ✅ Update any task field, optimistic UI update
- ✅ Delete task with confirmation modal
- ✅ Mark task complete/incomplete with checkbox animation
- ✅ Multi-user data isolation verified (two users cannot see each other's tasks)
- ✅ 8+ advanced features: priorities, tags, categories, search, filter, sort, bulk ops, stats, due dates, dark mode, keyboard shortcuts
- ✅ Zero runtime errors or crashes during demo

**Code Quality** (20% of judging score):
- ✅ TypeScript strict mode, zero `any` types
- ✅ Comprehensive specs in `.specify/` for all features
- ✅ Clean monorepo structure (frontend/, backend/, specs/)
- ✅ Error handling for network, validation, server errors
- ✅ Meaningful Git commits, no commented code, no console.log in production
- ✅ Environment variables documented in README, .env.example provided

**UI/UX** (20% of judging score):
- ✅ Professional design (Tailwind CSS, consistent color scheme)
- ✅ Smooth 60fps animations (Framer Motion)
- ✅ Mobile-perfect responsive (tested on iPhone, iPad, desktop)
- ✅ Beautiful empty states with illustrations
- ✅ Helpful error messages (not technical jargon)
- ✅ Loading states with skeleton screens
- ✅ Toast notifications for all actions
- ✅ Dark mode toggle with persistence
- ✅ Keyboard shortcuts (/, n, Escape, Ctrl+Enter, ?)
- ✅ Accessibility WCAG 2.1 AA (keyboard nav, ARIA labels, 4.5:1 contrast)

**Innovation** (10% of judging score):
- ✅ Optimistic updates (instant UI feedback)
- ✅ Rate limiting (security beyond requirements)
- ✅ Statistics dashboard (visual progress tracking)
- ✅ Bulk operations (select multiple, delete/complete all)
- ✅ Dark mode (theme toggle)
- ✅ Keyboard shortcuts (power user features)
- ✅ Debounced search (performance optimization)
- ✅ Advanced filtering (multiple criteria combined)

**Presentation** (10% of judging score):
- ✅ Comprehensive README with setup guide, tech stack, screenshots
- ✅ API documentation (Swagger UI at /docs)
- ✅ Spectacular 90-second demo video (professional quality, all features showcased)
- ✅ Performance demonstrated (Lighthouse score, Network tab)
- ✅ Mobile view shown in demo
- ✅ Code structure highlighted (specs/, monorepo)

**Deployment**:
- ✅ Frontend deployed to Vercel, accessible via public URL
- ✅ Backend deployed to Railway, /health returns 200 OK
- ✅ Database on Neon, connected and working
- ✅ All environment variables configured
- ✅ HTTPS enabled (Vercel/Railway default)
- ✅ Auto-deploy on push to main

**Performance**:
- ✅ API response time <500ms (p95, verified with DevTools)
- ✅ Page load time <2 seconds (verified with Lighthouse)
- ✅ Lighthouse Performance >90 (production URL)
- ✅ Smooth 60fps animations (no jank)

**Security**:
- ✅ JWT authentication working (token issued, verified, expires in 7 days)
- ✅ Passwords bcrypt hashed (cost factor 12)
- ✅ Rate limiting active (login, signup, API calls)
- ✅ Input validation (frontend and backend, Pydantic/Zod)
- ✅ SQL injection prevented (parameterized queries)
- ✅ XSS prevented (output escaping)
- ✅ CORS configured (whitelist only frontend domain)

**When ALL above criteria met**: Submit to Hackathon II with confidence in 1st place victory! 🏆

---

**Version**: 1.0.0 | **Ratified**: 2025-12-14 | **Last Amended**: 2025-12-14
