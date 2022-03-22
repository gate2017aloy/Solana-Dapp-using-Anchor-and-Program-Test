import {PublicKey} from "@solana/web3.js";

export const CONTRACT_STATE = 'contract_state'

export class KeyBumpPair {
    public key: PublicKey;
    public bump: number;
}

export class PDAs {
    public readonly contractState: KeyBumpPair;
    public readonly programId: PublicKey;

    private constructor(
        programId: PublicKey,
        contractState: KeyBumpPair,
    ) {
        this.programId = programId;
        this.contractState = contractState;
    }

    static async new(programId: PublicKey) {
        const [contractStateKey, contractStateBump] = await PublicKey.findProgramAddress([Buffer.from('contract_state')], programId);
        return new PDAs(
            programId,
            {
                key: contractStateKey,
                bump: contractStateBump
            }
        )
    }

}