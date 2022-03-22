use anchor_lang::prelude::*;

use crate::instructions::{initialize::*, increment::*};

pub mod instructions;
pub mod utils;

declare_id!("4t53tuAJ4KCwidZj1NEdossDWokEpexyzg6CBAKg4toM");

#[program]
pub mod on_chain_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        ctx.accounts.process();
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> ProgramResult {
        ctx.accounts.process();
        Ok(())
    }

}

