# Business Knowledge — Dutch SME Lending

## Dutch SME lending market structure

### Banks
The four major Dutch banks dominate SME lending by volume:
- **ING:** Largest SME lender by market share. Known for automated decisioning on smaller tickets, strong digital application experience, Teal brand identity.
- **Rabobank:** Dominant in agriculture and food sector, strong cooperative roots, significant SME market share across all sectors. Red brand identity. Particularly strong in regional/rural markets.
- **ABN AMRO:** Traditional corporate bank with significant SME portfolio. Strong trade finance and international capabilities. Green/yellow brand identity.
- **Triodos:** Niche sustainable lender. Only funds businesses with clear positive impact. Strict sector exclusions. Green brand identity.

### Alternative lenders
- **Qredits:** Social enterprise, specialises in micro-lending (<€250K) to starters and SMEs rejected by banks. Government-backed. Important safety net in the market.
- **October (formerly Lendix NL):** European P2P lending platform. SME loans €30K–€5M. Institutional and retail investor funding. Strong UX, known for fast decisioning on mid-market tickets.
- **Funding Circle NL:** UK-based platform with Dutch operations. Focus on established SMEs, data-driven decisioning.
- **Fintech challengers:** Iwoca (working capital), Spotcap (revenue-based), Liberis (merchant cash advance), Solaris Bank (embedded). Growing market share in micro and small segments.

### Embedded lending
Banks and lenders embed credit offers within accounting software (Exact, Twinfield, Moneybird), e-commerce platforms (Shopify Capital NL), and payment processors (Adyen, Mollie). UX in embedded contexts is very different — no full application flow, pre-populated from platform data, one-click in optimal cases.

---

## SME loan product types

**Working capital line (rekening-courantkrediet)**
A revolving credit facility for day-to-day cash flow management. The business draws down and repays as needed within an agreed limit. Pricing: typically EURIBOR + spread, applied to outstanding balance daily. Assessment focuses on cash flow cycle, debtor quality, and seasonal patterns. UX: the account is always open; the UX is about the limit application and annual review, not individual drawdowns.

**Term loan (termijnlening)**
A fixed loan repaid on a schedule over a defined term. The most common SME lending product. Variants: linear amortisation (equal principal instalments), annuity (equal total instalments), bullet (interest-only with principal at end). Purpose: investment (equipment, property, acquisition), expansion, refinancing. Assessment focuses on repayment capacity from projected cash flows.

**Invoice financing (factoring / debtors finance)**
The business sells its outstanding invoices to the lender at a discount. Provides immediate cash against receivables. Not a traditional loan — no fixed term, no amortisation. Two variants: whole-turnover (all invoices go to lender) and selective (pick specific invoices). Assessment focuses on debtor quality, invoice authenticity, sector (some sectors excluded). Useful for fast-growing businesses with working capital gaps.

