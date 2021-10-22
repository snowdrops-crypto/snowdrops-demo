// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import {Modifiers} from "../libraries/LibAppStorage.sol";

contract ItemsFacet is Modifiers {
  event TransferToParent(address indexed _toContract, uint256 indexed _toTokenId, uint256 indexed _tokenTypeId, uint256 _value);
  event AttachItem(uint256 indexed_tokenId, uint32[32] _oldItems, uint32[32] newItems);

  struct ItemIdIO {
    uint256 itemId;
    uint256 balance;
  }

  ///@notice Returns balance for each item that exists for an account
  ///@param _account Address of the account to query
  ///@return bals_ An array of structs,each struct containing details about each item owned
  function itemBalances(address _account) external view returns (ItemIdIO[] memory bals_) {
    uint256 count = s.ownerItems[_account].length;
    bals_ = new ItemIdIO[](count);
    for (uint256 i; i < count; i++) {
      uint256 itemId = s.ownerItems[_account][i];
      bals_[i].balance = s.ownerItemBalances[_account][itemId];
      bals_[i].itemId = itemId;
    }
  }

  /**
    @notice Get the balance of an account's tokens.
    @param _owner  The address of the token holder
    @param _id     ID of the token
    @return bal_    The _owner's balance of the token type requested
  */
  function balanceOf(address _owner, uint256 _id) external view returns (uint256 bal_) {
      bal_ = s.ownerItemBalances[_owner][_id];
  }

  /// @notice Get the balance of a non-fungible parent token
  /// @param _tokenContract The contract tracking the parent token
  /// @param _tokenId The ID of the parent token
  /// @param _id     ID of the token
  /// @return value The balance of the token
  function balanceOfToken(
      address _tokenContract,
      uint256 _tokenId,
      uint256 _id
  ) external view returns (uint256 value) {
      value = s.nftItemBalances[_tokenContract][_tokenId][_id];
  }

  
}