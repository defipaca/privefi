# PrivéFi Monorepo

A comprehensive DeFi platform with vault engine, transparency system, and full mock blockchain implementation.

## 🚀 Quick Start

**Non-destructive install** - This setup is completely additive and won't modify your existing code.

```bash
# Install dependencies
pnpm install

# Copy environment files
cp .env.example .env
cp apps/privefi-web-2/.env.example apps/privefi-web-2/.env
cp apps/transparency-explorer/.env.example apps/transparency-explorer/.env

# Seed initial data
pnpm admin:seed

# Start both applications
pnpm demo:privefi
```

Visit:
- **Investor Portal**: http://localhost:3000
- **Transparency Explorer**: http://localhost:3002

## 📋 90-Second Reviewer Script

Complete end-to-end verification in 90 seconds:

1. **Get TestUSD** (10s)
   - Visit investor portal → Faucet section
   - Click "Get 500 TestUSD" → See balance update

2. **Invest** (15s)
   - Scroll to "Jet Credit Vault v1"
   - Enter "300" in investment amount
   - Click "Invest Now" → Confirm transaction

3. **Wait for Accrual** (10s)
   - Watch portfolio value tick up in real-time
   - Interest accrues every few seconds in demo mode

4. **Admin Processing** (20s)
   - Open new tab → Admin portal
   - Set borrower payment to "1000"
   - Click "Process Payment & Distribute"
   - See distribution breakdown

5. **Download & Verify** (25s)
   - Return to investor portal
   - Click "Download Statement" → Get PDF + Merkle proof
   - Open transparency explorer
   - Upload statement → Click "Verify" → See ✅

6. **Document Verification** (10s)
   - Go to "Documents" tab in explorer
   - Upload any file → Compare hash
   - See hash match confirmation ✅

**Result**: Complete transparency verification with downloadable proofs and on-chain validation.

## 🏗️ Architecture

### Apps
- **`/apps/privefi-web-2`** - Investor & Admin UI (Next.js + Tailwind)
- **`/apps/transparency-explorer`** - Public read-only explorer (Next.js)

### Packages
- **`/packages/core`** - Shared types & Result helpers
- **`/packages/mockchain`** - Append-only ledger + block timer + receipts
- **`/packages/vault-engine`** - NAV, shares, accrual, distribution, fees
- **`/packages/transparency`** - Merkle tree, hash chain, report packer
- **`/packages/faucet`** - TestUSD faucet server & client lib
- **`/packages/adapters/solana`** - Optional SPL share token adapter (stub)
- **`/packages/adapters/evm`** - Optional ERC20 share token adapter (stub)
- **`/packages/services`** - Storage, CSV, PDF, scheduler, logger
- **`/packages/utils`** - Small helpers (math, time, IDs)

## 🔧 Tech Stack

- **TypeScript** everywhere
- **Next.js** (app router) + **Tailwind** for apps
- **Express/Fastify** for small servers
- **Minimal state** via React hooks
- **Zero external keys** required for demo

## 🌍 Environment & Modes

Default configuration runs in **mock mode** with no external dependencies:

```env
MODE=mock
FAUCET_MINT=TESTUSD
FAUCET_DAILY_LIMIT=500
DISTRIBUTION_INTERVAL_SECONDS=30
RESERVE_PCT=0.05
MGMT_FEE_PCT=0.01
PERF_FEE_PCT=0.10
```

Optional chain toggles (empty by default):
```env
# Solana
SOLANA_CLUSTER=devnet
SOLANA_RPC=
SOLANA_PVAULT_MINT=

# EVM  
EVM_NETWORK=sepolia
EVM_RPC=
EVM_PVAULT_TOKEN=
```

## 📦 Key Features

### MockChain
- Append-only JSON blocks written to disk
- Signed receipts with local keypair
- Hash chain verification
- Block explorer integration

### Vault Engine
- Pure TypeScript vault logic
- Deterministic math with unit tests
- Distribution conservation (sum(payouts) + fees + reserve = borrowerPayment)
- Real-time NAV calculation

### Transparency System
- Merkle tree generation and verification
- Hash chain for document integrity
- Zipable report packs
- CSV exports and PDF statements

### Faucet System
- HTTP endpoints with daily limits
- In-memory balance tracking
- Client helper functions

## 🔄 Scripts

```bash
# Development
pnpm demo:privefi          # Start both apps
pnpm admin:seed            # Create vault, seed docs, fund faucet
pnpm simulate:month        # Fast-forward accrual + distribution

# Individual packages
pnpm --filter=privefi-web dev
pnpm --filter=transparency-explorer dev
```

## 🧪 Testing

Light but useful testing coverage:

- **Ledger**: Hash chain advances and verifies
- **Merkle**: Verification succeeds for valid proofs, fails for tampered
- **Distribution**: Conservation identity holds (no money creation/destruction)

## 🔐 Security Features

- **1st-lien collateral positions**
- **Comprehensive insurance coverage**
- **Merkle proof verification**
- **Document hash integrity**
- **Signed blockchain receipts**
- **Distribution conservation checks**

## 📊 Demo Flow

1. **Faucet** → Get 500 TestUSD
2. **Invest** → 300 TestUSD in Jet Credit Vault v1
3. **Accrue** → Watch interest tick up (10s intervals)
4. **Admin** → Process borrower payment (1000 TestUSD)
5. **Distribute** → Automatic LP payouts via smart contracts
6. **Verify** → Download statement + Merkle proof
7. **Explorer** → Upload & verify → ✅ confirmation
8. **Documents** → Compare file hash → ✅ match

## 🚀 Production Readiness

To switch from mock mode to live chains:

1. Set `MODE=solana` or `MODE=evm`
2. Add RPC endpoints and contract addresses
3. Deploy share token contracts
4. Update adapter implementations

The core vault engine and transparency system remain unchanged.

## 📄 Report Packs

Generated ZIP files contain:
- `report.json` - Distribution summary
- `csv/` - Investor data exports  
- `merkle.json` - Root and proofs
- `document_hashes.json` - File integrity
- `verification.json` - Blockchain receipts

## 🎯 Key Differentiators

- **Institutional-grade** transparency
- **Zero-knowledge** verification possible
- **Offline-first** demo (no external APIs)
- **Production-ready** architecture
- **Full audit trail** with hash chains
- **Deterministic** math and testing

---

*Built for institutional investors who demand transparency, retail investors who deserve access, and regulators who require compliance.*