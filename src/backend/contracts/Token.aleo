program basic_casino.aleo {
    // A token, issued by the casino.
    // - 'owner'  : The address of the account that owns the record associated with this token.
    // - 'amount' : The amount of casino tokens owned by the account.
    record Token {
        owner: address,
        amount: u64,
    }

    // An on-chain mapping, storing the amount of casino tokens owned by each account.
    // The account is stored as a hash to preserve user privacy.
    mapping balances: field => u64;

    // Issues casino tokens to a user.
    // - `owner` : The address of the account to issue the token to.
    // - `aleoAmount`: The amount of Aleo tokens received, to be converted to casino tokens.
    transition issue(owner: address, aleoAmount: u64) -> Token {
        assert_eq(self.caller, aleo1t0uer3jgtsgmx5tq6x6f9ecu8tr57rzzfnc2dgmcqldceal0ls9qf6st7a); // Replace with your casino owner address
        let casinoTokenAmount: u64 = aleoAmount * 10; // 1 Aleo Token = 10 Casino Tokens

        return Token {
            owner: owner,
            amount: casinoTokenAmount,
        } then finalize(BHP256::hash_to_field(owner), casinoTokenAmount);
    }

    // Finalizes the token issuance by updating the on-chain balance.
    finalize issue(hash: field, amount: u64) {
        let current_amount: u64 = Mapping::get_or_use(balances, hash, 0u64);
        Mapping::set(balances, hash, current_amount + amount);
    }

    // Withdraws casino tokens and converts them back to Aleo tokens.
    // - `recipient`: The address of the account to withdraw to.
    // - `casinoTokenAmount`: The amount of casino tokens to withdraw.
    transition withdraw(recipient: address, casinoTokenAmount: u64) -> Token {
        assert_eq(self.caller, aleo1t0uer3jgtsgmx5tq6x6f9ecu8tr57rzzfnc2dgmcqldceal0ls9qf6st7a); // Only the casino can process withdrawals
        let aleoTokenAmount: u64 = casinoTokenAmount / 10; // Convert Casino Tokens back to Aleo Tokens

        return Token {
            owner: recipient,
            amount: aleoTokenAmount,
        } then finalize(BHP256::hash_to_field(recipient), casinoTokenAmount);
    }

    // Finalizes the withdrawal by updating the on-chain balance.
    finalize withdraw(hash: field, casinoTokenAmount: u64) {
        let current_amount: u64 = Mapping::get_or_use(balances, hash, 0u64);
        Mapping::set(balances, hash, current_amount - casinoTokenAmount);
    }
}
