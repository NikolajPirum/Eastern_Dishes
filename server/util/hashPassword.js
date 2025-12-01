import bcrypt from 'bcrypt';
const saltRounds = 10;  // Number of hashing rounds (can increase for more security)

export async function hashPassword(enterPassword) {
    return await bcrypt.hash(enterPassword, saltRounds);
}

export async function comparePassword(stringPassword, hashedPassword) {
    return await bcrypt.compare(stringPassword, hashedPassword);
}