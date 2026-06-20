# WhatToInsure — Implementation Plan

A free, unbiased, Singapore-focused insurance advisory web application that helps individuals understand what insurance coverage they need and how much, countering the problem of biased financial advisors and financial illiteracy.

## Summary of Decisions

| Decision | Choice |
|---|---|
| Platform | Responsive web application |
| Framework | Next.js (App Router) |
| Styling | Vanilla CSS with design tokens |
| Core UX | Guided step-by-step questionnaire wizard |
| Recommendation engine | Rule-based with Singapore-specific formulas |
| Insurance types | Life, Health (ISP), Critical Illness, Disability Income, PA, Hospitalization Cash, Long-term Care, Travel, Home |
| Product specificity | Product-agnostic (types & amounts only) |
| Government schemes | CPF, MediShield Life, CareShield Life factored into recommendations |
| Authentication | No login required (Phase 1) |
| Data privacy | Fully client-side — no data sent to servers |
| Output | Coverage gap analysis, recommendations with reasoning, priority ranking, budget allocation, red flags |
| Export | PDF download of recommendation report |
| Educational content | Dedicated learn section with articles |
| Monetization | Free initially, future ad/premium model |
| Language | English only |
| Design | Clean fintech style (Endowus/Syfe inspired), calm blues/greens |
| Deployment | Vercel |
| Legal | Disclaimer: general guidance, not licensed financial advice |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                    Next.js App                       │
│                                                     │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │ Landing   │  │ Questionnaire│  │   Results     │  │
│  │ Page      │  │ Wizard       │  │   Dashboard   │  │
│  └──────────┘  └──────┬───────┘  └───────┬───────┘  │
│                       │                  │           │
│                       ▼                  │           │
│              ┌────────────────┐          │           │
│              │ Recommendation │◄─────────┘           │
│              │ Engine (client)│                      │
│              └────────────────┘                      │
│                                                     │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │ Learn    │  │  PDF Export   │  │  Components   │  │
│  │ Section  │  │  (client)    │  │  Library      │  │
│  └──────────┘  └──────────────┘  └───────────────┘  │
└─────────────────────────────────────────────────────┘
         │
         ▼
    Vercel (hosting)
