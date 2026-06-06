# TrustCert

Plataforma de certificación y verificación de documentos académicos sobre **Monad Blockchain**. Los documentos se hashean localmente con SHA-256 y el hash queda registrado de forma inmutable en un contrato inteligente. Cualquier persona puede verificar la autenticidad de un certificado sin necesidad de contactar a la institución.

Desarrollado para el **Hackathon Monad 2026**.

---

## Stack tecnológico

### Frontend

| Tecnología | Versión | Rol |
|---|---|---|
| [Next.js](https://nextjs.org) | 15.2.8 | Framework React — App Router + SSR |
| [React](https://react.dev) | 19 | UI library |
| [TypeScript](https://www.typescriptlang.org) | 5.x | Tipado estático |
| [Tailwind CSS](https://tailwindcss.com) | v4 | Estilos utility-first |
| [DaisyUI](https://daisyui.com) | v5 | Componentes UI sobre Tailwind |
| [Turbopack](https://turbo.build/pack) | incluido en Next.js 15 | Bundler ultra-rápido (modo dev) |
| [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) | — | Tipografía headings (via `next/font`) |
| [DM Sans](https://fonts.google.com/specimen/DM+Sans) | — | Tipografía body (via `next/font`) |

### Web3 / Wallet

| Tecnología | Versión | Rol |
|---|---|---|
| [viem](https://viem.sh) | 2.39.0 | Cliente Ethereum TypeScript-first |
| [wagmi](https://wagmi.sh) | 2.19.5 | React hooks para Ethereum |
| [RainbowKit](https://www.rainbowkit.com) | 2.2.9 | UI de conexión de wallets |
| [@tanstack/react-query](https://tanstack.com/query) | v5 | Cache y sincronización de estado async |

### Blockchain

| Tecnología | Detalle |
|---|---|
| **Red** | Monad Testnet — EVM compatible |
| **Chain ID** | `10143` |
| **RPC** | `https://testnet-rpc.monad.xyz` |
| **Lenguaje contratos** | Solidity `^0.8.30` |
| **Librería contratos** | OpenZeppelin Contracts (`Ownable`) |
| **Contrato desplegado** | `CertificateRegistry` |
| **Dirección** | `0x5f8e6A8E75CF93C81a5F49afbccDF3cB74Eb5521` |

### Smart Contract — `CertificateRegistry.sol`

```solidity
// Registra el hash SHA-256 de un documento vinculado a una institución y estudiante
function registerCertificateHash(
    bytes32 documentHash,
    string calldata studentId,
    string calldata institutionName
) external

// Verifica si un hash existe en blockchain y retorna sus metadatos
function verifyCertificateHash(bytes32 documentHash)
    external view
    returns (bool, address, uint256, string memory, string memory)
```

### Herramientas de desarrollo (contratos)

| Tecnología | Versión | Rol |
|---|---|---|
| [Hardhat](https://hardhat.org) | 2.x | Entorno de desarrollo Ethereum |
| [hardhat-deploy](https://github.com/wighawag/hardhat-deploy) | — | Despliegue declarativo de contratos |
| [TypeChain](https://github.com/dethcrypto/TypeChain) | — | Tipos TypeScript para contratos |
| [ethers.js](https://ethers.org) | v6 | Interacción con contratos en scripts |

### Seguridad / Hashing

| Tecnología | Detalle |
|---|---|
| **Algoritmo** | SHA-256 |
| **API** | Web Crypto API — `crypto.subtle.digest()` |
| **Privacidad** | El PDF se hashea 100% en el navegador. El archivo nunca se sube a ningún servidor |

### Autenticación institucional

| Componente | Detalle |
|---|---|
| **Tipo** | Credenciales predefinidas por institución |
| **Sesión** | `localStorage` (sin backend, sin JWT) |
| **Protección de rutas** | Redirección client-side vía `useAuth` hook |
| **Instituciones** | Universidad Nacional de Colombia, Universidad de los Andes, Pontificia Universidad Javeriana, Universidad EAFIT |

### Monorepo

| Tecnología | Detalle |
|---|---|
| **Gestor** | Yarn Workspaces v3 |
| **Paquetes** | `packages/nextjs` · `packages/hardhat` · `packages/noir` |
| **Base** | scaffold-eth-2-noir |
| **Pre-commit hooks** | Husky + lint-staged (ESLint + TypeScript check) |

---

## Arquitectura del flujo

```
PDF (usuario)
    │
    ▼
SHA-256 hash  ←── crypto.subtle (browser, sin red)
    │
    ├──► registerCertificateHash(hash, studentId, institution)
    │         │
    │         ▼
    │    CertificateRegistry.sol  (Monad Testnet)
    │         │
    │         └── mapping: bytes32 → CertificateDoc
    │
    └──► verifyCertificateHash(hash)
              │
              ▼
         { exists, registeredBy, registeredAt, studentId, institutionName }
```

---

## Estructura del proyecto

```
Hackaton-Monad/
├── packages/
│   ├── nextjs/                  # Frontend Next.js
│   │   ├── app/
│   │   │   ├── page.tsx         # Landing page
│   │   │   ├── certificate-verify/   # Verificación pública
│   │   │   └── admin/           # Panel institucional (protegido)
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── lib/auth/            # Sistema de autenticación
│   │   │   ├── config.ts        # Usuarios predefinidos
│   │   │   └── useAuth.ts       # Hook de sesión
│   │   ├── hooks/
│   │   │   └── useScrollReveal.ts
│   │   └── styles/globals.css   # Design system + animaciones
│   │
│   ├── hardhat/                 # Contratos inteligentes
│   │   ├── contracts/
│   │   │   └── CertificateRegistry.sol
│   │   ├── deploy/
│   │   │   └── 03_deploy_certificate_registry.ts
│   │   └── deployments/monadTestnet/
│   │
│   └── noir/                    # Circuitos ZK (scaffolding)
│
├── package.json                 # Yarn workspaces root
└── README.md
```

---

## Comandos principales

```bash
# Instalar dependencias
yarn install

# Desarrollo (con Turbopack)
yarn start

# Build de producción
yarn next:build

# Servir producción
yarn next:serve

# Desplegar contratos a Monad Testnet
cd packages/hardhat
npx hardhat deploy --network monadTestnet --tags CertificateRegistry
```

---

## Variables de entorno

```bash
# packages/hardhat/.env  (NO commitear)
__RUNTIME_DEPLOYER_PRIVATE_KEY=0x...
```

---

## Credenciales de demo (panel admin)

| Institución | Email | Contraseña |
|---|---|---|
| Universidad Nacional de Colombia | admin@uninacional.edu.co | uninacional2024 |
| Universidad de los Andes | admin@uniandes.edu.co | uniandes2024 |
| Pontificia Universidad Javeriana | admin@javeriana.edu.co | javeriana2024 |
| Universidad EAFIT | admin@eafit.edu.co | eafit2024 |

> Las instituciones conectan su wallet de Monad para firmar las transacciones de certificación.

---

## Licencia

MIT
