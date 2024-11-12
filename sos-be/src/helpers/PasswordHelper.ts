import bcrypt from 'bcryptjs'

const Hashing = async (password: string):Promise<string> => {
    var salt = bcrypt.genSaltSync(10);
    var result = bcrypt.hashSync(password, salt);
    // const result = await bcrypt.hash(password, 10);
    return result;
}

const Compares = async (password: string, passwordHash: string):Promise<boolean> => {
    // const matched = await bcrypt.compare(password, passwordHash);
    const matched = bcrypt.compareSync(password, passwordHash);
    return matched;
}

export default { Hashing, Compares}