```

All computation is **client-side**. No backend database or API needed for Phase 1. The Next.js API routes are used only for server-side rendering and static generation of educational content.

---

## Project Structure

```
what-to-insure/
├── public/
│   ├── fonts/
│   └── images/
├── src/
│   ├── app/
│   │   ├── layout.js              # Root layout with metadata, fonts
│   │   ├── page.js                # Landing page
│   │   ├── globals.css            # Global styles + design tokens
│   │   ├── questionnaire/
│   │   │   └── page.js            # Questionnaire wizard page
│   │   ├── results/
│   │   │   └── page.js            # Results dashboard page
│   │   └── learn/
│   │       ├── page.js            # Learn hub (article listing)
│   │       └── [slug]/
│   │           └── page.js        # Individual article page
│   ├── components/
│   │   ├── ui/                    # Reusable UI primitives
│   │   │   ├── Button.js
│   │   │   ├── Card.js
│   │   │   ├── ProgressBar.js
│   │   │   ├── Tooltip.js
│   │   │   ├── Input.js
│   │   │   ├── Select.js
│   │   │   ├── RadioGroup.js
│   │   │   └── Slider.js
│   │   ├── layout/                # Layout components
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   └── Container.js
│   │   ├── landing/               # Landing page sections
│   │   │   ├── Hero.js
│   │   │   ├── HowItWorks.js
│   │   │   ├── WhyTrustUs.js
│   │   │   └── FAQ.js
│   │   ├── questionnaire/         # Wizard step components
│   │   │   ├── WizardShell.js
│   │   │   ├── StepDemographics.js
│   │   │   ├── StepFinancials.js
│   │   │   ├── StepDependents.js
│   │   │   ├── StepEmployment.js
│   │   │   ├── StepExistingCoverage.js
│   │   │   ├── StepHealth.js
│   │   │   ├── StepGoals.js
│   │   │   └── StepRiskTolerance.js
│   │   └── results/               # Results page components
│   │       ├── CoverageGapChart.js
│   │       ├── RecommendationCard.js
│   │       ├── PriorityList.js
│   │       ├── BudgetAllocation.js
│   │       ├── RedFlagAlert.js
│   │       └── ExportButton.js
│   ├── lib/
│   │   ├── engine/                # Recommendation engine
│   │   │   ├── index.js           # Main engine entry point
│   │   │   ├── lifeInsurance.js   # Life insurance calculations
│   │   │   ├── healthInsurance.js # Health/ISP recommendations
│   │   │   ├── criticalIllness.js # CI coverage calculations
│   │   │   ├── disability.js      # DII calculations
│   │   │   ├── accident.js        # PA recommendations
│   │   │   ├── hospitalization.js # Hospitalization cash
│   │   │   ├── longTermCare.js    # LTC recommendations
│   │   │   ├── travel.js          # Travel insurance
│   │   │   ├── home.js            # Home insurance
│   │   │   ├── budget.js          # Budget allocation logic
│   │   │   ├── priority.js        # Priority ranking logic
│   │   │   └── redFlags.js        # Red flag detection
│   │   ├── constants/
│   │   │   ├── singapore.js       # SG-specific constants (CPF rates, MediShield tiers, etc.)
│   │   │   └── insurance.js       # Insurance type definitions & metadata
│   │   ├── utils/
│   │   │   ├── formatters.js      # Currency, percentage formatters
│   │   │   └── validators.js      # Input validation
│   │   └── pdf/
│   │       └── generateReport.js  # PDF generation logic
│   ├── content/
│   │   └── articles/              # MDX or JSON articles for Learn section
│   │       ├── what-is-term-life.mdx
│   │       ├── ilp-traps.mdx
│   │       ├── medishield-life-explained.mdx
│   │       └── ...
│   └── hooks/
│       ├── useWizard.js           # Wizard state management
│       └── useRecommendations.js  # Hook to run engine
├── package.json
├── next.config.js
└── README.md
```

---

## Data Models

### User Profile (collected via questionnaire)

```js
{
  // Step 1: Demographics
  demographics: {
    age: Number,                    // 18-100
    gender: "male" | "female",
    residencyStatus: "citizen" | "pr" | "foreigner",
    maritalStatus: "single" | "married" | "divorced" | "widowed",
  },

  // Step 2: Financial Situation
  financials: {
    monthlyIncome: Number,          // gross monthly
    monthlyExpenses: Number,        // essential monthly expenses
    existingSavings: Number,        // total liquid savings
    existingInvestments: Number,    // total investment portfolio
    outstandingDebts: {
      homeLoan: Number,             // outstanding HDB/condo loan
      carLoan: Number,
      otherLoans: Number,
    },
    cpfBalances: {
      ordinary: Number,
      special: Number,
      medisave: Number,
    },
  },

  // Step 3: Dependents
  dependents: {
    hasChildren: Boolean,
    children: [{ age: Number }],
    supportingElderlyParents: Boolean,
    elderlyParentsCount: Number,
    spouseWorking: Boolean,
    spouseIncome: Number,           // if applicable
  },

  // Step 4: Employment
  employment: {
    type: "employed" | "self-employed" | "unemployed" | "student" | "retired",
    industry: String,               // for risk assessment
    hasEmployerInsurance: Boolean,
    employerBenefits: {
      groupLife: Number,            // coverage amount
      groupHealth: Boolean,         // has group health?
      groupCI: Number,
    },
  },

  // Step 5: Existing Insurance Coverage
  existingCoverage: {
    life: {
      hasCoverage: Boolean,
      totalCoverage: Number,        // sum assured
      type: "term" | "whole" | "ilp" | "mixed",
      annualPremium: Number,
    },
    health: {
      hasCoverage: Boolean,
      planType: "medishield-only" | "integrated-shield",
      shieldPlanTier: "basic" | "standard" | "enhanced" | "private",
      hasRider: Boolean,
    },
    criticalIllness: {
      hasCoverage: Boolean,
      totalCoverage: Number,
      type: "early-ci" | "multi-pay" | "standard",
    },
    disability: {
      hasCoverage: Boolean,
      monthlyBenefit: Number,
    },
    accident: { hasCoverage: Boolean, totalCoverage: Number },
    hospitalizationCash: { hasCoverage: Boolean, dailyAmount: Number },
    longTermCare: {
      hasCoverage: Boolean,
      hasCareshieldLife: Boolean,
      hasSupplementary: Boolean,
    },
    travel: { hasCoverage: Boolean },
    home: { hasCoverage: Boolean },
  },

  // Step 6: Health Status
  health: {
    smokingStatus: "non-smoker" | "smoker" | "ex-smoker",
    hasPreExistingConditions: Boolean,
    conditions: [String],           // list of conditions
    bmi: Number,                    // optional, for premium indication
  },

  // Step 7: Life Goals
  goals: {
    targetRetirementAge: Number,
    childrenEducationFund: Boolean,
    educationBudgetPerChild: Number,
    legacyPlanning: Boolean,
    legacyAmount: Number,
  },

  // Step 8: Risk Tolerance
  riskTolerance: "conservative" | "moderate" | "aggressive",
}
```

### Recommendation Output

```js
{
  // Overall summary
  summary: {
    overallScore: Number,            // 0-100 insurance health score
    totalCoverageGap: Number,        // total $ gap across all types
    monthlyBudgetRecommended: Number,// recommended monthly premium spend
    currentMonthlyPremiums: Number,  // what they're currently paying
  },

  // Per-insurance-type recommendations
  recommendations: [
    {
      type: "life" | "health" | "ci" | "disability" | ...,
      displayName: String,
      priority: 1-9,                 // 1 = most urgent
      status: "adequate" | "under-insured" | "over-insured" | "not-covered",
      currentCoverage: Number,
      recommendedCoverage: Number,
      coverageGap: Number,
      reasoning: String,             // human-readable explanation
      formula: String,               // the formula used (for transparency)
      tips: [String],                // actionable tips
      governmentSchemeNote: String,   // relevant CPF/MediShield info
    }
  ],

  // Red flags
  redFlags: [
    {
      severity: "warning" | "critical",
      title: String,
      description: String,
      affectedType: String,
    }
  ],

  // Budget allocation
  budgetAllocation: {
    totalRecommendedMonthly: Number,
    percentageOfIncome: Number,
    breakdown: [{ type: String, estimatedMonthlyPremium: Number }],
    withinGuideline: Boolean,        // within 10-15% of income
  },
}
```

---

## Key Recommendation Formulas (Singapore-Specific)

### Life Insurance Coverage
```
Recommended = (Annual Income × Years to Retirement)
            + Outstanding Debts (home loan + car loan + other)
            + Children Education Fund (per child × education budget)
            + Final Expenses ($20,000)
            - Existing Liquid Assets (savings + investments)
            - Existing Life Coverage
            - Employer Group Life Coverage
            - CPF Ordinary Account
