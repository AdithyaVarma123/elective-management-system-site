function getRandomInt(): number {
    const byteArray = new Uint8Array(1);
    window.crypto.getRandomValues(byteArray);
    if (
        !(
            [45, 46, 95, 126].indexOf(byteArray[0]) > -1 ||
            (byteArray[0] >= 97 && byteArray[0] <= 122) ||
            (byteArray[0] >= 65 && byteArray[0] <= 90) ||
            (byteArray[0] >= 48 && byteArray[0] <= 57)
        )
    ) {
        return getRandomInt();
    }
    return byteArray[0];
}
export function getCode(len: number, wishList = 'abcdef0123456789'): string {
    return Array.from(window.crypto.getRandomValues(new Uint32Array(len)))
    .map((x) => wishList[x % wishList.length])
    .join('');
}

export function fromHexString(hexString: string): Uint8Array {
    return new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)))
}
