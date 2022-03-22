import * as anchor from '@project-serum/anchor';
import {PublicKey} from "@solana/web3.js";

export async function airdrop(pubkey: PublicKey, logTag: string): Promise<void> {
    const conn = anchor.getProvider().connection;
    const sig = await conn.requestAirdrop(pubkey, 5 * anchor.web3.LAMPORTS_PER_SOL);
    await conn.confirmTransaction(sig);

    console.log(
        'Airdrop successful! TAG: ',
        logTag,
        ', Pubkey: ',
        pubkey.toString(),
        ', Balance: ',
        await conn.getBalance(pubkey),
        ' lamports.',
    );
}