```

### Critical Illness Coverage
```
Recommended = (Annual Income × 5 years)  // income replacement during recovery
            + Estimated Treatment Costs ($200,000 - $500,000 depending on risk tolerance)
            - Existing CI Coverage
            - Employer CI Coverage
            - MediSave (limited claim)
```

### Disability Income Insurance
```
Recommended Monthly Benefit = Monthly Income × 75%
                            - Existing DII benefit
                            - Employer disability benefit
Coverage Period: Until retirement age
```

### Health Insurance (Integrated Shield Plan)
```
Based on:
- Residency status (affects MediShield Life coverage)
- Age (affects premiums and coverage needs)
- Income level (determines affordable tier)
- Risk tolerance (conservative → higher tier, aggressive → basic tier)
Recommendation: Upgrade tier + rider assessment
```

### Budget Guideline
```
Total Insurance Premiums ≤ 10-15% of Monthly Income
Priority order determines which to get first if budget is constrained
```

---

## Phase Breakdown

---

### Phase 1: Project Foundation & Design System ✅ COMPLETE
**Estimated effort: 1-2 sessions | Assignable to: Agent A | Completed: 2026-06-20**

**Goal**: Set up the Next.js project, design system (CSS tokens, typography, colors), reusable UI components, and app shell (navbar, footer, routing).

#### Tasks

1. **Initialize Next.js project** with App Router
   - `npx -y create-next-app@latest ./` with appropriate flags
   - Configure `next.config.js`
   - Set up folder structure as defined above

2. **Design system in `globals.css`**
   - CSS custom properties for colors, spacing, typography, shadows, radii
   - Color palette: primary blue (#1A56DB → #3B82F6 range), accent teal/green (#059669 → #10B981 range), neutral grays, semantic colors (success, warning, danger)
   - Typography: Google Font `Inter` for body, `Outfit` for headings
   - Responsive breakpoints: mobile-first (375px, 768px, 1024px, 1280px)
   - Dark mode support via `prefers-color-scheme` (optional, nice-to-have)

3. **Build UI component library** (`src/components/ui/`)
   - `Button.js` — primary, secondary, ghost variants with hover/focus states
   - `Card.js` — elevated card with subtle shadow, hover animation
   - `ProgressBar.js` — for wizard progress tracking
   - `Input.js`, `Select.js`, `RadioGroup.js`, `Slider.js` — form controls
   - `Tooltip.js` — for contextual help text
   - Each component has its own CSS module or co-located styles

4. **Build layout components** (`src/components/layout/`)
   - `Navbar.js` — sticky top nav with logo, nav links (Home, Get Advice, Learn), mobile hamburger menu
   - `Footer.js` — links, legal disclaimer, copyright
   - `Container.js` — max-width wrapper with responsive padding

5. **Set up root layout** (`src/app/layout.js`)
   - HTML metadata (title, description, OG tags)
   - Font loading
   - Navbar + Footer wrapping

6. **Placeholder pages**
   - `/` — placeholder landing page
   - `/questionnaire` — placeholder
   - `/results` — placeholder
   - `/learn` — placeholder

#### Files to Create/Modify
| Action | File |
|--------|------|
| [NEW] | `src/app/layout.js` |
| [NEW] | `src/app/globals.css` |
| [NEW] | `src/app/page.js` |
| [NEW] | `src/app/questionnaire/page.js` |
| [NEW] | `src/app/results/page.js` |
| [NEW] | `src/app/learn/page.js` |
| [NEW] | `src/components/ui/Button.js` + `.module.css` |
| [NEW] | `src/components/ui/Card.js` + `.module.css` |
| [NEW] | `src/components/ui/ProgressBar.js` + `.module.css` |
| [NEW] | `src/components/ui/Input.js` + `.module.css` |
| [NEW] | `src/components/ui/Select.js` + `.module.css` |
| [NEW] | `src/components/ui/RadioGroup.js` + `.module.css` |
| [NEW] | `src/components/ui/Slider.js` + `.module.css` |
| [NEW] | `src/components/ui/Tooltip.js` + `.module.css` |
| [NEW] | `src/components/layout/Navbar.js` + `.module.css` |
| [NEW] | `src/components/layout/Footer.js` + `.module.css` |
| [NEW] | `src/components/layout/Container.js` + `.module.css` |
| [MODIFY] | `package.json` |
| [MODIFY] | `next.config.js` |

#### Verification
- `npm run dev` starts without errors
- All routes (`/`, `/questionnaire`, `/results`, `/learn`) render correctly
- UI components render with correct styling
- Responsive layout works at mobile, tablet, desktop breakpoints
- Lighthouse accessibility score ≥ 90

---

### Phase 2: Questionnaire Wizard
**Estimated effort: 2-3 sessions | Assignable to: Agent B**

**Goal**: Build the complete 8-step questionnaire wizard with smooth transitions, validation, and state management.

#### Dependencies
- Phase 1 must be complete (UI components and layout exist)

#### Tasks

1. **Wizard state management** (`src/hooks/useWizard.js`)
   - React `useReducer` for wizard state (current step, form data, validation errors)
   - Step navigation (next, previous, jump to step)
   - Form data persistence in `sessionStorage` (so users don't lose progress on refresh)
   - Input validation per step before advancing

2. **Wizard shell** (`src/components/questionnaire/WizardShell.js`)
   - Progress bar showing current step out of 8
   - Step title and description
   - Animated slide transitions between steps (CSS transitions)
   - Back / Next / Submit buttons
   - Step indicator (clickable to jump back to completed steps)

3. **Build each step component**:

   **Step 1: Demographics** (`StepDemographics.js`)
   - Age (number input with validation 18-100)
   - Gender (radio: male/female)
   - Residency status (radio: citizen/PR/foreigner) — with tooltip explaining impact
   - Marital status (radio: single/married/divorced/widowed)

   **Step 2: Financial Situation** (`StepFinancials.js`)
   - Monthly gross income (currency input)
   - Monthly essential expenses (currency input)
   - Existing savings (currency input)
   - Existing investments (currency input)
   - Outstanding debts section: home loan, car loan, other loans (currency inputs)
   - CPF balances: OA, SA, MediSave (currency inputs with tooltip explaining each)

   **Step 3: Dependents** (`StepDependents.js`)
   - Has children? (yes/no toggle)
   - If yes: dynamic list to add children with age inputs
   - Supporting elderly parents? (yes/no toggle)
   - If yes: how many parents
   - Spouse working? (yes/no, shown if married)
   - Spouse income (if applicable)

   **Step 4: Employment** (`StepEmployment.js`)
   - Employment type (radio: employed/self-employed/unemployed/student/retired)
   - Industry (select dropdown)
   - Has employer insurance benefits? (yes/no)
   - If yes: group life coverage amount, group health (yes/no), group CI coverage

   **Step 5: Existing Insurance** (`StepExistingCoverage.js`)
   - For each insurance type, a collapsible section:
     - Has coverage? (yes/no)
     - If yes: relevant details (coverage amount, type, premium)
   - Types: Life, Health/ISP, Critical Illness, Disability, Accident, Hospitalization Cash, Long-term Care, Travel, Home

   **Step 6: Health Status** (`StepHealth.js`)
   - Smoking status (radio: non-smoker/smoker/ex-smoker)
   - Pre-existing conditions? (yes/no)
   - If yes: multi-select common conditions or free text
   - Optional: height/weight for BMI

   **Step 7: Life Goals** (`StepGoals.js`)
   - Target retirement age (slider: 55-70, default 65)
   - Planning children's education fund? (yes/no, shown if has children)
   - Budget per child for education (currency input, if applicable)
   - Legacy planning? (yes/no)
   - Legacy amount (if applicable)

   **Step 8: Risk Tolerance** (`StepRiskTolerance.js`)
   - Visual risk scale with 3 options: conservative, moderate, aggressive
   - Each option shows a brief description of what it means for coverage
   - E.g., Conservative = higher coverage, higher premiums; Aggressive = lean coverage, lower premiums

4. **Input validation utilities** (`src/lib/utils/validators.js`)
   - Required field checks
   - Numeric range validation
   - Currency format validation
   - Cross-field validation (e.g., expenses < income)

5. **Currency formatting** (`src/lib/utils/formatters.js`)
   - Singapore dollar formatting (S$1,234.00)
   - Percentage formatting

#### Files to Create/Modify
| Action | File |
|--------|------|
| [NEW] | `src/hooks/useWizard.js` |
| [NEW] | `src/components/questionnaire/WizardShell.js` + `.module.css` |
| [NEW] | `src/components/questionnaire/StepDemographics.js` + `.module.css` |
| [NEW] | `src/components/questionnaire/StepFinancials.js` + `.module.css` |
| [NEW] | `src/components/questionnaire/StepDependents.js` + `.module.css` |
| [NEW] | `src/components/questionnaire/StepEmployment.js` + `.module.css` |
| [NEW] | `src/components/questionnaire/StepExistingCoverage.js` + `.module.css` |
| [NEW] | `src/components/questionnaire/StepHealth.js` + `.module.css` |
| [NEW] | `src/components/questionnaire/StepGoals.js` + `.module.css` |
| [NEW] | `src/components/questionnaire/StepRiskTolerance.js` + `.module.css` |
| [NEW] | `src/lib/utils/validators.js` |
| [NEW] | `src/lib/utils/formatters.js` |
| [MODIFY] | `src/app/questionnaire/page.js` |

#### Verification
- All 8 steps render correctly with proper form inputs
- Validation prevents advancing with invalid/missing data
- Back/next navigation works smoothly with slide animations
- Data persists across steps (state management)
- `sessionStorage` recovery works on page refresh
- Responsive layout at all breakpoints
- Tooltips display contextual help correctly
- Tab navigation and keyboard accessibility work

---

### Phase 3: Recommendation Engine
**Estimated effort: 2-3 sessions | Assignable to: Agent C**

**Goal**: Build the client-side recommendation engine that takes user profile data and produces personalized insurance recommendations.

#### Dependencies
- Phase 2 data model must be finalized (input schema)
- No UI dependency — this is pure logic

#### Tasks

1. **Singapore constants** (`src/lib/constants/singapore.js`)
   - CPF contribution rates by age group
   - MediShield Life coverage tiers and premiums
   - CareShield Life eligibility criteria and payouts
   - MediSave withdrawal limits for insurance
   - Average hospitalization costs by ward class
   - Common critical illness treatment costs
   - Education cost estimates (local university, polytechnic)

2. **Insurance type metadata** (`src/lib/constants/insurance.js`)
   - Display names, icons, descriptions for each insurance type
   - Priority base scores
   - Industry-standard coverage multipliers

3. **Individual insurance calculators**:

   **Life Insurance** (`src/lib/engine/lifeInsurance.js`)
   - Income replacement method calculation
   - Factor in dependents, debts, education funds, legacy
   - Deduct existing coverage, CPF, savings
   - Differentiate term vs whole life recommendation based on age/needs

   **Health Insurance** (`src/lib/engine/healthInsurance.js`)
   - Assess current MediShield Life coverage
   - Recommend ISP tier upgrade based on income and risk tolerance
   - Rider recommendation based on MediSave balance and risk tolerance
   - Factor in residency status (affects MediShield Life)

   **Critical Illness** (`src/lib/engine/criticalIllness.js`)
   - 3-5 year income replacement for recovery
   - Treatment cost buffer based on risk tolerance
   - Early CI vs multi-pay recommendation based on age
   - Deduct existing CI coverage

   **Disability Income** (`src/lib/engine/disability.js`)
   - 75% income replacement calculation
   - Factor in employment type (self-employed = higher priority)
   - Coverage until retirement age
   - Deduct existing DII

   **Personal Accident** (`src/lib/engine/accident.js`)
   - Based on industry risk level and lifestyle
   - Standard coverage recommendations

   **Hospitalization Cash** (`src/lib/engine/hospitalization.js`)
   - Based on ward class preference and daily income loss
   - Factor in ISP coverage gaps

   **Long-term Care** (`src/lib/engine/longTermCare.js`)
   - CareShield Life assessment (auto-enrolled for citizens/PRs born 1980+)
   - Supplementary coverage recommendation based on income and age
   - Factor in existing ElderShield

   **Travel Insurance** (`src/lib/engine/travel.js`)
   - Basic recommendation based on travel frequency
   - Annual vs per-trip guidance

   **Home Insurance** (`src/lib/engine/home.js`)
   - HDB Fire Insurance (mandatory for HDB owners with loan)
   - Content insurance recommendation based on property type

4. **Budget allocation** (`src/lib/engine/budget.js`)
   - Calculate total recommended premiums
   - Check against 10-15% income guideline
   - Suggest prioritization if over budget
   - Estimate monthly premiums per insurance type

5. **Priority ranking** (`src/lib/engine/priority.js`)
   - Score each insurance type based on:
     - Coverage gap severity
     - User's life stage
     - Dependent situation
     - Employment type
   - Sort by priority score

6. **Red flag detection** (`src/lib/engine/redFlags.js`)
   - ILP detection: flag if existing life insurance is ILP type
   - Over-insurance: flag if any type has coverage well above recommended
   - Under-insurance: flag critical gaps (e.g., no life insurance with dependents)
   - Premium overload: flag if existing premiums exceed 20% of income
   - Missing basics: flag if no health insurance beyond MediShield Life

7. **Main engine** (`src/lib/engine/index.js`)
   - Orchestrator that runs all calculators
   - Aggregates results into the Recommendation Output schema
   - Calculates overall insurance health score (0-100)

#### Files to Create/Modify
| Action | File |
|--------|------|
| [NEW] | `src/lib/constants/singapore.js` |
| [NEW] | `src/lib/constants/insurance.js` |
| [NEW] | `src/lib/engine/index.js` |
| [NEW] | `src/lib/engine/lifeInsurance.js` |
| [NEW] | `src/lib/engine/healthInsurance.js` |
| [NEW] | `src/lib/engine/criticalIllness.js` |
| [NEW] | `src/lib/engine/disability.js` |
| [NEW] | `src/lib/engine/accident.js` |
| [NEW] | `src/lib/engine/hospitalization.js` |
| [NEW] | `src/lib/engine/longTermCare.js` |
| [NEW] | `src/lib/engine/travel.js` |
| [NEW] | `src/lib/engine/home.js` |
| [NEW] | `src/lib/engine/budget.js` |
| [NEW] | `src/lib/engine/priority.js` |
| [NEW] | `src/lib/engine/redFlags.js` |

#### Verification
- Unit tests for each calculator with known input/output pairs
- Test edge cases: fresh graduate (age 22, no dependents, no coverage), sandwich generation (age 40, children + elderly parents, some coverage), retiree (age 65, no income)
- Verify Singapore-specific constants are accurate
- Budget allocation sums correctly
- Priority ranking produces sensible ordering
- Red flags trigger appropriately

---

### Phase 4: Results Dashboard & PDF Export
**Estimated effort: 2-3 sessions | Assignable to: Agent D**

**Goal**: Build the results page that visualizes recommendations, and the PDF export feature.

#### Dependencies
- Phase 1 (UI components)
- Phase 3 (recommendation engine outputs)

#### Tasks

1. **Recommendation hook** (`src/hooks/useRecommendations.js`)
   - Takes user profile from wizard (via `sessionStorage` or URL state)
   - Runs the recommendation engine
   - Returns computed results

2. **Results page** (`src/app/results/page.js`)
   - Overall insurance health score (animated circular gauge)
   - Summary section with key metrics
   - Sections for each recommendation type
   - Red flag alerts at the top
   - Budget allocation breakdown
   - Export button
   - "Start Over" and "Edit Answers" buttons

3. **Results components**:

   **Coverage Gap Chart** (`CoverageGapChart.js`)
   - Horizontal bar chart for each insurance type
   - Shows current coverage vs recommended coverage
   - Color coded: green (adequate), yellow (partial), red (not covered)
   - Built with CSS (no chart library needed) or lightweight chart lib

   **Recommendation Card** (`RecommendationCard.js`)
   - Card per insurance type
   - Shows: type name, priority badge, status indicator, current vs recommended coverage
   - Expandable: reasoning, formula used, tips, government scheme notes
   - Visual priority indicator (1-9)

   **Priority List** (`PriorityList.js`)
   - Ordered list of insurance types by priority
   - Visual numbering with urgency indicators
   - Brief description of why each is ranked where it is

   **Budget Allocation** (`BudgetAllocation.js`)
   - Donut/pie chart showing premium breakdown by type
   - Total monthly premium vs income percentage
   - Warning if over guideline

   **Red Flag Alert** (`RedFlagAlert.js`)
   - Prominent alert banners for critical issues
   - Warning vs critical styling
   - Clear description and affected insurance type

4. **PDF Export** (`src/lib/pdf/generateReport.js`)
   - Use a client-side PDF library (e.g., `jsPDF` or `@react-pdf/renderer`)
   - Generate a formatted report with:
     - Header: WhatToInsure branding + date
     - User profile summary (non-sensitive details)
     - Overall score
     - Coverage gap summary table
     - Detailed recommendations per type
     - Red flags
     - Budget allocation
     - Disclaimer
   - Download triggers via browser

5. **Export Button** (`ExportButton.js`)
   - "Download PDF Report" button
   - Loading state during generation
   - Success feedback

#### Files to Create/Modify
| Action | File |
|--------|------|
| [NEW] | `src/hooks/useRecommendations.js` |
| [NEW] | `src/components/results/CoverageGapChart.js` + `.module.css` |
| [NEW] | `src/components/results/RecommendationCard.js` + `.module.css` |
| [NEW] | `src/components/results/PriorityList.js` + `.module.css` |
| [NEW] | `src/components/results/BudgetAllocation.js` + `.module.css` |
| [NEW] | `src/components/results/RedFlagAlert.js` + `.module.css` |
| [NEW] | `src/components/results/ExportButton.js` + `.module.css` |
| [NEW] | `src/lib/pdf/generateReport.js` |
| [MODIFY] | `src/app/results/page.js` |
| [MODIFY] | `package.json` (add jsPDF or equivalent) |

#### Verification
- Results page renders correctly with sample data
- All charts/visualizations display accurately
- Recommendation cards expand/collapse smoothly
- Priority ordering matches engine output
- Red flags display prominently
- PDF generates correctly with all sections
- PDF downloads successfully in Chrome, Firefox, Safari
- Responsive layout works (especially charts)
- Smooth transition from questionnaire completion to results

---

### Phase 5: Landing Page, Learn Section & Polish
**Estimated effort: 2-3 sessions | Assignable to: Agent E**

**Goal**: Build the landing page, educational content section, and final polish.

#### Dependencies
- Phase 1 (layout and UI components)
- Phases 2-4 should be complete for end-to-end flow testing

#### Tasks

1. **Landing page** (`src/app/page.js`)

   **Hero Section** (`Hero.js`)
   - Headline: "Know What Insurance You Actually Need"
   - Subheadline: "Free, unbiased, personalized insurance advice for Singaporeans. No sales pitch. No hidden agenda."
   - CTA button: "Get Your Free Advice" → `/questionnaire`
   - Visual: abstract illustration or animated graphic (generated)
   - Trust badges: "100% Free", "No Login Required", "Your Data Stays Private"

   **How It Works** (`HowItWorks.js`)
   - 3-step visual flow:
     1. "Tell Us About You" — answer simple questions about your life situation
     2. "Get Personalized Advice" — our engine calculates your exact coverage needs
     3. "Take Action Confidently" — download your report and make informed decisions
   - Animated step icons

   **Why Trust Us** (`WhyTrustUs.js`)
   - Key differentiators:
     - "We don't sell insurance" — no commissions, no product recommendations
     - "Your data never leaves your browser" — client-side processing
     - "Transparent formulas" — we show you exactly how we calculated each recommendation
     - "Singapore-specific" — built for our unique CPF, MediShield, HDB landscape
   - Icon cards with subtle hover animations

   **FAQ Section** (`FAQ.js`)
   - Accordion-style FAQ
   - Common questions: Is this really free? Is my data safe? Who built this? etc.

2. **Learn Section** (`src/app/learn/`)

   **Article listing page** (`page.js`)
   - Grid of article cards with title, excerpt, category tag, read time
   - Category filters (Insurance Basics, Common Traps, Singapore Schemes, etc.)

   **Individual article pages** (`[slug]/page.js`)
   - MDX rendering with rich formatting
   - Table of contents sidebar
   - Related articles at bottom

   **Initial articles to write** (content in `src/content/articles/`):
   - "What Is Term Life Insurance and Why It's Usually Better Than Whole Life"
   - "The ILP Trap: Why Investment-Linked Policies Rarely Make Sense"
   - "MediShield Life Explained: What's Covered and What's Not"
   - "Understanding Integrated Shield Plans in Singapore"
   - "Critical Illness Insurance: How Much Coverage Do You Really Need?"
   - "CareShield Life vs ElderShield: What Changed and What It Means For You"
   - "How Much Insurance Is Enough? A Simple Framework"
   - "5 Red Flags That Your Financial Advisor Is Prioritizing Commission Over Your Needs"

3. **SEO & Metadata**
   - Proper `<title>` and `<meta description>` for every page
   - Open Graph tags for social sharing
   - Structured data (JSON-LD) for FAQ page
   - Sitemap generation
   - robots.txt

4. **Legal Disclaimer**
   - Footer disclaimer text
   - Dedicated disclaimer modal on first visit (or at results page)
   - Terms of use page (simple)

5. **Final Polish**
   - Page transition animations
   - Loading states and skeleton screens
   - Error boundaries and fallback UI
   - 404 page
   - Favicon and app icons
   - Performance optimization (image optimization, code splitting)

#### Files to Create/Modify
| Action | File |
|--------|------|
| [NEW] | `src/components/landing/Hero.js` + `.module.css` |
| [NEW] | `src/components/landing/HowItWorks.js` + `.module.css` |
| [NEW] | `src/components/landing/WhyTrustUs.js` + `.module.css` |
| [NEW] | `src/components/landing/FAQ.js` + `.module.css` |
| [NEW] | `src/app/learn/[slug]/page.js` |
| [NEW] | `src/content/articles/*.mdx` (8 articles) |
| [MODIFY] | `src/app/page.js` |
| [MODIFY] | `src/app/learn/page.js` |
| [MODIFY] | `src/app/layout.js` (SEO metadata) |
| [NEW] | `public/sitemap.xml` |
| [NEW] | `public/robots.txt` |

#### Verification
- Landing page looks polished and professional
- All animations are smooth (60fps)
- CTA buttons navigate correctly
- Learn articles render with proper formatting
- SEO: Lighthouse SEO score ≥ 95
- Accessibility: Lighthouse score ≥ 90
- Performance: Lighthouse score ≥ 90
- End-to-end flow: Landing → Questionnaire → Results → PDF export works seamlessly
- Mobile experience is excellent
- Legal disclaimer displays appropriately

---

## Phase Summary

| Phase | Name | Key Deliverable | Dependencies | Effort |
|-------|------|----------------|--------------|--------|
| 1 | Foundation & Design System | Project setup, UI components, routing | None | 1-2 sessions |
| 2 | Questionnaire Wizard | 8-step data collection wizard | Phase 1 | 2-3 sessions |
| 3 | Recommendation Engine | Client-side rule-based engine | Phase 2 (data model only) | 2-3 sessions |
| 4 | Results Dashboard & PDF | Results visualization + export | Phase 1, 3 | 2-3 sessions |
| 5 | Landing, Learn & Polish | Landing page, articles, SEO, polish | Phase 1 (Phases 2-4 for e2e) | 2-3 sessions |

> [!NOTE]
> **Phases 2 and 3 can run in parallel** since Phase 3 only depends on the data model schema (defined above), not the actual wizard UI. Similarly, **Phase 5 can partially overlap** with Phases 2-4, especially the landing page and educational content.

> [!IMPORTANT]
> **For agents picking up individual phases**: Always read the full data model definitions (User Profile and Recommendation Output) above, as these are the contracts between phases. Do not modify the data model without updating this plan.

---

## Future Enhancements (Post-MVP)

These are out of scope for the initial 5 phases but are worth planning for:

- **User accounts** — save and revisit recommendations, track coverage changes over time
- **AI chatbot** — answer insurance questions in natural language
- **Product comparison** — optional database of actual SG insurance products for browsing
- **Community features** — anonymous reviews of financial advisors
- **Monetization** — tasteful ads, premium features, or affiliate partnerships
- **Multi-language support** — Chinese, Malay translations
- **Mobile app** — React Native wrapper for app store distribution
- **Annual review reminders** — email notifications to re-assess coverage yearly
