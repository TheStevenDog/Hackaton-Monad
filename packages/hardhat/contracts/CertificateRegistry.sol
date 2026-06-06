// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract CertificateRegistry is Ownable {
    error HashAlreadyRegistered();

    struct CertificateDoc {
        address registeredBy;
        uint256 registeredAt;
        string studentId;
        string institutionName;
        bool exists;
    }

    mapping(bytes32 => CertificateDoc) public certificateHashes;

    event CertificateHashRegistered(
        bytes32 indexed documentHash,
        address indexed registeredBy,
        string studentId,
        string institutionName,
        uint256 timestamp
    );

    constructor(address initialOwner) Ownable(initialOwner) {}

    function registerCertificateHash(
        bytes32 documentHash,
        string calldata studentId,
        string calldata institutionName
    ) external {
        if (certificateHashes[documentHash].exists) revert HashAlreadyRegistered();
        certificateHashes[documentHash] = CertificateDoc({
            registeredBy: msg.sender,
            registeredAt: block.timestamp,
            studentId: studentId,
            institutionName: institutionName,
            exists: true
        });
        emit CertificateHashRegistered(documentHash, msg.sender, studentId, institutionName, block.timestamp);
    }

    function verifyCertificateHash(bytes32 documentHash)
        external
        view
        returns (bool, address, uint256, string memory, string memory)
    {
        CertificateDoc memory doc = certificateHashes[documentHash];
        return (doc.exists, doc.registeredBy, doc.registeredAt, doc.studentId, doc.institutionName);
    }
}