**Asset finance (leasing / hire purchase)**
Finance for specific physical assets (machinery, vehicles, equipment). The asset is often the security. Two forms: operating lease (asset stays on lender's balance sheet) and finance lease/hire purchase (asset transfers to borrower). Assessment includes asset valuation and residual value assumptions. Common in construction, manufacturing, transport.

**Acquisition finance**
Finance for buying a business or business assets. Typically larger ticket (€500K+). Complex structure, often involving earnout arrangements, vendor loans, and management equity. High documentation requirement. Multi-party (buyer, vendor, management, lender, lawyers).

---

## Loan size segments

**Micro (<€25K)**
Typically fully automated decisioning. Minimal documentation (KVK data + bank account data via open banking or 3 months statements). Decision in minutes to hours. High volume, low touch. Products: working capital, small equipment. Lenders: Qredits, Iwoca, embedded fintech. Key risk: fraud, because verification is lightweight.

**Small (€25K–€250K)**
Semi-automated decisioning, RM involvement for relationship accounts, data-driven for platform lenders. Documentation: 1–2 years annual accounts, 6 months bank statements. Decision: 1–5 business days. Products: all standard SME products. This is the primary prototyping focus for this workspace.

**Mid-market (€250K–€2.5M)**
RM-led, credit analyst involved, often credit committee for larger amounts. Documentation: 2–3 years annual accounts, management accounts, detailed business plan, collateral valuation. Decision: 5–15 business days. Products: term loans, acquisition finance, property. High relationship value — pricing and terms are partly negotiated.

---

## Typical pricing

**Reference rates:** Business lending in the Netherlands is priced against EURIBOR (typically 1-month, 3-month, or 6-month). As of 2024, EURIBOR has been at elevated levels (3.5–4.0%) following ECB rate rises. Rates will evolve — prototypes should use a configurable reference rate, not a hardcoded number.

**Spreads:** Applied on top of EURIBOR, reflecting credit risk. Typical ranges:
- Lowest risk (established business, strong accounts, property security): 100–200bps
- Standard risk: 200–400bps
- Higher risk / alternative lender: 400–900bps
- Micro lending / Qredits: fixed rates 5–9%

**Fees:**
- Arrangement fee (afsluitprovisie): 0.5–2% of loan amount, deducted from disbursement or charged upfront
- Early repayment fee (vervroegde aflossingsvergoeding): typically 1–3% of outstanding balance if repaid before term, or waived under MKB charter
- Annual review fee: some lenders charge €500–€2,500 annually for credit lines

**Total cost of credit:** Always show the total interest cost plus fees over the full term, not just the monthly payment. This is a regulatory requirement and good practice.

---

## Common collateral types

**Personal guarantee (persoonlijke borgtocht):** The business owner personally guarantees the loan. For sole traders, this is automatic (personal liability). For BV directors, this must be explicit and informed. The guarantee must be signed by the guarantor and their partner (if married in community of property, which is rare post-2018 but common in existing marriages). In prototypes: surfacing the personal guarantee requirement is an important design moment — it is a significant commitment and applicants must understand it clearly.

**Business assets (bedrijfsmiddelen):** Machinery, vehicles, equipment offered as security. Valued at forced-sale value (typically 50–70% of purchase price). Registered via notarial deed.

**Commercial property:** Valued by an independent surveyor. LTV (loan-to-value) typically 65–75% for commercial property. Requires notarial mortgage registration.

**Debtors book (debiteurenportefeuille):** Used in invoice financing and as additional security for working capital facilities. Valued at a percentage of outstanding debtors (advance rate, typically 70–85%).

---

## Loan tenors by product type

- Working capital line: annually reviewed, often effectively revolving for years
- Small term loan (€25K–€250K): 1–7 years (investment), 1–5 years (working capital)
- Mid-market term loan: 5–15 years (property), 3–10 years (business investment)
- Asset finance: matches asset useful life, typically 3–7 years
- Invoice financing: no fixed term (revolving against debtor cycle)

---

## Credit assessment in Dutch SME lending

### Key financial inputs

**Annual accounts (jaarrekening):** Filed with KVK for companies above threshold. Contains: balance sheet (balans), profit and loss (winst- en verliesrekening), notes. Lenders typically require 2–3 years. The accountant's opinion type matters: accountantsverklaring (statutory audit) > samenstellingsverklaring (compilation, most SMEs) > no opinion (sole traders).

**Interim figures (tussentijdse cijfers):** Required if annual accounts are more than 6 months old. May be management accounts or accountant-prepared. Less reliable than annual accounts — factor in seasonality.

**Tax returns (aangifte inkomstenbelasting / vennootschapsbelasting):** Confirms reported revenue and profit, useful cross-check against accounts. Lenders may request the filed return including the submitted declaration.

**Bank statements (bankafschriften):** 6–12 months. Show actual cash flows, payment behaviour, existing credit commitments, and spending patterns. Open banking replaces this in automated flows. Key signals: average balance, peak/trough, direct debit patterns, existing lenders.

**Payment behaviour:** Late payments to suppliers, outstanding tax liabilities (belastingschuld), pension arrears. These are red flags even if the P&L looks healthy.

### Non-financial inputs

**Sector risk:** Some sectors are systemically excluded (gambling, adult entertainment, certain weapons) or subject to heightened scrutiny (hospitality, retail — COVID impact still in data, construction — fraud risk). SBI code from KVK provides sector classification.

**Management quality:** Years of experience in sector, succession planning (for older business owners), key person risk (if the business is entirely dependent on one individual).

**Customer concentration:** If >30% of revenue comes from one customer, this is a concentration risk. A customer that represents >50% of revenue and is not contractually committed is a significant credit concern.

**Years in business:** Start-ups (<2 years) are higher risk and usually require Qredits or specific starter products rather than standard bank credit. Businesses with 3+ years of trading history have data to assess.

### Credit scoring approaches

**Rule-based decisioning:** Series of hard rules — minimum turnover, maximum loan-to-income ratio, excluded sectors, minimum years in business, BKR status. Applications that pass all rules are approved; failing any rule results in decline or referral. Transparent and auditable.

**Statistical models:** Logistic regression or machine learning models that score the probability of default based on financial and non-financial inputs. Output is a probability score mapped to a risk tier. More nuanced than rules, but require explanation for GDPR Article 22 compliance.

**Hybrid human-in-the-loop:** Model provides a recommendation; an RM or credit analyst confirms for all applications or only for edge cases (near the decision boundary). Most common approach in Dutch SME lending above €75K.

---

## Open banking in credit assessment

**Useful signals from 12 months of account data:**
- Average and minimum monthly balance (liquidity buffer)
- Revenue stability and trend (monthly turnover volatility)
- Salary run patterns (payroll regularity — indicator of employee count and pattern)
- Existing credit commitments (repayments to other lenders, credit card payments)
- Tax payments (evidence of compliance vs. tax debt risk)
- Seasonal patterns (important for retail, hospitality, agriculture)

**Consent friction:** The applicant must consent to their bank sharing data, then authenticate with their bank, then return. This takes 3–5 minutes and has ~15–20% drop-off. Always offer uploaded bank statements as a fallback.

**Data quality issues:** Transactions are often miscategorised. Intercompany transfers can be confused with revenue. Some banks return data with inconsistent date formats. Build for graceful degradation.

---

## Common decline reasons in Dutch SME lending

1. **Insufficient trading history** — business is too young (<2 years, sometimes <3 years)
2. **Sector exclusion** — SBI code is on the lender's exclusion list
3. **Negative BKR** — default registered on business or owner's personal BKR
4. **Insufficient cashflow** — projected repayments exceed available free cash flow (typically assessed as DSCR < 1.2)
5. **UBO concerns** — UBO could not be verified, or UBO has negative background
6. **Tax debt** — outstanding belastingschuld with Belastingdienst, especially if enforcement action pending
7. **Concentration risk** — revenue too dependent on one customer or one contract
8. **Insufficient collateral** — for secured lending, collateral value insufficient relative to exposure
9. **Recent loss** — one or more years of losses raises sustainability concerns
10. **Turnover decline** — significant year-on-year revenue decline without clear explanation

---

## Product mechanics for prototyping

### Amortisation structures

**Linear (lineaire aflossing):** Equal principal repayments each period. Total payment decreases over time (interest component shrinks as principal reduces). Monthly payment in month n = (P/N) + (P - (n-1)×P/N) × r. Common in Dutch mortgage-style loans.

**Annuity (annuïteit):** Equal total payments each period. Interest proportion decreases, principal proportion increases. Standard formula: PMT = P × (r(1+r)^n) / ((1+r)^n - 1). Most common for SME term loans — predictable for the borrower.

**Bullet:** Interest-only payments throughout the term, full principal repayment at maturity. Used in acquisition finance, property loans, and where an exit event (property sale, business sale) is expected. Higher risk for lender.

**Interest-only period followed by amortisation:** Common for investment loans where the asset takes time to generate returns (construction projects, new equipment installation periods).

### Revolving credit facilities vs term loans (UX differences)

Term loans: discrete application, discrete disbursement, known amortisation schedule, defined end date. The UX is the application journey.

Revolving credit: limit application is the UX event, but the ongoing experience is the account — drawing down, repaying, available headroom. The application UX is similar to a term loan, but the account dashboard UX is very different.

### Offer letter components (kredietofferte)

A legally binding credit offer must contain:
- Principal amount (hoofdsom)
- Interest rate type (fixed/variable) and rate (or margin over EURIBOR)
- Repayment schedule (amortisation type, frequency, amount)
- Term (looptijd)
- Security required (zekerheden)
- Arrangement fee (if applicable)
- Conditions precedent (opschortende voorwaarden) — documents required before disbursement
- Covenants (financial maintenance covenants if applicable — e.g., minimum DSCR, maximum leverage)
- Governing law (Dutch law)
- Offer validity period (typically 14–30 days)
- Acceptance mechanism (signature, digital)

### Credit committee decision memo contents

- Application summary (entity, loan request, purpose)
- Financial analysis (key ratios, trend, comparison to sector benchmarks)
- Risk assessment (credit score/tier, key risks identified)
- Security assessment (collateral type, value, haircut, LTV)
- AML/KYC summary (CDD completed, PEP status, UBO confirmed)
- Proposed terms (amount, rate, security, conditions)
- Policy exceptions (if any — flagged for committee attention)
- Recommendation (approve / conditionally approve / decline)
- Credit analyst sign-off, RM sign-off, committee decision

### CRM pipeline stages

Lead → Prospect → Application Received → In Underwriting → Credit Decision Pending → Approved → Conditionally Approved → Offer Sent → Offer Accepted → Conditions Fulfilment → Disbursement → Live → Closed / Defaulted / Renewed

---

## Mock data conventions

### Dutch company names
Format: [Descriptor] [Sector/Activity] [Legal Form]
Examples: Bakkerij De Gouden Tarwe BV, Technisch Installatiebedrijf Verhoeven VOF, Software Studio Noord BV, Groenten en Fruit Handelaar Pietersen (eenmanszaak), Adviesbureau Van den Berg & Partners BV

### KVK number format
8 digits, no spaces: e.g., 12345678, 87654321, 34567890

### SBI codes for common sectors
- 4711 — Supermarkets and hypermarkets
- 4120 — Construction of residential and non-residential buildings
- 6920 — Accounting, bookkeeping, and auditing activities
- 5610 — Restaurants and mobile food service activities
- 4941 — Freight transport by road (not hazardous)
- 6201 — Computer programming activities
- 8621 — General medical practice activities
- 4759 — Retail sale of furniture, lighting, and other household articles

### Plausible financial profiles by company size

**Micro / sole trader (eenmanszaak)**
- Annual turnover: €60K–€250K
- Net profit margin: 15–30%
- Balance sheet total: €20K–€150K
- Loan request: €10K–€50K

**Small BV (2–10 FTE)**
- Annual turnover: €400K–€2M
- EBITDA margin: 8–18%
- Balance sheet total: €200K–€1.5M
- Loan request: €50K–€500K

**Medium BV (10–50 FTE)**
- Annual turnover: €2M–€15M
- EBITDA margin: 6–15%
- Balance sheet total: €1M–€10M
- Loan request: €500K–€3M

### Credit outcomes by risk tier

**Tier A (low risk):** Clean BKR, 5+ years trading, positive trend, strong collateral. Outcome: approved, competitive pricing (EURIBOR + 150–250bps).

**Tier B (standard risk):** Clean BKR, 3+ years trading, stable performance, adequate collateral. Outcome: approved, standard pricing (EURIBOR + 250–400bps). Possibly with conditions.

**Tier C (elevated risk):** Some BKR notifications (A-codes), 2–3 years trading, some volatility, limited collateral. Outcome: conditional approval or referral to credit committee. Enhanced pricing (EURIBOR + 400–600bps).

**Tier D (high risk):** Negative BKR, young business, recent losses, no collateral. Outcome: decline or referral to Qredits / alternative lender.
