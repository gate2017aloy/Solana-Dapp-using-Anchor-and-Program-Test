use anchor_lang::prelude::*;

use crate::utils::pda_seeds;

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
    init_if_needed,
    seeds = [pda_seeds::CONTRACT_STATE],
    bump,
    payer = user,
    space = 8 + 8
    )]
    pub contract_account: Account<'info, ContractState>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

// An account that goes inside a transaction instruction
#[account]
#[derive(Debug)]
pub struct ContractState {
    pub count: u64,
}

impl<'info> Initialize<'info> {
    pub fn process(&mut self) -> ProgramResult {
        self.contract_account.count = 1;
        Ok(())
    }
}

