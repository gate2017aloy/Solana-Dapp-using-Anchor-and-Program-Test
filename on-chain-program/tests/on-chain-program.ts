import * as anchor from '@project-serum/anchor';
import { OnChainProgram } from '../target/types/on_chain_program';
import { Keypair, SystemProgram } from '@solana/web3.js';
import {airdrop} from "./utils/utlis";
import {PDAs} from "./utils/pdas";

describe('on-chain-program', async () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());
  const connection = anchor.getProvider().connection;
  const program = anchor.workspace.OnChainProgram as anchor.Program<OnChainProgram>;
  const pdas = await PDAs.new(program.programId);
  const user = Keypair.generate();
  const contractAccount = Keypair.generate();

  it('Airdrops ', async function () {
    await airdrop(user.publicKey, 'user')
  });

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({
      accounts: {
        // contractAccount: contractAccount.publicKey,
        contractAccount: pdas.contractState.key,
        user: user.publicKey,
        systemProgram: SystemProgram.programId,
      },
      // signers: [contractAccount, user]
      signers: [user]
    });
    await connection.confirmTransaction(tx);
    console.log("Your transaction signature", tx);
    // const account = await program.account.contractState.fetch(contractAccount.publicKey);
    const account = await program.account.contractState.fetch(pdas.contractState.key);
    console.log({account})
  });


  it('Is increments!', async () => {
    // Add your test here.
    const tx = await program.rpc.increment({
      accounts: {
        // contractAccount: contractAccount.publicKey,
        contractAccount: pdas.contractState.key,
        user: user.publicKey,
      },
      // signers: [contractAccount, user]
      signers: [user]
    });
    await connection.confirmTransaction(tx);
    console.log("Your transaction signature", tx);
    // const account = await program.account.contractState.fetch(contractAccount.publicKey);
    const account = await program.account.contractState.fetch(pdas.contractState.key);
    console.log({account})
  });

});
