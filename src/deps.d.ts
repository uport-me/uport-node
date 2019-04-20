
declare module 'did-jwt' {
  export interface DIDDocument {
    '@context': 'https://w3id.org/did/v1';
    id: string;
    publicKey: PublicKey[];
    authentication?: Authentication[];
    uportProfile?: any;
    service?: ServiceEndpoint[];
  }
  export interface ServiceEndpoint {
      id: string;
      type: string;
      serviceEndpoint: string;
      description?: string;
  }
  export interface PublicKey {
      id: string;
      type: string;
      owner: string;
      ethereumAddress?: string;
      publicKeyBase64?: string;
      publicKeyBase58?: string;
      publicKeyHex?: string;
      publicKeyPem?: string;
  }
  export interface Authentication {
      type: string;
      publicKey: string;
  }
  interface EcdsaSignature {
    r: string,
    s: string,
    recoveryParam: number
  }
  interface JWTOptions {
    issuer: string,
    signer: (data: string) => Promise<EcdsaSignature>,
    alg?: string,
    expiresIn?: number
  }
  interface JWTVerifyOptions {
    auth?: boolean,
    audience?: string,
    callbackUrl?: string
  }
  interface Verified {
    payload: Object,
    doc: DIDDocument,
    issuer: string,
    signer: Object,
    jwt: string
  }
  export function SimpleSigner(hexPrivateKey: string): (data: string) => Promise<EcdsaSignature>
  export function createJWT(payload: Object, options: JWTOptions): Promise<string>
  export function verifyJWT(jwt: string, options?: JWTVerifyOptions): Promise<Verified>
}

declare module 'did-jwt/lib/Digest' {
  export function toEthereumAddress( hexPublicKey: string ): string
}

declare module 'mnid' {
  interface NetworkAddress {
    address: string,
    network: string,
    checksum: string
  }
  export function isMNID(address: string): boolean
  export function decode(mnid: string) : NetworkAddress
}

declare module 'ethr-did-resolver' {
  export default function register(ethConfig: Object): void
}

declare module 'uport-lite' {
  export default function UportLite (conf: {networks: Object}): (address: string) => Promise<Object>
}