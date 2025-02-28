import { GenerateHashParams, InsecureDocumentParams, ProofOptionsParam, SerializeParams, TransformParams, VerificationParams } from '../../types/cryptosuite.js';
import {
  CanonicalizedProofConfig,
  DataIntegrityProofType,
  Proof,
  SecureDocument,
  VerificationResult
} from '../../types/di-proof.js';
import { HashHex, SignatureBytes } from '../../types/shared.js';
import Bip340Multikey from '../multikey/multikey.js';

/**
 * Interface representing a BIP-340 Cryptosuite.
 * @export
 * @interface ICryptosuite
 * @type {ICryptosuite}
 */
interface ICryptosuite {
  /** @type {DataIntegrityProofType} The type of proof produced by the cryptosuite */
  type: DataIntegrityProofType;

  /** @type {string} The name of the cryptosuite */
  cryptosuite: string;

  /** @type {Bip340Multikey} The Multikey used by the cryptosuite */
  multikey: Bip340Multikey;

  /**
   * Create a proof for an insecure document.
   * @param {InsecureDocumentParams} params The parameters to use when creating the proof.
   * @param {InsecureDocument} params.document The document to create a proof for.
   * @param {ProofOptions} params.options The options to use when creating the proof.
   * @returns {Proof} The proof for the document.
   */
  createProof({ document, options }: InsecureDocumentParams): Proof;

  /**
   * Verify a proof for a secure document.
   * @param {SecureDocument} secure The secure document to verify.
   * @returns {VerificationResult} The result of the verification.
   */
  verifyProof(secure: SecureDocument): VerificationResult;

  /**
   * Transform a document (secure or insecure) into canonical form.
   * @param {TransformParams} params The parameters to use when transforming the document.
   * @param {DocumentParams} params.document The document to transform: secure or insecure.
   * @param {ProofOptions} params.options The options to use when transforming the proof.
   * @returns {string} The canonicalized document.
   * @throws {Bip340CryptosuiteError} if the document cannot be transformed.
   */
  transformDocument({ document, options }: TransformParams): string;

  /**
   * Generate a hash of the canonical proof configuration and document.
   * @param {GenerateHashParams} params The parameters to use when generating the hash.
   * @param {ProofOptions} params.canonicalProofConfig The canonicalized proof configuration.
   * @param {InsecureDocument} params.canonicalDocument The canonicalized document.
   * @returns {HashHex} The hash string of the proof configuration and document.
   */
  generateHash({ canonicalProofConfig, canonicalDocument }: GenerateHashParams): HashHex;

  /**
   * Configure the proof by canonicalzing it.
   * @param {ProofOptionsParam} params The parameters to use when transforming the document.
   * @param {ProofOptions} params.options The options to use when transforming the proof.
   * @returns {string} The canonicalized proof configuration.
   * @throws {Bip340CryptosuiteError} if the proof configuration cannot be canonicalized.
   */
  proofConfiguration({ options }: ProofOptionsParam): CanonicalizedProofConfig;

  /**
   * Serialize the proof into a byte array.
   * @param {SerializeParams} params The parameters to use when serializing the proof.
   * @param {string} params.hashData The canonicalized proof configuration.
   * @param {ProofOptions} params.options The options to use when serializing the proof.
   * @returns {SignatureBytes} The serialized proof.
   * @throws {Bip340CryptosuiteError} if the multikey does not match the verification method.
   */
  proofSerialization({ hashData, options }: SerializeParams): SignatureBytes;

  /**
   * Verify the proof by comparing the hash of the proof configuration and document to the proof bytes.
   * @param {VerificationParams} params The parameters to use when verifying the proof.
   * @param {string} params.hashData The canonicalized proof configuration.
   * @param {Uint8Array} params.proofBytes The serialized proof.
   * @param {ProofOptions} params.options The options to use when verifying the proof.
   * @returns {boolean} True if the proof is verified, false otherwise.
   * @throws {Bip340CryptosuiteError} if the multikey does not match the verification method.
   */
  proofVerification({ hashData, proofBytes, options }: VerificationParams): boolean;
}

export default ICryptosuite;