import ImportPrivateKey from 'chlu-wallet-support-js/lib/import_private_key'
import fileDownload from 'js-file-download'
import ChluDID from 'chlu-did/src' // TODO: precompiled sources??

export async function generateNewWallet() {
    const importer = new ImportPrivateKey()
    const mnemonic = importer.generateNewMnemonic()
    const chluDid = new ChluDID()
    const did = await chluDid.generateDID()
    return {
        did,
        testnet: true,
        bitcoinMnemonic: mnemonic
    }
}

export async function saveWalletDIDToIPFS(wallet) {
    // TODO: implementation
    // code is already in chlu-did-service and chlu-service-node
}

export function saveWalletToLocalStorage(wallet) {
    localStorage.setItem('wallet', JSON.stringify(wallet))
}

export function getWalletFromLocalStorage() {
    return JSON.parse(localStorage.getItem('wallet') || 'null')
}

export function deleteWalletFromLocalStorage() {
    localStorage.removeItem('wallet')
}

export function downloadWallet(wallet) {
    fileDownload(JSON.stringify(wallet, null, 2), 'chlu_wallet.json')
}

export function importWallet(str) {
    try {
        const wallet = JSON.parse(str)
        if (!wallet.did) {
            throw new Error('Missing DID')
        }
        if (!wallet.bitcoinMnemonic) {
            throw new Error('Missing Bitcoin Mnemonic')
        }
        if (!wallet.testnet) {
            throw new Error('The Wallet has to be for Testnet')
        }
        return wallet
    } catch (error) {
        console.log(error)
        throw new Error('Imported file is not a valid Wallet: ' + error.message)
    }
}

export function getAddress(wallet) {
    if (!wallet || !wallet.bitcoinMnemonic) {
        return null
    }
    const keyPath = "m/44'/1'/0'/0/0"
    const importer = new ImportPrivateKey()
    const kp = importer.importFromMnemonic(wallet.bitcoinMnemonic, keyPath)
    return kp.getAddress()
}