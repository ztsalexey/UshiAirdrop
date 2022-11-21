// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

pragma solidity ^0.8.7;

error UshiNftOfficial__TransferFailed();
error UshiNftOfficial__ReceiversArrayLengthNotEqualtoIDs();

contract UshiNftOfficial is Ownable, ERC1155 {
    uint256 private constant DIAMOND = 1;
    uint256 private constant WHALE = 2;
    uint256 private constant STRONG = 3;
    uint256 private constant WARRIOR = 4;
    uint256 private constant EARLY = 5;

    constructor() Ownable() ERC1155("") {
        _mint(msg.sender, DIAMOND, 170, "");
        _mint(msg.sender, WHALE, 200, "");
        _mint(msg.sender, STRONG, 250, "");
        _mint(msg.sender, WARRIOR, 650, "");
        _mint(msg.sender, EARLY, 1250, "");
    }

    function uri(uint256 _tokenId) public pure override returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "https://ipfs.io/ipfs/QmV1wsLGiQ5whRhS6v4Pi1kHQgkzgcqLiJHoZccczCfpp9/",
                    Strings.toString(_tokenId),
                    ".json"
                )
            );
    }

    function Airdrop(
        address[] calldata _to,
        uint256[] calldata _id,
        uint256[] calldata _amount
    ) public onlyOwner {
        if (_to.length != _id.length) {
            revert UshiNftOfficial__ReceiversArrayLengthNotEqualtoIDs();
        }
        for (uint256 i = 0; i < _to.length; i++) {
            safeTransferFrom(msg.sender, _to[i], _id[i], _amount[i], "");
        }
    }

    function withdrawETH() public onlyOwner {
        (bool success, ) = payable(msg.sender).call{value: address(this).balance}("");
        if (!success) {
            revert UshiNftOfficial__TransferFailed();
        }
    }

    receive() external payable {}

    fallback() external payable {}
}
