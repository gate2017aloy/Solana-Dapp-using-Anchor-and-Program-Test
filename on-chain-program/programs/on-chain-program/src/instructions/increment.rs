use anchor_lang::prelude::*;
use crate::ContractState;

use crate::utils::pda_seeds;

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(
        mut,
        seeds = [pda_seeds::CONTRACT_STATE],
        bump,
    )]
    pub contract_account: Account<'info, ContractState>,
    #[account(mut)]
    pub user: Signer<'info>,
}

impl<'info> Increment<'info> {
    pub fn process(&mut self) -> ProgramResult {
        self.contract_account.count += 1;
        Ok(())
    }
}